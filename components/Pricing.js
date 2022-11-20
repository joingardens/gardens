import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signInWithKeycloak } from '../utils/supabase-client';
import Button from './ui/Button';
import { postData } from '../utils/helpers';
import { getStripe } from '../utils/stripe-client';
import { useUser } from '../utils/useUser';

export default function Pricing({ products }) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState('month');
  const [priceIdLoading, setPriceIdLoading] = useState();
  const { session, userLoaded, subscription } = useUser();

  const handleCheckout = async (price) => {
    setPriceIdLoading(price.id);
    if (!session) {
      return router.push('/signin');
    }
    if (subscription) {
      return router.push('/account');
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
        token: session.access_token
      });

      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert(error.message);
    } finally {
      setPriceIdLoading(false);
      //return router.push('/onboarding/prerequisites');
    }
  };

  if (!products.length)
    return (
      <section>
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-6xl font-extrabold text-base sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-accents-0 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

  return (
    <section id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="sm:flex sm:flex-col sm:align-center">
          <div className="relative self-start ml-4 mt-6 rounded-lg p-0.5 flex sm:mt-8 border border-accents-0">
            <button
              onClick={() => setBillingInterval('month')}
              type="button"
              className={`${
                billingInterval === 'month'
                  ? 'relative w-1/2 bg-accents-1 border-accents-0 shadow-sm text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent font-bold'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              type="button"
              className={`${
                billingInterval === 'year'
                  ? 'relative w-1/2 bg-accents-1 border-accents-0 shadow-sm text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent font-bold'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Annual billing
            </button>
          </div>
        </div>
        <div className="mt-2 sm:mt-4 flex sm:flex-row flex-col">
          {products.map((product) => {
            if (product){
            const price = product.prices.find(
              (price) => price.interval === billingInterval
            );
            if (price){
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency,
              minimumFractionDigits: 0
            }).format(price.unit_amount / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-accents-2 bg-gray-50  mx-4 sm:w-1/2',
                  {
                    'border border-pink': subscription
                      ? product.name === subscription?.prices?.products.name
                      : product.name === 'Freelancer'
                  }
                )}
              >
                <div className="px-6 pb-4">
                  <h2 className="text-2xl font-semibold" style={{marginTop: "1em"}}>
                    {product.name}
                  </h2>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-accents-8">
                      /{billingInterval}
                    </span>
                  </p>
                  {product.name == "Hobby" ? (
                  <>
                  <span className="font-bold mt-1 text-green-500">7 days free trial</span>
                  <div className="prose text-lg mt-3">
                  For small teams and hobbyists.
                  <ul>
                  <li>Deploy apps to your cloud in one click. </li>
                  <li>Access our curated library of high-quality apps</li>
                  <li>Get an admin dashboard to manage your apps</li>
                  </ul>
                  </div>
                  </>) : null}
                  {product.name == "Corporate" ? (
                  <div className="prose text-lg mt-2">
                  <ul>
                  <li>For employees or owners of companies with more than $1M annual revenue</li>
                  <li>Same features as Hobby subscription plan</li>
                  <li>Commercial use allowed</li>
                  <div className="mt-20 pt-1"></div>
                  </ul>
                  </div>) : null}
                   <Button
              variant="slim"
              className="bg-green-500 w-64 md:w-44 lg:w-64 border mt-4 mx-2"
              type="submit"
              onClick={() => { signInWithKeycloak() }}
            >
              <span className="text-white font-bold">Let's go!</span>
            </Button>
                </div>
              </div>
            );
            }
            }
          })}
          {(billingInterval === 'month') ? (
          <div className="md:w-1/2 bg">
                <div className="px-6 pb-4 ">
                  <h2 className="text-2xl leading-6 font-semibold" style={{marginTop: "1em"}}>
                    Corporate
                  </h2>
                  <div className="mt-6 sm:mt-28 pt-4 md:mt-30"></div>
                  <div className="prose text-lg mt-2">
                  <ul>
                  <li>For employees or owners of companies with more than $1M annual revenue</li>
                  <li>Same features as Hobby subscription plan</li>
                  </ul>
          <div className="mt-4 text-center cursor-pointer"
              onClick={() => { setBillingInterval('year') }}>
              <div className="font-semibold underline">Annual only, press to view</div>
            </div>
                  </div>
                  </div>
                  </div>): null}
        {/*<div className='rounded-lg shadow-sm divide-y divide-accents-2 bg-gray-50 mt-4 lg:mt-0 lg:ml-4'>
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold">
                   Enterprise
                  </h2>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold white">
                      Contact us
                    </span>
                  </p>
                  <div className="prose text-lg mt-4">
                  For bigger organisations and teams looking to scale. Everything in Subscription plus:
                  <ul>
                  <li>Designated Support manager</li>
                  <li>Custom config and back-ups</li>
                  <li>Done-for-you migrations and integrating with existing infrastructure</li>
                  </ul>
                  </div>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={session && !userLoaded}
                    onClick={() => location.replace("https://cal.com/gardens/intro")}
                    className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-center hover:bg-gray-900"
                  >
                    Talk to us
                  </Button>
                </div>
              </div>*/}
          
        </div>
        <p className="text-center text-lg mt-8 p-2 rounded border">
              Are you from a Global South / low income country? Fill out <a className="text-blue-600 font-bold underline" href="https://tally.so/r/nWO7pa" target="_blank">this form</a> to get Gardens for free
              </p>
        
      </div>
    </section>
  );
}
