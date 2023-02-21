
import { NextPage } from 'next'
import React, { useState } from 'react'
import App_header from '../../components/common/App_header'
import styles from '../../styles/app_login.module.scss';

const app_privacy:NextPage = () => {

    return (
        <div className={styles.Container}>
            <App_header label='プライバシーポリシー'/>
        </div>
    )
}

export default app_privacy;

