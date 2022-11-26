import dynamic from "next/dynamic";
const Draw = dynamic(() => import('./test'), { ssr: false })

const a = ()=>{
    return(<Draw/>)
}

export default a