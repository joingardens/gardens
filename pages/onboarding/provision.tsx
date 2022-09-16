import { useUser } from '../../utils/useUser';
import { useRouter } from 'next/router';
import useToast from '../../components/hooks/useToast';
import React, { useState, useEffect, FC } from 'react';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import { apiAdapter } from '../../adapters/other-apps/api/adapter';
import { useDigitalOcean } from '../../components/hooks/useDigitalOcean';
import { getPaasByUserId } from '../../utils/supabase-client';
import { DigitalOceanRegion } from '../../adapters/other-apps/digital-ocean/digitalOceanAdapter';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useInput } from '../../components/hooks/useInput';
import { validationService } from "../../services/validationService";
import Input from '../../components/ui/Input';
import { userDropletsAdapter } from '../../adapters/userDroplets/adapter';
import axios from 'axios';
import { flagUrlMap } from '../../utils/getFlagUrl';



class ProvisionState {
  region: DigitalOceanRegion
  size: string

  static default() {
    return {
      region: {
        name: "",
        slug: "",
        sizes: [],
        available: true
      },
      size: ''
    }
  }
}

const ProvisionRegionSelector: FC<{
  provisionState: ProvisionState,
  setProvisionState: React.Dispatch<React.SetStateAction<ProvisionState>>,
  region: DigitalOceanRegion
}> = ({provisionState, setProvisionState, region}) => {
  const [ parent ] = useAutoAnimate<HTMLDivElement>()
  const regionMatch = provisionState.region.name === region.name
  return (
    <div ref={parent} className='w-full transition-all'>
    <button 
    className={`
    ${regionMatch ? "ring-yellow-400" : ""}
    ring-2 p-2 w-full flex justify-center items-center focus:outline-none
    `}
    onClick={() => {
      if (regionMatch) {
        setProvisionState(ProvisionState.default)
        return
      }
      setProvisionState({
        region: region,
        size: ''
      })
    }}>
      <span className="mr-2">
        {region.name}
      </span>
      <div className='w-6 h-4 flex justify-center items-center'>
        <img src={flagUrlMap[region.name.substring(0, region.name.length-2).toLowerCase()]} className='w-full h-full' alt="" />
      </div>
      

    </button>
    {
      regionMatch
        ?
        <div className={`
          grid grid-cols-1
        
        `}>
          {region.sizes.map(a => {
            const sizeMatch = provisionState.size === a

            if (a === "s-1vcpu-1gb" || a === "s-2vcpu-2gb" || a === "s-2vcpu-4gb")
            return (
              <button 
              onClick={() => {
                if (regionMatch && sizeMatch) {
                  setProvisionState({
                    region: region,
                    size: ""
                  })
                  return
                }
                return setProvisionState({
                  region: region,
                  size: a
                })
              }}
              className={`
              ${regionMatch && sizeMatch ? "bg-yellow-300" : ""}
              p-1 focus:outline-none
              `}> 
                {a}
              </button>
            )
          })}
        </div>
        :
        null
    }
  </div>
  )
}

export default function Provision() {

  const { user } = useUser()
  const router = useRouter()
  const { makeToast } = useToast()
  const { changeToken, digitalOceanApiAdapter, token } = useDigitalOcean()
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [regions, setRegions] = useState<DigitalOceanRegion[]>([])
  const [paasId, setPaasId] = useState(null)
  const [provisionState, setProvisionState] = useState<ProvisionState>(ProvisionState.default())
  const dropletNameInput = useInput<string>(validationService.validateOrganisationName, "", "droplet-name")
  
  async function getPaasById(user_id){
  const paasDetails = await getPaasByUserId(user_id);
  setPaasId(paasDetails[0].id)
  return
  }

  useEffect(() => {
    
    if (user){
     getPaasById(user.id)
    }
  }, [user])
  
  useEffect(() => {
    if (regions.length && user && token) {
      setPageLoading(false)
    }
  }, [user, token, regions])

  useEffect(() => {
    if (token) {
      digitalOceanApiAdapter.getRegions().then((r) => {
        setRegions(r)
      })
    }
  }, [token])

  useEffect(() => {
    if (router.query.code) {
      apiAdapter.getDigitalOceanCode(router.query.code as string).then((r) => {
        changeToken(
          r.data.token
        )
      })
    }
  }, [router.query])

  return (
    <>
      <div className="mt-12"></div>
      <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
        <h1 className="text-3xl py-4 text-center font-bold">2️⃣ Set up</h1>
         <div className="prose prose-xl">
         Select a region closer to you or your users, pick a droplet size, assign a name and smash the button below. We'll set up your Droplet where your apps will be hosted, and an admin panel you can use to manage your instance.
        </div> 
        <div className={`grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-x-8 gap-y-5 mt-5 w-full items-start justify-items-center`}>
          {regions.map((region) => 
          <ProvisionRegionSelector
          provisionState={provisionState}
          setProvisionState={setProvisionState}
          region={region}/>)}
        </div>
        <div className='flex p-2 items-center mt-5'>
          <span className='mr-4'>
            Droplet Name:
          </span>
          <input type="text" className={`
          p-2 border-2
          ${dropletNameInput.error ? "border-red-500" : "border-green-200 "}
          `} value={dropletNameInput.value} 
          onChange={(e) => {
            e.preventDefault()
            dropletNameInput.setValue(e.target.value.toLowerCase())
          }} 
          name="droplet-name" />

        </div>
        <div className="mt-8 text-xl mx-auto">
          <Button
            onClick={() => {
              if (!dropletNameInput.validate()) {
                setPageLoading(true)
                digitalOceanApiAdapter.createDroplet(
                  dropletNameInput.value,
                  provisionState.region.slug,
                  provisionState.size
                ).then(r => {
                  userDropletsAdapter.insertOne({
                    user: user.id,
                    droplet_id: r.data.droplet.id,
                    paas_id: paasId
                  }).then(r => {
                    if (r) {
                        router.push("/onboarding/configure")
                    }
                    if (!r) {
                      makeToast("ERROR", "error", 3 )
                    }
                    setPageLoading(false)
                }).catch(error => {
                  console.log(error)
                  makeToast(error, "error", 3 )
                });
              })
            }}}
            disabled={!provisionState.region || !provisionState.size || pageLoading}
            loading = {pageLoading}
          >
            Set Up Droplet
          </Button>
          <div>
            
          </div>
        </div>
        <div className="mx-auto mt-16 flex">
          <Link href="/onboarding/connect">
            <a className="border border-gray hover:bg-gray-400 hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
              Previous step
            </a>
          </Link>
          <Link href="/onboarding/configure">
            <a className="border border-seaweed hover:bg-seaweed hover:text-white ml-4 text-xl transition py-1 px-2 focus:outline-none rounded">
              Next step
            </a>
          </Link>
        </div>
        <div className="mb-24" />
      </div>
    </>
  )
}