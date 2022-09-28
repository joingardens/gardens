import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../utils/useUser";
import { getPaasByUserId, getDropletsByPaasId, getAppsByUserDropletId } from '../../utils/supabase-client';
import Link from "next/link";
import Image from "next/image";
import useToast from "../../components/hooks/useToast";
import Title from '../../components/ui/Title';
import SquareCard from '../../components/ui/SquareCard';

const limit = 10

const MyAppsPage = () => {
    const {user} = useUser()
    const {makeToast} = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [paasId, setPaasId] = useState(null)
    const [dropletId, setDropletId] = useState(null)
    const [userDropletId, setUserDropletId] = useState(null)
    const [apps, setApps] = useState([])
    const [dropletDomain, setDropletDomain] = useState("")
    const [paasName, setPaasName] = useState("")
    const [appNoticeOpen, setAppNoticeOpen] = useState(false)

    async function getPaasById(user_id){
    const paasDetails = await getPaasByUserId(user_id);
    if (paasDetails[0]){
    setPaasId(paasDetails[0].id);
    setPaasName(paasDetails[0].org_name);    
    }
    
    return
    }

    async function getDropletsById(paas_id){
    const dropletsDetails = await getDropletsByPaasId(paas_id);
    if(dropletsDetails[0]){
    setDropletId(dropletsDetails[0].droplet_id);
    setUserDropletId(dropletsDetails[0].id)
    setDropletDomain(dropletsDetails[0].domain);
    }
    return
    }

    async function getAppsByDroplet(user_droplet_id){
    const appsDetails = await getAppsByUserDropletId(user_droplet_id);
    setApps(appsDetails);
    return
    }

    useEffect(() => {
    if (user){
     getPaasById(user.id)
    }
    }, [user])

    useEffect(() => {
    if (paasId){
     getDropletsById(paasId)
    }
    }, [paasId])

    useEffect(() => {
    if (userDropletId){
     getAppsByDroplet(userDropletId)
    }
    }, [userDropletId])

    return (
    <>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={`Home`}  />
    </div>
    <div className="flex flex-col justify-center">
    <div className="px-5 w-full mb-24 mt-16 md:mt-8">
    <div className="flex flex-wrap justify-center items-center w-4/5 md:justify-start mx-auto py-4">
    <div className="flex flex-col items-center mb-8 mt-4 w-full">
    <h2 className="text-2xl mb-8 pb-2 border-b w-48 text-center">Resources</h2>
    {dropletId ? (
        <div className="max-w-2xl flex flex-col md:flex-row justify-between items-center border border-gray-300 bg-gray-100 rounded py-4 px-4">
    <div className="flex flex-col md:flex-row w-2/3 md:w-1/2">
    <div className="p-2 bg-white rounded-full w-18 md:w-24 h-18 mx-auto my-auto">
    <Image alt="Water droplet icon" width="50" height="50"
        src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/droplet.png?t=2022-09-04T14%3A29%3A00.230Z" />
    </div>
    <div className="flex flex-col md:ml-4 py-2 ">
    <h2 className="text-xl text-center md:text-left t">Droplet</h2>
    <h3 className="text-gray-600 text-md font-semibold text-center md:text-left my-2">{dropletDomain ? dropletDomain : "Access by copying the IPv4 from your cloud dashboard into the address bar"}</h3>
    <h3 className="text-gray-600 text-md text-center md:text-left">Default password: captain42. Do not forget to change it in Settings</h3>
    </div>
    </div>
    <div className="flex flex-col">
    {dropletDomain ? (
        <div>
        <a href={"https://captain." + dropletDomain} target="_blank" className="flex items-center w-48 bg-white text-center mx-auto pl-2 pr-1 py-2 shadow my-4 md:my-0 rounded border border-blue-600 text-lg hover:bg-blue-50">
        <Image alt="Caprover logo" width="25" height="25"
        src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/caprover.png?t=2022-08-16T09%3A37%3A46.977Z" />
        <span className="ml-1">Admin dashboard</span>
        </a>
     </div>) : (
     <div>
       <Link href="/onboarding/connect">
        <a className="flex items-center w-48 bg-yellow-100 text-center mx-auto pl-2 pr-1 py-2 shadow my-4 md:my-0 rounded border border-blue-600 text-lg hover:bg-yellow-200">
        <span className="ml-1">❗ Finish configuration</span>
        </a>
        </Link>
     </div>)}

    <div className="md:mt-4 md:mb-2">
        <a href={"https://cloud.digitalocean.com/droplets/" + dropletId} target="_blank" className="w-48 text-center py-2 px-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        💻 Cloud dashboard
        </a>
     </div>
     </div>
     </div>
     ) : (
    <div className="py-12 mx-auto bg-gray-200 px-8 rounded">
    <h1 className="text-2xl text-center text-blue-700 pb-4 font-semibold">Get Started</h1>
    <p className="text-xl text-center">Looks like you don't have a droplet yet.</p>
    <p className="text-xl text-center"><Link href="/onboarding"><a className="text-blue-600 underline font-bold">Select a plan</a></Link> to start self-hosting!</p>
    </div>)}
    <div className="flex flex-col mx-auto max-w-2xl">
    {dropletDomain ? (
        <h2 className="text-2xl pt-8 pb-2 mb-4 border-b w-48 text-center mx-auto">My Apps</h2>
    ) : null
    }
    <div className="w-full flex flex-col md:flex-row">
    {apps.map((app, i) => (
        <SquareCard blockBody={app.tool_id.tool} key={i} blockLink={("https://captain." + dropletDomain)} 
    smallImage={app.tool_id.logo_url} />
    ))}
    {dropletDomain ? (
    <Link href="/tools">
    <div className={`rounded-full cursor-pointer border border-blue-500 hover:bg-blue-50 shadow h-24 ${(apps.length > 0) ? "mx-auto md:mx-4"  : "mx-auto"} mt-10 w-24 my-auto`}>
    <div className="text-center text-5xl py-0.5 my-4">+</div>
    </div>
    </Link>
    ) : null}
    </div>
    {(dropletDomain && (apps.length > 0)) ? (<div className="text-center w-full mt-4">This will open your Caprover dashboard</div>) : null}
    </div>
    </div>
    <div className="flex flex-col items-center max-w-2xl mx-auto">
    <h2 className="text-2xl pt-8 pb-2 mb-4 border-b w-48 text-center">Help and Links</h2>
    <div className="flex items-center">
     <Link href="/tool/426">
     <a className="w-48 text-center py-2 px-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        Gardens Docs
        </a>
        </Link>
        <a href="https://caprover.com/docs/best-practices.html" target="_blank" className="w-48 text-center ml-2 py-2 px-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        Caprover Docs
        </a>
    </div>
    <div className="flex items-center">
    <Link href="/myflows">
        <a className="w-48 text-center py-3 my-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        My guides
        </a>
      </Link>
    <a href="https://masto.cloud.joingardens.com/public" 
    target="_blank" className="w-48 text-center py-3 my-4 ml-2 shadow rounded bg-white text-lg hover:bg-gray-100">
        Community
    </a>
    </div>
    <div className="flex flex-col">
    <button className="mb-4 mt-2 py-3 px-4 rounded text-lg hover:bg-gray-100 shadow w-96" onClick={() => {setAppNoticeOpen(!appNoticeOpen)}}>
    How add Gardens one-click apps to Caprover
    </button>
    {appNoticeOpen ?  (
        <h2 className="text-lg py-4 text-center w-96">To add Gardens custom apps to your Caprover library open your Caprover, go to "Apps", then "One-click apps", scroll down to "3rd party repositories" and add oneclickapps.joingardens.com </h2>
    ) : null
    }
    </div>
    </div>
    </div> 
    </div>
    </div>
    </>
    )
}

export default MyAppsPage
