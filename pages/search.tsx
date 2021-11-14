import { useEffect, useState } from "react"
import useDebounce from "../components/hooks/useDebounce"
import { SupabaseServiceClass } from "../utils/supabase-client"
import Link from "next/link"
import SquareBlock from '../components/ui/SquareBlock';

class SearchService extends SupabaseServiceClass {
    async searchByString(string:string) {
        const {data, error} = await this.supabase
        .rpc("find_entries", {
            search_input: string
        })
        return data
    }
}
const searchService = new SearchService()

interface SearchResult {
    type: string,
    id: number,
    name: string
}

const Search = () => {
    const [searchString, setSearchString] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const debouncedSearchString = useDebounce(searchString, 1000)
    

    useEffect(() => {
        if (debouncedSearchString) {
            searchService
            .searchByString(debouncedSearchString)
            .then((data) => {
                setSearchResults(data)
            })
        }
    }, [debouncedSearchString])

    return (
        <div className={`w-full flex flex-col`}>
            <input 
            value={searchString}
            onChange={(E) => {
                setSearchString(E.target.value)
            }}
            className={`mb-5 w-full h-12 px-5 text-lg`}
            type="text" 
            placeholder="Type to search for posts and tools..."
            name="" 
            id="" />
                {searchResults.map((res) => {
                    return <Link
                    href={`/${res.type}/${res.id}`}
                    passHref={true}

                    >
                        <a className={`w-full border border-gray-200 hover:bg-gray-200 mb-2`} 
                        href="
                        ">
                        <SquareBlock key={`${res.type}/${res.id}`} 
                         blockBody={res.name} 
                         blockDescription={res.type}
                        />
                        </a>
                    </Link>
                })}
        </div>
    )
}

export default Search