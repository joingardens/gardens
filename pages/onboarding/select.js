import { useUser } from '../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import Image from 'next/image'
import Input from '../../components/ui/Input';
import PrettyBlock from '../../components/ui/PrettyBlock'

export default function Select() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-96 w-96 mx-auto flex flex-col md:items-center">
    <h1 className="text-3xl py-4 text-center font-bold">Do you have a domain?</h1>
    <PrettyBlock smallImage='https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/globe-with-meridians_1f310.png?t=2022-08-21T14%3A46%3A25.867Z'
      blockLink={'/onboarding/configure/custom'} blockBody='Use custom domain'
      flexibleHeight={true} fullWidth={true}
      blockDescription='Your very own domain! And more secure, too' />
    <PrettyBlock smallImage='https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/Gardens_circle_logo.svg'
      blockLink={'/onboarding/configure/garden'} blockBody='Use a collective.garden domain'
      flexibleHeight={true} fullWidth={true}
      blockDescription='Get a domain in the form orgname.collective.garden. Not recommended!' />
    <div className="mx-auto mt-16 flex">
    <Link href="/onboarding/provision">
    <a className="border border-gray hover:bg-gray-400 hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
    Previous step
    </a>
    </Link>
    </div>
    <div className="mb-24"/>
    </div>
    </>
    )
}

