// CSSファイルのインポート
import styles from "../styles/Tutorial_movie.module.css";

import Box from "./Box";
import Nav from "./nav";


// 型定義
type movie = {
    movieUrl: string
}

// 出力
const Tutorial_movie = () =>{
    return(
        <>
            <Box index={false}>
                <Nav/>
                {/* 動画のパスを入れる */}
                <Movies movieUrl={""}/>
            </Box>
        </>
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