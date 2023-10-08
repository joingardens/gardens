import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signInWithKeycloak } from '../utils/supabase-client';
import Button from './ui/Button';
import Link from 'next/link';
import { postData } from '../utils/helpers';
import { getStripe } from '../utils/stripe-client';
import { useUser } from '../utils/useUser';

export default function Pricing({ products }) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState('month');
  const [priceIdLoading, setPriceIdLoading] = useState();
  const { user, session, userLoaded, subscription } = useUser();

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
    <section id="pricing" className="w-4/5 mx-auto">
      <div className="w-full mx-auto">
      <div className="mt-2 mb-8">
    Unfortunately, Gardens has been shut down. Reach out to us at <a href="mailto:hello@joingardens.com">hello@joingardens.com</a> if you have a question or a proposal.
    </div>
        </div>
    </section>
  );
}
