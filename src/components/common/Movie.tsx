// CSSファイルのインポート
import styles from "../../styles/Tutorial_movie.module.css";

import Box from "./Box";
import Nav from "./Nav";


// 型定義
type movie = {
    movieUrl: string
}


// ベースの形
const Movie = ({ movieUrl }:movie)=>{
    return(
        <>
            <div id={styles.videoContainer}>
                <video src={movieUrl} autoPlay/>
            </div>
        </>
    )
}

export default Movie;