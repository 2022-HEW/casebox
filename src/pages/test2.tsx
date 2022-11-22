import dynamic from "next/dynamic";
const Draw = dynamic(() => import('./test'), { ssr: false })

const a = ()=>{
    return(
            <>
                <Draw/>
                <img src="https://halgroup6.blob.core.windows.net/quickstarte4f95d40-6575-11ed-a5ae-877a635505ef/Galaxy_S22.png"/>
            </>
    )
}

export default a