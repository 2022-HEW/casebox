import { NextPage } from 'next'
import React, { Dispatch, SetStateAction, useState } from 'react'
import App_header from '../components/common/App_header'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { profileState } from '../atoms/app_atoms'
import { type } from 'os'
import { Button } from '../components/common/App_button'

const App_profile_edit:NextPage = () => {
  return (
    <>
      <App_header label='プロフィール編集'/>
      <Profile_edit/>
    </>
  )
}

const Profile_edit=()=>{
  const [profile,setProfile]=useRecoilState(profileState)
  const [name,setName]=useState("")
  const [comment,setComment]=useState("")
  const [imagePath,setImagePath]=useState(profile.user_image)

  return(
    <div>
      <div>
        <Image src={imagePath} width={100} height={100}/>
      </div>
        <Input label="あだ名" placeholder={profile.user_name} state={name} setState={setName}/>
        <Input label="プロフィール" placeholder={profile.user_comment} state={comment} setState={setComment}/>
        <Button label='保存' onClick={()=>register(name,comment,imagePath)}/>
    </div>
  )
}

type Input={
  label:string,
  placeholder:string,
  state:string,
  setState:Dispatch<SetStateAction<string>>
}

const Input = ({label,placeholder,state,setState}:Input)=>{
  return(
    <label>
      {label}
      <input type="text" placeholder={placeholder} value={state} onChange={(e)=>setState(e.currentTarget.value)}/>
    </label>
  )
}

const register = async(name:string,comment:string,imagePath:string)=>{
  const [profile,setProfile]=useRecoilState(profileState)
  await fetch("")

  setProfile((before)=>({
    ...before,
    user_name:name,
    user_comment:comment,
    user_image:imagePath
  }))
}
export default App_profile_edit
