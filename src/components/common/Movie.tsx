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
                <video src={movieUrl} autoPlay loop style={{width:"100%",height:"100%",outline: "none",border: "none"}}/>
        </>
    )
}

export default Movie;