export default function Appsmith(props) {

  return (
  	<>
    <div className="mx-auto w-5/6 h-screen">
    <iframe src={props.appsrc} height="100%" width="100%"></iframe>
    </div>
  	</>
    )
}

