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
      <div className="mt-2 mb-8">
    Unfortunately, Gardens has been shut down. Reach out to us at <a href="mailto:hello@joingardens.com">hello@joingardens.com</a> if you have a question or a proposal.
    </div>
      </div>
    </form>
  );
};

export default SignUp;
