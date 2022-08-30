import { useUser } from '../../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import Image from 'next/image'
import Input from '../../../components/ui/Input';
import { useDigitalOcean } from '../../../components/hooks/useDigitalOcean';
import { userDropletsAdapter } from '../../../adapters/userDroplets/adapter';
import { CaproverServerApiAdapter } from '../../../adapters/other-apps/api/adapter';
import { DigitalOceanNetworkType } from '../../../adapters/other-apps/digital-ocean/digitalOceanAdapter';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInput } from '../../../components/hooks/useInput';
import { validationService } from '../../../services/validationService';
import { useForm } from '../../../components/hooks/useForm';

export enum ConfigureInputNames {
  DOMAIN="domain",
  EMAIL="email"
}

export default function ConfigureCustom() {

  const { user } = useUser()
  const router = useRouter();
  const { digitalOceanApiAdapter, token} = useDigitalOcean()
  const [ dropletId, setDropletId ] = useState<number>()
  const [ serverAdapter, setServerAdapter ] = useState<CaproverServerApiAdapter>()
  const [ pageLoading, setPageLoading ] = useState<boolean>(true)
  const [ parent ] = useAutoAnimate<HTMLDivElement>()
  const domainInput = useInput(validationService.validateDomainName, "", ConfigureInputNames.DOMAIN)
  const emailInput = useInput(validationService.validateEmail, "", ConfigureInputNames.EMAIL)


  const ConfigureFormHandler = async () => {
    const resp1 = await serverAdapter.caproverSetRootDomain(domainInput.value)
    const resp2 = await serverAdapter.caproverEnableSSL(emailInput.value)
    const resp3 = await serverAdapter.caproverForceSSL()
  }

  const formState = useForm([domainInput, emailInput], ConfigureFormHandler)

  useEffect(() => {
    if (user) {
      userDropletsAdapter
      .findOneByQuery({user: user.id})
      .then((r) => {
        setDropletId(r.body[0].droplet_id)
      })
    }
  }, [user])

  useEffect(() => {
    if (token && dropletId) {
      digitalOceanApiAdapter
      .getDroplet(dropletId)
      .then(r => {
        const networks = r.data.droplet.networks
        let publicNetwork: DigitalOceanNetworkType = null
        for (let network of networks.v4) {
          if (network.type === "public") {
            publicNetwork = network
          }
        }
        if (publicNetwork) {
          const adapter = new CaproverServerApiAdapter(publicNetwork.ip_address)
          adapter
          .caproverLogin()
          .then((r) => {
            setPageLoading(false)
            setServerAdapter(adapter.setToken(r.data.token))
          })
        }
      })
    }
  }, [dropletId, token])


  return (
    <div ref={parent}>
      {
        pageLoading 
        ? 
        <h1>Waiting for page to load...</h1>
        :
        <>
        <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center mt-12">
          <h1 className="text-3xl py-4 text-center font-bold">3️ Configure</h1>
          <div className="prose prose-xl">
            <div>
              You will need to point your domain to your Droplet.
            </div>
            <div>
              To do this, go to your domain management panel , and add a DNS record with the following settings:
              <ul>
                <li>Type: <strong>A</strong></li>
                <li>Host: <strong>*.apps</strong></li>
                <li>Destination: <strong>118.0.0.0</strong></li>
                <li>TTL: (leave as default, not important)</li>
              </ul>
              <div>
                Where "apps" in the Host value can be any name you want. if you want your domain to look like <strong>internal.yourdomain.com</strong>, value of host will be <strong>*.internal</strong>.
              </div>
              <div>
                If you use one of these example values, your apps will have domains like "appname.apps.yourdomain.com" or "appname.internal.yourdomain.com". You're free to choose any value you want though.
              </div>
              <div className="mt-4">
                When ready, check that DNS settings updates have propagated, e.g. by using the following helper website. Be patient, it might take up to 24 hours for changes to propagate.
              </div>
              <div className="mt-4">
                Once you see that the DNS records are correct, type your domain in below in the format of e.g. <strong>apps.yourdomain.com</strong> and press "Configure my domain".
                We will also need your email to provision an SSL certificate.
              </div>
            </div>
          </div>
         <form className={`grid grid-cols-1 gap-5 md:w-2/3 w-4/5 mx-auto`} onSubmit={(e) => {
          e.preventDefault()
          const result = formState.submit()
        }}>
          <div className='mt-5 text-2xl font-bold'>
            Droplet data
          </div>
          <div>
            <div>
              Domain name
            </div>
            <input
            onChange={(e) => {
              domainInput.setValue(e.target.value.toLowerCase())
            }}
            className={`
            ${formState.errors[ConfigureInputNames.DOMAIN] ? "border-red-500" : "border-green-500"}
            rounded-md transition-all p-2 border-2 mt-2 w-full`}/>
            {formState.errors[ConfigureInputNames.DOMAIN] 
              ?
              "Domain name is invalid"
              :
              <></>
            }
          </div>
          <div>
            <div>
              Email
            </div>
            <input
            onChange={(e) => {
                emailInput.setValue(e.target.value.toLowerCase())
            }}
            className={`
            ${formState.errors[ConfigureInputNames.EMAIL] ? "border-red-500" : "border-green-500"}
            rounded-md transition-all p-2 border-2 mt-2 w-full`}/>
            {formState.errors[ConfigureInputNames.EMAIL] 
              ?
              "Email is invalid"
              :
              <></>
            }
          </div>
          <Button 
          disabled = {formState.errors[ConfigureInputNames.EMAIL] || formState.errors[ConfigureInputNames.DOMAIN]}
          loading = {formState.loading}
          className={`flex items-center p-2`}>
            Configure droplet
          </Button>

        </form>
          <div className="mx-auto mt-16 flex">
            <Link href="/onboarding/select">
              <a className="border border-gray hover:bg-gray-400 hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
                Previous step
              </a>
            </Link>
            <Link href="/myapps">
              <a className="border border-seaweed hover:bg-seaweed hover:text-white ml-4 text-xl transition py-1 px-2 focus:outline-none rounded">
                Go to my apps
              </a>
            </Link>
          </div>
          <div className="mb-24" />
        </div>
        </>
      }
      </div>

  )
}

