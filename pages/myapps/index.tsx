import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../utils/useUser";
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

    return (
    <>
    <div className="-mb-20 -mt-20">
    <Title titleTitle={'My Apps'} 
    titleDescription={'Welcome to your apps section'} />
    </div>
    <div className="flex justify-center">
    <Sidebar page="myapps" />
    <div className="px-5 w-full mb-24 mt-24 md:mt-16">
    <div className="flex flex-wrap justify-center items-center w-4/5 sm:pl-8 md:pl-16 md:justify-start mx-auto py-4">
    <Link href="/flows">
        <a className="flex items-center w-48 text-center pl-2 pr-1 py-2 shadow my-4 md:my-0 rounded border border-blue-600 text-lg hover:bg-blue-50">
        <Image alt="Caprover logo" width="25" height="25"
        src="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/caprover.png?t=2022-08-16T09%3A37%3A46.977Z" />
        <span className="ml-1">Admin dashboard</span>
        </a>
      </Link>
    <div className="sm:mx-2" />
    <Link href="/">
        <a className="w-48 text-center py-2 px-4 shadow rounded bg-white text-lg hover:bg-gray-100">
        📘 Documentation
        </a>
      </Link>
    </div>
    <div className="flex flex-wrap w-4/5 mx-auto justify-start">
    {Array(5).fill(null).map((_, i) => (
        <SquareCard blockBody="Airflow" key={i} blockLink="/tool/69" 
    smallImage="https://nbygyyaygsxxesvjjcwa.supabase.co/storage/v1/object/public/public/airflow-logo.png" />
    ))}
    <div className="rounded-full border border-black ml-20 md:ml-24 h-24 mt-10 w-24 mx-auto my-auto">
    <div className="text-center text-5xl py-0.5 my-4">+</div>
    </div>
    </div>
    </div>
    </div>
    </>
    )
}

export default MyAppsPage