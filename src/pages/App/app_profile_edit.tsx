import { NextPage } from "next";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import App_header from "../../components/app/common/App_header";
import Image from "next/image";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { modalState, profileState } from "../../atoms/app_atoms";
import { type } from "os";
import { Button } from "../../components/app/common/App_button";
import useEffectCustom from "../../Hooks/common/useEffectCustom";
import Modal from "../../components/app/common/App_modal";
import { App_modal_body } from "../../components/app/common/App_modal_body";
import icon from "../../icon.json";
import styles from "../../styles/app_profile_edit.module.css";
import { useRouter } from "next/router";

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

type IconCheck = {
  setImagePath: Dispatch<SetStateAction<string>>;
};

const IconCheck = ({ setImagePath }: IconCheck) => {
  const icons = icon.icon;

  const handleClickIcon = (src: string) => {
    setImagePath(src);
  };

  return (
    <div className={styles.modal_picture_box}>
      {icons.map((value,index) => {
        return (
          <div
            className={styles.modal_picture}
            onClick={() => {
              handleClickIcon(value.src);
            }}
            key={index}
          >
            <Image
              width={200}
              height={200}
              src={value.src}
              alt={value.name}
            />
          </div>
        );
      })}
    </div>
  );
};

const app_profile_edit:NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted ? (
      <>
        <App_header label="プロフィール変更" />
        <Profile_edit />
      </>
    ):<></>
  );
};

const Profile_edit = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const [name, setName] = useState(profile.user_name);
  const [comment, setComment] = useState(profile.user_comment);
  const [imagePath, setImagePath] = useState(profile.user_image);
  const [error, setError] = useState("");
  const [modal, setModal] = useRecoilState(modalState);
  const router = useRouter()

  const handleClickIcon = () => {
    setModal(true);
  };

  const handleClickSave=()=>{
    register(
      name,
      comment,
      imagePath,
      profile.user_id,
      setProfile,
      setError
    )
    router.push({
      pathname:"./app_mypage"
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        <div className={styles.edit}>

      <Image
              width={30}
              height={30}
              src={"/app/mypage/edit.svg"}
              alt="アイコン"
              />
              </div>
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
          onClick={handleClickSave}
          style={{height:"55px"}}
        />
      </div>
      <div className={styles.modal}>
        <Modal>
          <App_modal_body title="プロフィール画像選択">
            <IconCheck setImagePath={setImagePath} />
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
      <textarea
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

    setProfile((before) => ({
      ...before,
      user_name: name,
      user_comment: comment,
      user_image: imagePath,
    }));
    setError("");
  } else {
    setError("文字を入力してください。");
  }
};

export default app_profile_edit;
