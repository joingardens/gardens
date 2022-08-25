import { useUser } from '../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect, FC } from 'react';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import { apiAdapter } from '../../adapters/other-apps/api/adapter';
import { useDigitalOcean } from '../../components/hooks/useDigitalOcean';
import { DigitalOceanRegion } from '../../adapters/other-apps/digital-ocean/digitalOceanAdapter';
import { useAutoAnimate } from '@formkit/auto-animate/react'

class ProvisionState {
  region: string
  size: string

  static default() {
    return {
      region: "",
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
  const regionMatch = provisionState.region === region.name
  return (
    <div ref={parent} className='w-full'>
    <button 
    className={`
    ${regionMatch ? "border-yellow-400" : ""}
    border-2 p-2 w-full flex justify-center focus:outline-none
    `}
    onClick={() => {
      if (regionMatch) {
        setProvisionState(ProvisionState.default)
        return
      }
      setProvisionState({
        region: region.name,
        size: ''
      })
    }}>
      {region.name}
    </button>
    {
      provisionState.region === region.name
        ?
        <div className='grid w-full grid-cols-1 rounded-b-md bg-gray-300'>
          {region.sizes.map(a => {
            if (a === "s-1vcpu-1gb" || a === "s-2vcpu-2gb")
            return (
              <button className='p-1 border'> 
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

  const [user, setUser] = useState(null);
  const router = useRouter()
  const { changeToken, digitalOceanApiAdapter, token } = useDigitalOcean()
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [regions, setRegions] = useState<DigitalOceanRegion[]>([])
  const [provisionState, setProvisionState] = useState<ProvisionState>(ProvisionState.default())

  useEffect(() => {
    if (token) {
      digitalOceanApiAdapter.getRegions().then((r) => {
        setPageLoading(false)
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
        {/* <div className="prose prose-xl">
      Just smash the button below. We'll set up your Droplet where your apps will be hosted, and an admin panel you can use to manage your instance.
    </div> */}
        <div className={`grid grid-cols-4 gap-x-8 gap-y-5 mt-5 w-full items-start justify-items-center`}>
          {regions.map((region) => 
          <ProvisionRegionSelector
          provisionState={provisionState}
          setProvisionState={setProvisionState}
          region={region}
          >

          </ProvisionRegionSelector>)}
        </div>
        <div className="mt-8 text-xl mx-auto">
          <Button

          >
            Set Up Droplet
          </Button>
        </div>
        <div className="mx-auto mt-16 flex">
          <Link href="/onboarding/connect">
            <a className="border border-gray hover:bg-gray-400 hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
              Previous step
            </a>
          </Link>
          <Link href="/onboarding/select">
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

