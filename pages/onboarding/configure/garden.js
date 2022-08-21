import { useUser } from '../../../utils/useUser';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import Image from 'next/image'
import Input from '../../../components/ui/Input';

export default function ConfigureGarden() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
    <h1 className="text-3xl py-4 text-center font-bold">3️ Configure</h1>
    <div className="prose prose-xl">
    Sit back and relax. We'll provision an organization.collective.garden domain for you and configure everything.
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

