import { NextPage } from "next";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import App_header from "../../components/common/App_header";
import Image from "next/image";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { modalState, profileState } from "../../atoms/app_atoms";
import { type } from "os";
import { Button } from "../../components/common/App_button";
import useEffectCustom from "../../components/common/useEffectCustom";
import Modal from "../../components/common/App_modal";
import { App_modal_body } from "../../components/common/App_modal_body";
import icon from "../../icon.json";
import styles from "../../styles/app_profile_edit.module.css";

type Input = {
  label: string;
  placeholder: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  name: string;
};

type Profile = {
  [key: string]: string;
};
type Register = {
  name: string;
  comment: string;
  imagePath: string;
  id: string;
  setProfile: SetterOrUpdater<Profile>;
};
type IconCheck={
  setImagePath:Dispatch<SetStateAction<string>>
}

const IconCheck = ({setImagePath}:IconCheck) => {
  const icons = icon.icon;
  console.log(icon);

  const handleClickIcon=(src:string)=>{
    setImagePath(src)
  }

  return (
    <div>
      {icons.map((value: { id: number; name: string; src: string; }) => {
        return (
          <div onClick={()=>{handleClickIcon(value.src)}}>
            <Image
              width={150}
              height={150}
              src={"/icon/avocado.svg"}
              alt="アイコン"
            />
          </div>
        );
      })}
    </div>
  );
};

const App_profile_edit = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <App_header label="プロフィール編集" />
        <Profile_edit />
      </>
    )
  );
};

const Profile_edit = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imagePath, setImagePath] = useState(profile.user_image);
  const [error, setError] = useState("");
  const [modal, setModal] = useRecoilState(modalState);

  const handleClickIcon = () => {
    setModal(true);
  };

  return (
    <div>
      <div className={styles.picture}>
        <Image
          src={imagePath}
          width={100}
          height={100}
          onClick={handleClickIcon}
        />
      </div>
      <div className={styles.name}>
        <div className={styles.form}>
        <Input
            label="あだ名"
            placeholder={profile.user_name}
            state={name}
            setState={setName}
            name="name"
          />
        </div>
        <div className={styles.error}>
          {error !== "" && <label htmlFor="name">{error}</label>}
        </div>
      </div>
      <div className={styles.name}>
        <div className={styles.form}>
          <Input
            label="プロフィール"
            placeholder={profile.user_comment}
            state={comment}
            setState={setComment}
            name="profile"
          />
        </div>
      </div>
      <div className={styles.hozon}>
      <Button
        label="保存"
        onClick={() =>
          register(
            name,
            comment,
            imagePath,
            profile.user_id,
            setProfile,
            setError
          )
        }
      />
      </div>
      <div className={styles.modal}>
      <Modal>
        <App_modal_body title="プロフィール画像選択">
          <IconCheck setImagePath={setImagePath}/>
        </App_modal_body>
      </Modal>
      </div>
    </div>
  );
};

const Input = ({ label, placeholder, state, setState, name }: Input) => {
  return (
    <label className={styles.label}>
      {label}
      <input
        type="text"
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.currentTarget.value)}
        name={name}
      />
    </label>
  );
};

const register = async (
  name: string,
  comment: string,
  imagePath: string,
  id: string,
  setProfile: SetterOrUpdater<Profile>,
  setError: Dispatch<SetStateAction<string>>
) => {
  console.log(name);

  if (name) {
    await fetch(
      `/api/app_sql?sql=update_profile&&user_name=${name}&&user_id=${id}&&user_comment=${comment}&&user_image=${imagePath}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });

    setProfile((before)=>({
      ...before,
      user_name:name,
      user_comment:comment,
      user_image:imagePath
    }))
    setError("");
  } else {
    setError("文字を入力してください。");
  }
};

export default App_profile_edit;
