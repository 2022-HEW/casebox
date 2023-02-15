import { NextPage } from 'next'
import React, { useState } from 'react'
import App_header from '../../components/common/App_header'
import styles from '../../styles/app_login.module.scss';

const app_terms:NextPage = () => {

    return (
        <div className={styles.Container}>
            <App_header label='利用規約'/>
        </div>
    )
}

export default app_terms