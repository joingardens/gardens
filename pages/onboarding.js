import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import { updateUserName } from '../utils/supabase-client';
import React, { useState, useEffect } from 'react';
import { getActiveProductsWithPrices } from '../utils/supabase-client';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../components/ui/Button';
import Image from 'next/image'
import Input from '../components/ui/Input';
import Pricing from '../components/Pricing'

export default function Apps({ products }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { signIn } = useUser();

  return (
  	<>
    <div className="mt-12"></div>
    <div className="w-full mx-auto flex flex-col md:items-center">
    <h1 className="text-3xl py-4 text-center font-bold">Please confirm your plan</h1>
    <Pricing products={products} />
    <div className="mb-24"/>
    </div>
    </>
    )
}


export async function getStaticProps() {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products
    },
    revalidate: 60
  };
}