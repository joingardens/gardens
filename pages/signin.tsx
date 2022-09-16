import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signInWithGoogle, signInWithKeycloak } from '../utils/supabase-client';

import GoogleButton from 'react-google-button'
import Button from '../components/ui/Button';
import GitHub from '../components/icons/GitHub';
import Input from '../components/ui/Input';
import LoadingDots from '../components/ui/LoadingDots';
import Logo from '../components/icons/Logo';
import { useUser } from '../utils/useUser';
import { userAdapter } from '../adapters/user/adapter';

enum InputStateTypes {
  PASSWORD="password",
  MAGIC_LINK="magic-link",
  FORGOT_PASSWORD="password-forgot"
}

class InputSwitchDirectionMessage {
  constructor(
    public readonly to: `${InputStateTypes}`,
    public readonly message: string,
    public readonly additional?: InputSwitchDirectionMessage
  ) {}
}

const inputSwitchObj = {
  [InputStateTypes.PASSWORD] : new InputSwitchDirectionMessage(
    InputStateTypes.MAGIC_LINK,
    "Or sign in with magic link",
    new InputSwitchDirectionMessage(InputStateTypes.FORGOT_PASSWORD, "Forgot password?")
    ),
  [InputStateTypes.MAGIC_LINK] : new InputSwitchDirectionMessage(
    InputStateTypes.PASSWORD, 
    "Or sign in with password",
    ),
  [InputStateTypes.FORGOT_PASSWORD] : new InputSwitchDirectionMessage(
    InputStateTypes.PASSWORD, 
    "Back to the password input"
    )
}

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [ inputState, setInputState ] = useState<`${InputStateTypes}`>(InputStateTypes.MAGIC_LINK)
  const router = useRouter();
  const { user, signIn } = useUser();

  const handleSignin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({ type: '', content: '' });

    const { error } = await signIn({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    if (!password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link.'
      });
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    setLoading(false);
  };

  const handleRecovery = async (e) => {
    e.preventDefault();
    const {data, error} = await userAdapter.sendRecoveryRequest(email)
    if (error) {
      setMessage({ type: 'error', content: error.message })
      return
    } 
    if (data) {
      setMessage({ type: "message", content: "Please check your email for password recovery instructions"})
      return
    }
  }

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  if (!user)
    return (
      <div className="w-80 flex flex-col justify-between p-3 max-w-lg m-auto mb-24">
        <h3 className="text-3xl text-center my-6">Hi there!</h3>
        <div className="flex justify-center pb-12">
          <Logo width="64px" height="64px" />
        </div>
        <div className="flex flex-col space-y-4">
          {message.content && (
            <div
              className={`${
                message.type === 'error' ? 'text-pink' : 'text-green'
              } border ${
                message.type === 'error' ? 'border-pink' : 'border-green'
              } p-3`}
            >
              {message.content}
            </div>
          )}
          {
            inputState === InputStateTypes.MAGIC_LINK
            ?
            <form onSubmit={handleSignin} className="flex flex-col space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
              required
            />
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!email.length}
            >
              Send magic link
            </Button>
            <Button
              variant="slim"
              className="bg-blue-100"
              type="submit"
              loading={loading}
              disabled={!email.length}
              onClick={() => { signInWithKeycloak() }}
            >
              Sign in with Keycloak
            </Button>
            <GoogleButton style={{width: '100%', marginTop: '1rem'}}
            type="light" 
            onClick={() => { signInWithGoogle() }}
            />
            </form>
            : inputState === InputStateTypes.PASSWORD ?
            <>
              <form onSubmit={handleSignin} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                  required
                />
                <Button
                  className="mt-1"
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={!password.length || !email.length}
                >
                  Sign in
                </Button>
              </form>
            </>
            : inputState === InputStateTypes.FORGOT_PASSWORD ?
            <div>
              <form onSubmit={handleRecovery} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <Button
                  className="mt-1"
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={!email.length}
                >
                  Send Recovery
                </Button>
              </form>
            </div>
            : 
            <></>
          }
          <span className="pt-1 text-center text-sm">
              <a
                href="#"
                className="text-accents-7 text-accent-9 hover:underline cursor-pointer"
                onClick={() => {
                  setInputState(inputSwitchObj[inputState].to)
                  setMessage({ type: '', content: '' });
                }}
              >
                {inputSwitchObj[inputState].message}
              </a>
          </span>
        </div>
        {
        inputSwitchObj[inputState].additional 
        ? 
        <span className="pt-1 text-center text-sm">
          <a
            href="#"
            className="text-accents-7 text-accent-9 hover:underline cursor-pointer"
            onClick={() => {
              setInputState(inputSwitchObj[inputState].additional.to)
              setMessage({ type: '', content: '' });
            }}
          >
            {inputSwitchObj[inputState].additional.message}
          </a>
        </span>
        :
        ""
        }
        <span className="pt-1 text-center text-sm">
            <span className="text-accents-7">Don't have an account?</span>
            {` `}
            <Link href="/signup">
              <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                Create an account
              </a>
            </Link>
        </span>
      {/*
        <div className="flex items-center my-6">
          <div
            className="border-t border-accents-2 flex-grow mr-3"
            aria-hidden="true"
          ></div>
          <div className="text-accents-9">Or</div>
          <div
            className="border-t border-accents-2 flex-grow ml-3"
            aria-hidden="true"
          ></div>
        </div>
      <Button
          variant="slim"
          type="submit"
          disabled={loading}
          onClick={() => handleOAuthSignIn('github')}
        >
          <GitHub />
          <span className="ml-2">Continue with GitHub</span>
        </Button>
      */}
        
      </div>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export default SignIn;
