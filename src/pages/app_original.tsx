import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styles from "../styles/app_original.module.css"
const App_image_edit = dynamic(() => import('../components/App_image_edit'), { ssr: false })


 const app_original = () => {
     const [save,setSave] = useState(false)
  
    const Tool_box =()=>{
        return(
            <div className={styles.tool_box}>
                <button onClick={()=>setSave(true)}>保存</button>
            </div>
        )}

    return (
        <div className={styles.app_original}>
            <div style={{width:"100%",height:"100px",background:"#aaa"}}>header</div>
            <App_image_edit save={save}/>
            <Tool_box/>
        </div>
  )
}



export default app_original