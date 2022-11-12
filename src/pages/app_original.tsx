import dynamic from 'next/dynamic'
import React from 'react'
import styles from "../styles/app_original.module.css"
const App_image_edit = dynamic(() => import('../components/App_image_edit'), { ssr: false })


 const app_original = () => {
  return (
      <>
        <div style={{width:"100%",height:"100px",background:"#aaa"}}>header</div>
        <App_image_edit/>
        <Tool_box/>
    </>
  )
}

const Tool_box =()=>{
return(
    <div className={styles.tool_box}>
        <div></div>
    </div>
)
}
export default app_original