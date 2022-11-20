import { useUser } from '../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import Image from 'next/image'
import Input from '../../components/ui/Input';

export default function Prerequisites() {

  const [user, setUser] = useState(null);
  const [hostingOption, setHostingOption] = useState(null);
  const router = useRouter();

  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
     <h1 className="text-3xl py-4 text-center font-bold">✨ Welcome to Gardens! ✨</h1>
     <h2 className="text-2xl py-4 text-center font-semibold">Select your self-hosting option:</h2>
      <div className="flex flex-col md:flex-row mx-auto">
      
    <div className="flex flex-col mt-4 sm:mt-0 md:w-1/2 h-120 border pb-6 px-8 rounded-md items-center mx-auto prose">
    <h3 className="text-left w-full ">DigitalOcean</h3>
    <div className="w-20 h-20 min-w-20 relative mx-2 mb-2">
            <Image src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/digital-ocean-logo-7B970FE624-seeklogo.com.png" alt="DigitalOcean logo" 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </div>
    <div className="mt-2">Use a DigitalOcean droplet, with prices starting at $4 per month and free credits</div>
    <Button
              variant="slim"
              className="bg-green-800 border mt-4 w-full mx-8"
              type="submit"
              onClick={() => { setHostingOption("digiocean") }}
            >
              <span className="text-white font-bold">Select</span>
    </Button>
    </div>
    <div className="flex flex-col md:w-1/2 h-120 border pb-6 px-8 sm:ml-4 rounded-md items-center mx-auto prose">
    <h3 className="text-left w-full">Local</h3>
    <div className="w-20 h-20 min-w-20 relative mx-2 mb-2">
            <Image src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/laptop_1f4bb.png" alt="Laptop emoji" 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </div>
    <div className="mt-2">Host on your own machine or server by running a couple CLI scripts</div>
    <Button
              variant="slim"
              className="bg-green-800 border mt-4 w-full mx-8"
              type="submit"
              onClick={() => { setHostingOption("local") }}
            >
              <span className="text-white font-bold">Select</span>
    </Button>
    </div>
    </div>
    {(hostingOption == 'local') ? (
      <>
    <div className="prose prose-xl mt-4">
    <div>
    <strong>This option is for Pros.</strong> 
    </div>
    <div>
    It will be a challenge if you're not experienced with managing a local setup and network. You will be installing software called <a href="https://caprover.com/docs/get-started.html" target="_blank">Caprover</a>, which is an open-source app deployment solution.
    </div>
    <div>
    You will need:
    <ul>
    <li> 
    <strong>Ubuntu 18.04</strong> or <strong>Ubuntu 22.04.</strong> Ubuntu 18.04 will receive security updates until 2023, 22.04 until 2027 at the least. Find Ubuntu installation docs here. There are known issues with 20.04 version so we don't recommend using this version.
    </li>
    </ul>
    </div>
    <div>
    The software hasn't been tested on other Linux distributions. If you still want to try, refer to <a href="https://docs.docker.com/engine/userguide/storagedriver/selectadriver/#supported-storage-drivers-per-linux-distribution" target="_blank">Docker docs</a>; and <a href="mailto:hello@joingardens.com">let us know how it goes!</a> The source code is compatible with any CPU, though the Docker build is only available for AMD64 (x86), ARM64 and ARMV7. 
    </div>
    <div>
    If your machine meets these requirements, press "Next step".
    </div>
    </div>
    <div className="mx-auto mt-8">
    <Link href="/onboarding/local/install">
    <a className="border border-seaweed hover:bg-seaweed hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
    Next step
    </a>
    </Link>
    </div>
    </>
    ) : ((hostingOption == 'digiocean') ? (
      <>
    <div className="prose prose-xl mt-4">
    Before we get started, you'll need two things: a Digital Ocean account and a domain name. Right now, we only support Digital Ocean. If you would like to use another cloud provider, <a href="https://tally.so/r/wA7Xqk" target="_blank">fill out a request here</a>. We will redirect you back when done.
    <ol>
    <li>Sign up for a free Digital Ocean account. Use our referral link if you like, this will get you a couple months of free cloud: </li>
    <Link href="https://m.do.co/c/317321ad1205">
                <a  target="_blank" rel="noopener" style={{color: 'white', textDecoration: 'none', fontWeight: 700}} className="bg-blue-500 hover:bg-blue-400 transition ml-8 py-1 px-2 focus:outline-none rounded">
                  Sign up with DigitalOcean
                </a>
    </Link>
    <li>Once signed up, <strong> make sure to add a payment method. </strong></li>
    
    <Link href="https://cloud.digitalocean.com/account/billing">
                <a  target="_blank" rel="noopener" style={{textDecoration: 'none', fontWeight: 700}} className="border border-blue-500 hover:bg-blue-400 transition ml-8 py-1 px-2 focus:outline-none rounded">
                  Add a payment method (required)
                </a>
    </Link>
    <li>Get a domain name at a domain registrar of your choice. This is required for your apps to be available from the Web. You can also use your existing domain name.</li>
    </ol>
    When ready, press "Next step".
    </div>
    <div className="mx-auto mt-8">
    <Link href="/onboarding/connect">
    <a className="border border-seaweed hover:bg-seaweed hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
    Next step
    </a>
    </Link>
    </div>
    </>) : null)
    }
    <div className="mb-24"/>
    </div>
    </>
    )
}

