import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signInWithGoogle } from '../utils/supabase-client';

import GoogleButton from 'react-google-button'
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Logo from '../components/icons/Logo';
import { updateUserName } from '../utils/supabase-client';
import { useUser } from '../utils/useUser';

const SignUp = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();
  const { signUp } = useUser();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});
    const { error, user } = await signUp({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      if (user) {
        await updateUserName(user, name);
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
      router.replace('/account');
    }
  }, [user]);

  return (
    <form
      onSubmit={handleSignup}
      className="w-80 flex flex-col justify-between p-3 max-w-lg m-auto mb-24"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message.content && (
          <div
            className={`${
              message.type === 'error' ? 'text-pink-600' : 'text-green-600'
            } border ${
              message.type === 'error' ? 'border-pink-600' : 'border-green-600'
            } p-3`}
          >
            {message.content}
          </div>
        )}
        <Input placeholder="Name" onChange={setName} />
        <Input type="email" placeholder="Email" onChange={setEmail} required />
        <Input type="password" placeholder="Password" onChange={setPassword} />
        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={loading || !email.length || !password.length}
          >
            Sign up
          </Button>

          <GoogleButton style={{width: '100%', marginTop: '1rem'}}
          type="light" label="Sign up with Google"
           onClick={() => { signInWithGoogle() }}
            />
        </div>

        <span className="pt-1 text-center text-sm">
          <span className="text-accents-7">Do you have an account?</span>
          {` `}
          <Link href="/signin">
            <a className="text-accent-9 font-bold hover:underline cursor-pointer">
              Sign in.
            </a>
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignUp;
