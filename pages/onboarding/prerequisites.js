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
  const router = useRouter();

  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
    <h1 className="text-3xl py-4 text-center font-bold">✨ Welcome to Gardens! ✨</h1>
    <div className="prose prose-xl">
    Before we get started, you'll need two things: a Digital Ocean account and a domain name.
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
    <div className="mb-24"/>
    </div>
    </>
    )
}

