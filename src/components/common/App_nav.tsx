import React from 'react'
import styles from "../../styles/app_nav.module.css"
import Link from 'next/link'

const App_nav = () => {
  
return (
    <nav className={styles.nav}>
        {/* navの色を変える処理が必要 */}
        <Link href="./app_service_select">
            <p>ホーム</p>
        </Link>
        <Link href="./app_search">
            <p>検索</p>
        </Link>
        <Link href="./app_help">
            <p>ヘルプ</p>
        </Link>
        <Link href="./app_profile">
            <p>マイページ</p>
        </Link>
    </nav>
  )
}

export default App_nav
