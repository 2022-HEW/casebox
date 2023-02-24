import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot} from "recoil"
import React from 'react'

// recoilでは値を共有したい範囲をRecoilRootで囲います。
// 通常はアプリ全体で共有するので_app.jsで定義します。
function MyApp({ Component, pageProps }: AppProps) {
  return <RecoilRoot><Component {...pageProps} /></RecoilRoot>
}

export default MyApp
