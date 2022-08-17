import { useUser } from '../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import Image from 'next/image'
import Input from '../../components/ui/Input';

export default function Connect() {

  const [user, setUser] = useState(null);
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_DIGITAL_OCEAN_CLIENT_ID


  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
    <h1 className="text-3xl py-4 text-center font-bold">1️⃣ Connect</h1>
    <div className="prose prose-xl">
    Let's connect your Digital Ocean account. Press "Connect DigitalOcean" to start.
    </div>
    <div className="mt-8 mx-auto text-xl">
    <Link href={`
            https://cloud.digitalocean.com/v1/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=https://joingardens.com/onboarding/provision&scope=read write
          `}>
          <a  style={{color: 'white', textDecoration: 'none', fontWeight: 700}} className="bg-blue-500 hover:bg-blue-400 transition py-1 px-2 focus:outline-none rounded">
            Connect DigitalOcean
          </a>
    </Link>
    </div>
    <div className="mx-auto mt-8 flex">
    <Link href="/onboarding/prerequisites">
    <a className="border border-gray hover:bg-gray-400 hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
      Previous step
    </a>
    </Link>
    <Link href="/onboarding/provision">
    <a className="border border-seaweed hover:bg-seaweed hover:text-white ml-4 text-xl transition py-1 px-2 focus:outline-none rounded">
    Next step
    </a>
    </Link>
    </div>
    <div className="mb-24"/>
    </div>
    </>
    )
}

