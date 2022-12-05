import { useUser } from '../../../utils/useUser';
import { useRouter } from 'next/router';
import useToast from '../../../components/hooks/useToast';
import React, { useState, useEffect } from 'react';
import { getPaasByUserId } from '../../../utils/supabase-client';
import { userDropletsAdapter } from '../../../adapters/userDroplets/adapter';
import ParagraphWithButton from '../../../components/ui/ParagraphWithButton';
import Link from 'next/link';
import Button from '../../../components/ui/Button';
import Image from 'next/image'
import Input from '../../../components/ui/Input';

export default function Prerequisites() {

  const { user, userLoaded } = useUser()
  //const [showLocalDetails, setShowLocalDetails] = useState(null);
  const { makeToast } = useToast()
  //const [paasId, setPaasId] = useState(null)
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true)


  return (
  	<>
    <div className="mt-12"></div>
    <div className="md:w-2/3 w-4/5 mx-auto flex flex-col md:items-center">
     <h1 className="text-3xl py-4 text-center font-bold">Local Installation</h1>
    <div className="prose prose-xl mt-4">
    <div>
    You will need <strong>Docker</strong> installed on your machine. Version should be at least 17.06x, and 19.03x is preferred. Find Docker installation instructions <a href="https://docs.docker.com/engine/installation" target="_blank">here</a>. Avoid snap installation, as it has <a href="https://github.com/caprover/caprover/issues/501#issuecomment-554764942" target="_blank">known issues</a>.
    </div>
    <div>
    The rest of installation assumes you have a public IP address. If you don't have one, or if you want to install on your local network, check <a href="https://caprover.com/docs/run-locally.html" target="_blank">these official instructions from Caprover</a>.
    </div>
    <div>
    Once you have Docker and a public IP address, run the following in the command line:</div>
    <div className="bg-gray-700 px-2 py-4 rounded text-white monospace my-2">
    docker run -p 80:80 -p 443:443 -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -v /captain:/captain joingardens/gardens-engine-edge
    </div>
    <div>Done! Wait a couple minutes for everything to set up, then open <span className="bg-gray-200">http://[YOUR_SERVER_IP]:3000</span> and log in with default password <span className="bg-gray-200">captain42</span>.</div>
    </div>
    <div className="flex w-72 lg:w-96 h-20 mt-12 items-center justify-center">
        <a href={"https://discord.gg/CKYkMAHW"} target="_blank" className="flex items-center justify-center w-full bg-white text-center mx-auto py-3 shadow my-4 md:my-0 rounded border border-blue-600 text-lg hover:bg-blue-50">
        <Image alt="Discord logo" width="70" height="70"
        src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/discord.png" />
        <span className="ml-4 text-2xl">Join our Discord</span>
        </a>
     </div>
    {/*

  async function getPaasById(user_id){
  const paasDetails = await getPaasByUserId(user_id);
  setPaasId(paasDetails[0].id)
  return
  }

  useEffect(() => {
    if (user){
     setPageLoading(false)
     getPaasById(user.id)
    }
  }, [user])
      <div className="mt-8 mx-auto bg-green-400 ">
          <Button
            onClick={() => {
                setPageLoading(true)
                userDropletsAdapter.insertOne({
                    user: user.id,
                    paas_id: paasId
                  }).then(r => {
                    setPageLoading(false)
                    router.push("/myapps")
                }).catch(error => {
                  console.log(error)
                  makeToast(error, "error", 3 )
                });
              
            }}
            disabled={pageLoading}
            loading = {pageLoading}
          >
            Confirm installation
          </Button>
          <div>
            
          </div>
        </div>
    <div className="mx-auto mt-8">
    <Link href="/myapps">
    <a className="border border-seaweed hover:bg-seaweed hover:text-white  text-xl transition py-1 px-2 focus:outline-none rounded">
    Next step
    </a>
    </Link>
    </div>*/}
    <div className="mb-24"/>
    </div>
    </>
    )
}

