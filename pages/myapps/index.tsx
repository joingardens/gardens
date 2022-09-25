import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../utils/useUser";
import { getPaasByUserId, getDropletsByPaasId, getAppsByUserDropletId } from '../../utils/supabase-client';
import Link from "next/link";
import Image from "next/image";
import useToast from "../../components/hooks/useToast";
import Sidebar from '../../components/ui/Sidebar';
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
    <Title titleTitle={`${paasName} Home`} 
    titleDescription={'Here you can access your droplet or add apps to your app gallery.'} />
    </div>
    <div className="flex flex-col justify-center">
    <div className="px-5 w-full mb-24 mt-16 md:mt-8">
    <div className="flex flex-wrap justify-center items-center w-4/5 md:justify-start mx-auto py-4">
    <div className="flex flex-wrap my-8 w-full">
    
    {dropletDomain ? (
        <div className="w-full flex flex-col md:flex-row justify-between  md:ml-16 items-center border shadow bg-gray-50 rounded py-4 md:py-2 px-2">
    <div className="flex flex-col md:flex-row">
    <div className="p-2 bg-white rounded-full w-16 mx-auto">
    <Image alt="Water droplet icon" width="50" height="50"
        src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/droplet.png?t=2022-09-04T14%3A29%3A00.230Z" />
    </div>
    <div className="flex flex-col md:ml-4 py-2 ">
    <h2 className="text-xl text-center md:text-left t">Droplet</h2>
    <h3 className="text-gray-600 text-md font-semibold text-center md:text-left">{dropletDomain}</h3>
    </div>
    </div>
    <div className="flex flex-col items-center">
    <div>
    <Link href={"https://captain." + dropletDomain}>
        <a className="flex items-center w-48 bg-white text-center mx-auto pl-2 pr-1 py-2 shadow my-4 md:my-0 rounded border border-blue-600 text-lg hover:bg-blue-50">
        <Image alt="Caprover logo" width="25" height="25"
        src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/caprover.png?t=2022-08-16T09%3A37%3A46.977Z" />
        <span className="ml-1">Admin dashboard</span>
        </a>
      </Link>
     </div>
    <div className="md:mt-4 md:mb-2">
    <Link href={"https://cloud.digitalocean.com/droplets/" + dropletId}>
        <a className="w-48 text-center py-2 px-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        💻 Cloud dashboard
        </a>
      </Link>
     </div>
     </div>
     </div>
     ) : (
    <div className="py-12 mx-auto bg-gray-200 px-8 rounded">
    <h1 className="text-2xl text-center text-blue-700 pb-4 font-semibold">Get Started</h1>
    <p className="text-xl text-center">Looks like you don't have a droplet yet.</p>
    <p className="text-xl text-center"><Link href="/onboarding"><a className="text-blue-600 underline font-bold">Select a plan</a></Link> to start self-hosting!</p>
    </div>)}
    <div className="w-full mx-auto text-center my-4">
    <button className="my-4 py-2 px-4 rounded border bg-gray-100 hover:bg-gray-200 shadow font-semibold" onClick={() => {setAppNoticeOpen(!appNoticeOpen)}}>
    How add Gardens one-click apps to Caprover
    </button>
    {appNoticeOpen ?  (
        <h2 className="text-lg text-center py-4">To add Gardens custom apps to your Caprover library open your Caprover, go to "Apps" -> "One-click apps", scroll down to "3rd party repositories" and add oneclickapps.joingardens.com </h2>
    ) : null
    }
    </div> 
    <div className="w-full mt-6 mb-6 flex justify-center">
        <a href="" className="w-48 text-center py-2 px-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        📕 Gardens Docs
        </a>
        <a href="https://caprover.com/docs/best-practices.html" target="_blank" className="w-48 text-center ml-2 py-2 px-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        📘 Caprover Docs
        </a>
    </div>
    <div className="w-full flex flex-col">
    {dropletId ? (
        <h2 className="w-full text-2xl md:px-16 pt-8 pb-4 font-semibold text-center md:text-left">My Apps</h2>
    ) : null
    }
    <div className="w-full flex flex-col md:flex-row">
    {apps.map((app, i) => (
        <SquareCard blockBody={app.tool_id.tool} key={i} blockLink={("https://captain." + dropletDomain)} 
    smallImage={app.tool_id.logo_url} />
    ))}
    {dropletDomain ? (
    <Link href="/tools">
    <div className="rounded-full cursor-pointer border border-blue-500 hover:bg-blue-50 shadow ml-20 md:ml-24 h-24 mt-10 w-24 mx-auto my-auto">
    <div className="text-center text-5xl py-0.5 my-4">+</div>
    </div>
    </Link>
    ) : null}
    </div>
    </div>
    </div>
    <h2 className="w-full text-2xl px-16 pt-8 pb-4 font-semibold">Quick Links</h2>
    <div className="w-72 my-8"><Sidebar page="myapps" /></div>
    </div> 
    </div>
    </div>
    </>
    )
}

export default MyAppsPage
