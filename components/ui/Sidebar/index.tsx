import TextList from '../TextList';
import Link from "next/link";

export default function Sidebar(props) {

return (
<aside className="md:w-1/2 mx-auto">
    <div className="flex mt-4 mb-8 justify-around">
    {(props.page != "myapps" ? (
      <Link href="/myapps" >
        <a className="w-36 text-center py-2 mr-2 border border-black rounded bg-white text-lg hover:bg-gray-100">
        My apps
        </a>
      </Link>) : null)}
    {(props.page != "drafts" ? (
      <Link href="/drafts">
        <a className="w-36 text-center py-2 mr-2 border border-black rounded bg-white text-lg hover:bg-gray-100">
        My posts
        </a>
      </Link>) : null)}
    {(props.page != "myflows" ? (
      <Link href="/myflows">
        <a className="w-36 text-center py-2 mr-2 border border-black rounded bg-white text-lg hover:bg-gray-100">
        My guides
        </a>
      </Link>) : null)}
    </div>
    </aside>
    );
}