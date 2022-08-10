import router, { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { userAdapter } from "../adapters/user/adapter";
import Logo from "../components/icons/Logo";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useUser } from '../utils/useUser';

const RecoveryPage = () => { 
    const [ password, setPassword ] = useState('');
    const { user, session } = useUser();
    const [ message, setMessage ] = useState({ type: '', content: '' });
    const { push } = useRouter()

    const handlePasschange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await userAdapter.recoverPassword(session.access_token, password)
        if (response.error) {
            setMessage({type: "error", content: response.error.message})
            return
        }
        if (response.data) {
            setMessage({"type": "message", content: "Done! Redirecting!"})
            router.push("/")
        }
    }

    if (user) {
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
                <form onSubmit={handlePasschange} className="flex flex-col space-y-4">
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
                    disabled={!password.length}
                    >
                    Change Password
                    </Button>
                </form>
                </div>
            </div>
        )
    }
    return (
        <>
        </>
    )

}

export default RecoveryPage;