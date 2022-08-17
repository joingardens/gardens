import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import { updateUserName } from '../utils/supabase-client';
import LightHeroD from '../components/ui/Hero';
import React, { useState, useEffect } from 'react';
import ParagraphWithButton from '../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../components/ui/Button';
import Image from 'next/image'
import Input from '../components/ui/Input';

export default function Apps() {

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
      className="flex p-3 items-center w-full"
    >
      <div className="flex flex-wrap">
        <Input type="email" className="h-12" placeholder="Email" onChange={setEmail} required />
        {message.content && (
          <div
            className={`${
              message.type === 'error' ? 'text-pink-600' : 'text-green-600'
            } border ${
              message.type === 'error' ? 'border-pink-600' : 'border-green-600'
            } p-3 my-2`}
          >
            {message.content}
          </div>
        )}
       <div className="flex">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            className="bg-green-300"
          >
            Get Started
          </Button>
        </div>
      </div>
    </form>
    </div>
    <div className="w-1/2 pt-8 md:pt-0 md:ml-12">
    <div className="rounded w-5/6">
    <div className="w-96 h-72 relative mx-auto">
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
    <h2>Why would I want to host my own apps?</h2>
    It's simple!
    <ul>
    <li>Own all your data and don't give up privacy</li>
    <li>Avoid being locked in to any SaaS service. Migrate away at any time, your data stays with you.</li>
    <li>Use open-source apps, support the movement while enjoying high-quality products </li>
    <li>Become part of a community of self-hosting enthusiasts, get advice and share knowledge</li>
    </ul>
    </div>
    <div>
    <h2>Three simple steps</h2>
    <h3>Connect your cloud</h3>
    <div className="flex md:flex-row flex-col w-full">
    <div className="h-full mx-auto w-16 border border-blue-700 rounded-full shadow p-2 m-2 text-center my-auto">
    <div className="my-2 md:my-0 py-1 px-3.5 font-bold">1</div></div>
    <div className="ml-2 md:ml-4">
    Sign up with Digital Ocean and grab a token. Gardens will provision a droplet with <a href="https://caprover.com/">Caprover</a> installed and configure everything for you. You will only need a domain.
    </div>
    </div>
    <h3>Select apps</h3>
    <div className="flex md:flex-row flex-col w-full">
    <div className="h-full mx-auto w-16 border border-blue-700 rounded-full shadow p-2 m-2 text-center my-auto">
    <div className="my-2 md:my-0 py-1 px-3.5 font-bold">2</div></div>
    <div className="ml-2 md:ml-4">
    Pick from a library of 176 one-click apps, featuring classics like Wordpress, Discourse, and Nextcloud, but also new challengers. If you are a coder, deploy your apps from version control or using the CLI.
    </div>
    </div>
    <div>
    <h3>Enjoy!</h3>
    <div className="flex md:flex-row flex-col w-full">
    <div className="h-full mx-auto w-16 border border-blue-700 rounded-full shadow p-2 m-2 text-center my-auto">
    <div className="my-2 md:my-0 py-1 px-3.5 font-bold">3</div></div>
    <div className="ml-2 md:ml-4">
    Your apps are up and running with SSL, basic configuration and analytics taken care of. It just works, out of the box.
    </div>
    </div>
    </div>
    </div>
    <h2>🌟 No lock-in whatsoever</h2>
    All the data, along with apps, lives in your own cloud. You can always remove Gardens or the underlying <a href="https://caprover.com/">Caprover</a> software. Your apps will continue working.
    <h2>Only DevOps people could do this in the past!</h2>
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
    <h2>Scaling? No problem!</h2>
    If you ever hit the limit of one instance of your app can do, you can scale by adding more instances of the app, or by adding more droplets. Load will be auto-magically distributed through the power of Docker Swarm.
    </div>
    <h2>FAQ</h2>
    <div>
    <h3>❓ Who is this for?</h3>
    Gardens Apps is meant for anyone who needs to host their own apps, or who is curious to learn more about self-hosting and open-source. It's perfect for non-profit and social enterprises, and for hobbyists who find themselves hosting many apps at once.
    </div>
    <div>
    <h3>❓ If both the admin interface and apps live on my own cloud, how does Gardens make money?</h3>
    We charge a monthly subscription for access to our hand-picked library of best open-source apps, and for additional features, such as tools for organizing your knowledge and a nice home page for your team. You're free to cancel subscription at any time though, your apps and the admin interface will stay with you.
    </div>
    <div>
    <h3>❓ What is this Caprover thing that your platform is based on? How does it work?</h3>
    Caprover is an open-source PaaS (Platform-as-a-Service) offering developers a simple way to set up an admin dashboard on their cloud and deploy apps. Gardens is building on this great product by adding features for people who don't know how to code, and by curating a library of  no-code and low-code apps. We stay open-source ourselves, too. It's open-source all the way down!
    </div>
    </div>
    <div className="mb-24"/>
    </div>
    </>
    )
}