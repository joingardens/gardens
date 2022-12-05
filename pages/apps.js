import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import { updateUserName } from '../utils/supabase-client';
import LightHeroD from '../components/ui/Hero';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import { signInWithKeycloak, getActiveProductsWithPrices } from '../utils/supabase-client';
import Link from 'next/link';
import Button from '../components/ui/Button';
import Image from 'next/image'
import Input from '../components/ui/Input';
import Logo from '../components/icons/Logo';
import Pricing from '../components/Pricing'

export default function Apps({ products }) {

  const [ctaState, setCtaState] = useState("bg-seaweed text-white hover:bg-green-500 transition")
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { signIn } = useUser();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});
    const { error, user } = await signIn({ email });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      if (user) {
        setUser(user);
      } else {
        setMessage({
          type: 'note',
          content: 'Check your email for the confirmation link.'
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/onboarding');
    }
  }, [user]);

  return (
  	<>
    <div className="mt-12"></div>   
    <div className="flex flex-col w-full">
    <div className="md:w-2/3 mx-auto flex flex-col md:flex-row md:items-center">
    <div className="md:w-1/2">
    <LightHeroD toLeft={true} heading="Host apps in your own cloud and save on SaaS" 
    subheading="Set up self-hosted apps in one click and manage them from an admin dashboard. No code required."
      />
      <form
      onSubmit={handleSignin}
      className="flex items-center w-full"
    >
      <div className="flex flex-wrap mx-auto -mt-4">
        {/*<Input type="email" className="h-12" placeholder="Email" onChange={setEmail} required />
        message.content && (
          <div
            className={`${
              message.type === 'error' ? 'text-pink-600' : 'text-green-600'
            } border ${
              message.type === 'error' ? 'border-pink-600' : 'border-green-600'
            } p-3 my-2`}
          >
            {message.content}
          </div>
        )
        */}
       <div className="flex">
        <Button
              variant="slim"
              className="bg-green-500 w-72 md:w-96 border"
              type="submit"
              loading={loading}
              onClick={() => { signInWithKeycloak() }}
            >
              <span className="text-white font-bold">Get Started</span>
            </Button>
        </div>
        </div>
    </form>
    </div>
    <div className="w-1/2 pt-8 md:pt-0 md:ml-12">
    <div className="rounded w-5/6">
    <div className="w-96 h-72 relative  mx-auto">
    <Image
    layout="fill" 
    objectFit="cover"
    src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/Visual.png?t=2022-08-14T10%3A52%3A42.569Z" />
    </div>
    </div>
    </div>
    </div>
    <div className="md:w-2/3 mx-auto prose text-lg max-w-full px-4 mt-6">
    <div>
    <h2 className="text-center">Why would I want to host my own apps?</h2>
    It's simple!
    <ul>
    <li>Own all your data and don't give up privacy</li>
    <li>Avoid being locked in to any SaaS service. Migrate away at any time, your data stays with you.</li>
    <li>Use open-source apps, support the movement while enjoying high-quality products </li>
    <li>Become part of a community of self-hosting enthusiasts, get advice and share knowledge</li>
    </ul>
    </div>
    <h2 className="text-center">Pricing</h2>
    </div>
    <div className="mt-2 mb-8">
    <Pricing products={products} />
    </div>
    <div>
   
    <div className="md:w-2/3 mx-auto prose text-lg max-w-full px-4 mt-6">
    <h2 className="text-center">Three simple steps</h2>
    <h3 className="text-center md:text-left">Connect your cloud or run a CLI script</h3>
    <div className="flex md:flex-row flex-col w-full items-center">
    <div className="h-full w-16 border border-blue-700 rounded-full shadow p-2 m-2 text-center my-auto">
    <div className="my-2 md:my-0 px-3.5 font-bold">1</div></div>
    <div className="ml-2 md:ml-4 text-center md:text-left pt-2">
    Run one line in CLI on your machine or install without code in your cloud. Gardens will provision a droplet with an admin app installed and configure everything for you. 
    </div>
    </div>
    <h3 className="text-center md:text-left">Select apps</h3>
    <div className="flex md:flex-row flex-col w-full items-center">
    <div className="h-full w-16 border border-blue-700 rounded-full shadow p-2 m-2 text-center my-auto">
    <div className="my-2 md:my-0 px-3.5 font-bold">2</div></div>
    <div className="ml-2 md:ml-4 text-center md:text-left pt-2">
    Pick from a library of 176 one-click apps, featuring classics like Wordpress, Discourse, and Nextcloud, but also new challengers. If you are a coder, deploy your apps from version control or with CI/CD.
    </div>
    </div>
    <h3 className="text-center md:text-left">Enjoy!</h3>
    <div className="flex md:flex-row flex-col w-full items-center">
    <div className="h-full w-16 border border-blue-700 rounded-full shadow p-2 m-2 text-center my-auto">
    <div className="my-2 md:my-0 px-3.5 font-bold">3</div></div>
    <div className="ml-2 md:ml-4 text-center md:text-left pt-2">
    Your apps are up and running with SSL, basic configuration and analytics taken care of. It just works, out of the box.
    </div>
    </div>
    <h2 className="text-center">Hosting options</h2>
    </div>
    <div className="flex flex-row justify-between overflow-x-auto my-12">
    <div className="flex flex-col h-120 border pb-6 px-8 rounded-md items-center mr-4 prose w-96">
    <h3 className="text-left w-full">DigitalOcean</h3>
    <div className="w-20 h-20 min-w-20 relative mx-2 mb-2">
            <Image src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/digital-ocean-logo-7B970FE624-seeklogo.com.png" alt="DigitalOcean logo" 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </div>
    <span className="w-full mt-2 text-green-700 font-semibold">Available</span>
    <div className="mt-2">Use a DigitalOcean droplet, with prices starting at $4 per month and free credits</div>
    <Button
              variant="slim"
              className="bg-green-500 border mt-4 w-full mx-8"
              type="submit"
              loading={loading}
              onClick={() => { signInWithKeycloak() }}
            >
              <span className="text-white font-bold">Let's go!</span>
    </Button>
    </div>
    <div className="flex flex-col h-120 border pb-6 px-8 rounded-md items-center mr-4 prose w-96">
    <h3 className="text-left w-full">Local</h3>
    <div className="w-20 h-20 min-w-20 relative mx-2 mb-2">
            <Image src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/laptop_1f4bb.png" alt="Laptop emoji" 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </div>
    <span className="w-full mt-2 text-green-700 font-semibold">Available</span>
    <div className="mt-2">Host on your own machine or server by running a couple CLI scripts</div>
    <Button
              variant="slim"
              className="bg-green-500 border mt-4 w-full mx-8"
              type="submit"
              loading={loading}
              onClick={() => { signInWithKeycloak() }}
            >
              <span className="text-white font-bold">Sign up</span>
    </Button>
    </div>
    <div className="flex flex-col h-120 border pb-6 px-8 rounded-md items-center mr-4 prose w-96">
    <h3 className="text-left w-full">Oracle</h3>
    <div className="w-20 h-20 min-w-20 relative mx-2 mb-2">
            <Image src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/cloud_2601-fe0f.png" alt="Cloud emoji" 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </div>
    <span className="w-full mt-2 text-yellow-600 font-semibold">Coming in Q4 2022</span>
    <div className="mt-2 mb-4">Take advantage of Oracle infrastructure, including Always Free tier machines</div>
    <Button
              variant="slim"
              className="bg-green-800 border w-full mt-6 md:mt-5 lg:mt-0 mx-8"
              type="submit"
              loading={loading}
              onClick={() => { location.assign("https://tally.so/r/wA7Xqk") }}
            >
              <span className="text-white font-bold">Join Waitlist</span>
    </Button>
    </div>
    <div className="flex flex-col h-120 border pb-6 px-8 rounded-md items-center mr-4 prose w-96">
    <h3 className="text-left w-full">Your Cloud</h3>
    <div className="w-20 h-20 min-w-20 relative mx-2 mb-2">
            <Image src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/magnifying-glass-tilted-left_1f50d.png" alt="Magnifying glass emoji" 
            layout='fill' objectFit='contain' objectPosition='center center' />
            </div>
    <div className="mt-2 mb-9">Request a different hosting option or let us know about your preferred cloud provider</div>
    <Button
              variant="slim"
              className="bg-green-800 border mt-3 w-full mx-8"
              type="submit"
              loading={loading}
              onClick={() => { location.assign("https://tally.so/r/wA7Xqk") }}
            >
              <span className="text-white font-bold">Add a Request</span>
    </Button>
    </div>
    </div>
    <div className="md:w-2/3 mx-auto prose text-lg max-w-full px-4 mt-6">
    
    <h2 className="text-center">🌟 No lock-in whatsoever</h2>
    <div>All the data, along with apps, lives in your own cloud. You can always remove Gardens admin app from your server. Your apps will continue working. Only DevOps people could do this in the past!
    </div>
    <h3>Before (Without Gardens)</h3>
    <ul>
    <li>Set up and configure a VPS/Droplet</li>
    <li>Configure NGINX or another reverse proxy</li>
    <li>Provision LetsEncrypt certificates</li>
    <li>Install Docker, pull images, they're not working, get them to work, try configuring apps, doesn't work, give up, cry</li>
    </ul>
    <h3>Now (With Gardens)</h3>
    <ul>
    <li>Smash that button! 👇 💥</li>
    <li>Everything just works</li>
    </ul>
    <div>
    <h2 className="text-center">Scaling? No problem!</h2>
    If you ever hit the limit of one instance of your app can do, you can scale by adding more instances of the app, or by adding more droplets. Load will be auto-magically distributed through the power of Docker Swarm.
    </div>
    <div className="flex flex-col items-center bg-green-50 w-full justify-center mt-8">
    <div className="flex items-center py-4">
    <Logo className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white mt-8 mr-4 shadow" />
    <h2 className="w-64">Seriously, try it.<br/> 7 days free trial! </h2>
    </div>
    <Button
              variant="slim"
              className="bg-green-500 w-72 md:w-96 border mb-12"
              type="submit"
              loading={loading}
              onClick={() => { signInWithKeycloak() }}
            >
              <span className="text-white font-bold">Sign Up</span>
            </Button>
    </div>
    <h2 className="text-center">FAQ</h2>
    <div>
    <h3>❓ Who is this for?</h3>
    Gardens Apps is meant for anyone who needs to host their own apps, or who is curious to learn more about self-hosting and open-source. It's perfect for non-profit and social enterprises, and for hobbyists who find themselves hosting many apps at once.
    </div>
    <div>
    <h3>❓ If both the admin interface and apps live on my own machine, how does Gardens make money?</h3>
    We charge a monthly subscription for access to our hand-picked library of best open-source apps, and for additional features, such as tools for organizing your knowledge and a nice home page for your team. You're free to cancel subscription at any time though, your apps and the admin interface will stay with you.
    </div>
    <div className="flex flex-col items-center bg-green-50 w-full justify-center mt-8">
    <div className="flex items-center py-4">
    <Logo className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white mt-8 mr-4 shadow" />
    <h2 className="w-64">Start owning your digital infrastructure</h2>
    </div>
    <Button
              variant="slim"
              className="bg-green-500 w-72 md:w-96 border mb-12"
              type="submit"
              loading={loading}
              onClick={() => { signInWithKeycloak() }}
            >
              <span className="text-white font-bold">Join Gardens Now</span>
            </Button>
    </div>
    </div>
    </div>
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
