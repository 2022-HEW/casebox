import dynamic from 'next/dynamic'
import React from 'react'
const App_image_edit = dynamic(() => import('../components/App_image_edit'), { ssr: false })


 const app_original = () => {
  return (
    <App_image_edit/>
  )
}
export default app_original