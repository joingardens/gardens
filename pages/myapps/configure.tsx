import { useUser } from '../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import PrettyBlock from '../../components/ui/PrettyBlock'
import Link from 'next/link';
import Button from '../../components/ui/Button';
import Image from 'next/image'
import Input from '../../components/ui/Input';
import { useDigitalOcean } from '../../components/hooks/useDigitalOcean';
import { userDropletsAdapter } from '../../adapters/userDroplets/adapter';
import { apiAdapter, CaproverServerApiAdapter, DreamhostServerAdapter } from '../../adapters/other-apps/api/adapter';
import { DigitalOceanNetworkType } from '../../adapters/other-apps/digital-ocean/digitalOceanAdapter';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInput } from '../../components/hooks/useInput';
import { validationService } from '../../services/validationService';
import { useForm } from '../../components/hooks/useForm';
import { userPaasAdapter } from '../../adapters/userPaas/adapter';
import useToast from '../../components/hooks/useToast';

export enum ConfigureInputNames {
  DOMAIN="domain",
  EMAIL="email"
}

export enum FlowTypes {
  CUSTOM="custom",
  GARDENS="gardens"
}

export default function ConfigureCustom() {

  const { user } = useUser()
  const router = useRouter();
  const { digitalOceanApiAdapter, token} = useDigitalOcean()
  const [ dreamhostAdapter, setDreamhostAdapter ] = useState<DreamhostServerAdapter>()
  const [ dropletId, setDropletId ] = useState<number>()
  const [ serverAdapter, setServerAdapter ] = useState<CaproverServerApiAdapter>()
  const [ dropletIp, setDropletIp] = useState("118.0.0.0 (this should be the IP of your droplet from DigitalOcean)")
  const [ pageLoading, setPageLoading ] = useState<boolean>(true)
  const [ parent ] = useAutoAnimate<HTMLDivElement>()
  const [ parent2 ] = useAutoAnimate<HTMLDivElement>({duration: 1000})
  const domainInput = useInput(validationService.validateDomainName, "", ConfigureInputNames.DOMAIN)
  const emailInput = useInput(validationService.validateEmail, "", ConfigureInputNames.EMAIL)
  const [ flowType, setFlowType ] = useState<`${FlowTypes}`>(null)
  const toaster = useToast()

  const ConfigureFormHandler = async () => {
    const resp1 = await serverAdapter.caproverSetRootDomain(domainInput.value)
    console.log(resp1)
    const resp2 = await serverAdapter.caproverEnableSSL(emailInput.value)
    console.log(resp2)
    const resp3 = await serverAdapter.caproverForceSSL()
    console.log(resp3)
    router.push("/myapps")
    return resp3
  }

  const formState = useForm([domainInput, emailInput], ConfigureFormHandler)

  useEffect(() => {
    if (user) {
      userDropletsAdapter
      .findOneByQuery({user: user.id})
      .then((r) => {
        if (r.body[0]){
        setDropletId(r.body[0].droplet_id)
      }
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
          setDropletIp(publicNetwork.ip_address)
          const adapter = new CaproverServerApiAdapter(publicNetwork.ip_address)
          const adapter2 = new DreamhostServerAdapter(publicNetwork.ip_address)
          adapter
          .caproverLogin()
          .then((r) => {
            setPageLoading(false)
            setServerAdapter(adapter.setToken(r.data.token))
            setDreamhostAdapter(adapter2)
          })
          .catch((e) => {
            console.log(e)
            toaster.makeToast("Could not configure the droplet. Try again in a few minutes", "error", 3)
          })
        } else {
        setTimeout(() => {
          console.log("Performing automatic reload")
    router.reload()
   }, 60000)
      }
      })
    } 
  }, [dropletId, token])


  return (
    <div ref={parent}>
      {
        pageLoading 
        ? 
        <div className="py-36 flex flex-col justify-center">
    <h1 className="text-2xl text-center text-blue-700 py-4 font-semibold">Connecting to cloud provider...</h1>
    <div className="mx-auto my-2">
    <Image alt="Animated tea with teabag" width="100" height="100"
        src={"https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/icons8-tea.gif"} />
    </div>
    <p className="text-xl text-center">Your droplet is being configured on DigitalOcean.</p>
    <p className="text-xl text-center"> Refresh this page in a few minutes or <a className="text-blue-600 underline font-bold" href="https://cloud.digitalocean.com/projects" target="_blank">visit your dashboard</a> to check the status.</p>
    </div>
        :
        <>
        <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center mt-16">
          <h1 className="text-3xl text-center font-bold mt-2">Configure</h1>
          <div className='w-full mx-auto flex flex-col md:flex-row mt-6'>
          <div className="cursor-pointer md:w-1/2" onClick={() => setFlowType("custom")}>
          <PrettyBlock smallImage='https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/globe-with-meridians_1f310.png?t=2022-08-21T14%3A46%3A25.867Z'
             blockBody='Use custom domain'
             flexibleHeight={true} fullWidth={true}
             blockDescription='Your very own domain! And more secure, too'
              />
          </div>
          <div className="cursor-pointer md:w-1/2">
          <PrettyBlock smallImage='https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/Gardens_circle_logo.svg'
             blockBody='Use a collective.garden domain'
             flexibleHeight={true} fullWidth={true}
             blockDescription='Get a free collective.garden domain. Coming soon!'/>
          </div>
          </div>
          <div className='w-full pt-5' ref={parent2}>
          {
            flowType === "custom" 
            ? 
            <>
            <div className="prose prose-xl">
              <div>
                You will need to point your domain to your Droplet.
              </div>
              <div>
              If you don't have a domain yet, get one from a domain provider of your choice. If you're just testing, free domains are available on <a href="https://www.freenom.com/" target="_blank">Freenom</a>.
              </div>
              <div>
                Once you have the domain, go to your domain management panel , and add a DNS record with the following settings:
                <ul>
                  <li>Type: <strong>A</strong></li>
                  <li>Host: <strong>*.apps</strong></li>
                  <li>Destination: <strong>{dropletIp}</strong></li>
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
              : <></>
            }
          </div>
              <Button 
              disabled = {formState.errors[ConfigureInputNames.EMAIL] || formState.errors[ConfigureInputNames.DOMAIN]}
              loading = {formState.loading}
              className={`flex items-center p-2`}>
                Configure droplet
              </Button>
          </form>
          </>
          : flowType === "gardens" ?
          <>
            <form 
            className={`grid grid-cols-1 gap-5 md:w-2/3 w-4/5 mx-auto`}
            onSubmit={(e) => {
              let domain = ""
              e.preventDefault()
              formState.setLoading(true)
              userPaasAdapter.findOneByQuery({user: user.id})
              .then(r => {
                domain = `${r.data[0].org_name.toLowerCase()}.collective.garden`
                dreamhostAdapter.addDnsRecord(domain).then(async () => {
                  domainInput.setValue(domain)
                  const data = await formState.submit()
                  console.log(data)
                  if (!data) {
                    formState.setLoading(false)
                    toaster.makeToast("ERROR", "error", 3)
                    return
                  }
                  console.log(data)
                }).catch(e => {
                  formState.setLoading(false)
                  console.log(e)
                  toaster.makeToast(`${e}`, "error", 3)
                  return
                })
              })
              .catch(e => {
                formState.setLoading(false)
                console.log(e)
                toaster.makeToast(`${e}`, "error", 3)
                return
              })
            }}>
            <div className='mt-5 text-2xl font-bold'>
              Droplet data
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
                  : <></>
                }
              </div>
              <Button 
              disabled = {formState.errors[ConfigureInputNames.EMAIL] || formState.loading}
              loading = {formState.loading}
              className={`flex items-center p-2`}>
                Configure droplet
              </Button>
            </form>
          </>
          : null
          }

          </div>
          <div className="mb-24" />
        </div>




          </>
        } 
      </div>

  )
}

