import { useUser } from '../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import Image from 'next/image'
import Input from '../../components/ui/Input';
import { apiAdapter } from '../../adapters/other-apps/api/adapter';
import { useDigitalOcean } from '../../components/hooks/useDigitalOcean';

export default function Provision() {

  const [user, setUser] = useState(null);
  const router = useRouter()
  const { token, changeToken } = useDigitalOcean()

  useEffect(() => {
    if (!token) {
      if (router.query.code) {
        apiAdapter.getDigitalOceanCode(router.query.code as string).then((r) => changeToken(
          r.data.token
        ))
      }
    }
  }, [router.query])

  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
    <h1 className="text-3xl py-4 text-center font-bold">2️⃣ Set up</h1>
    <div className="prose prose-xl">
    Just smash the button below. We'll set up your Droplet where your apps will be hosted, and an admin panel you can use to manage your instance.
    </div>
    <div className="mt-8 text-xl mx-auto">
    <Link href="/">
                <a style={{color: 'white', textDecoration: 'none', fontWeight: 700}} className="bg-seaweed hover:bg-green-500 transition py-1 px-2 focus:outline-none rounded">
                  Set up my Droplet!
                </a>
    </Link>
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
    <div className="mb-24"/>
    </div>
    </>
    )
}
