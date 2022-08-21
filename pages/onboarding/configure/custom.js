import { useUser } from '../../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import Image from 'next/image'
import Input from '../../../components/ui/Input';

export default function ConfigureCustom() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
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
    </div>
    </div>
    </div>
    <div className="mt-8 text-xl mx-auto">
    <Link href="/">
                <a style={{color: 'white', textDecoration: 'none', fontWeight: 700}} className="bg-seaweed hover:bg-green-500 transition py-1 px-2 focus:outline-none rounded">
                  Configure my domain
                </a>
    </Link>
    </div>
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
    <div className="mb-24"/>
    </div>
    </>
    )
}

