// CSSファイルのインポート
import styles from "../styles/Tutorial_movie.module.css";

import Box from "./common/Box";
import Nav from "./common/Nav";


// 型定義
type movie = {
    movieUrl: string
}

// 出力
const Tutorial_movie = () =>{
    return(
        <Movies movieUrl={""}/>    
    )
}

// ベースの形
const Movies = ({ movieUrl }:movie)=>{
    return(
        <>
            <div id={styles.videoContainer}>
                <video src={movieUrl} autoPlay/>
            </div>
        </>
    )
}

export default Tutorial_movie;