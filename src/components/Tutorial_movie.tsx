import styles from "../styles/";


// 動画の型定義
type movie = {
    movieUrl: string
}

// 出力
const Tutorial_movie = () =>{
    return(
        <>
            <Movies movieUrl={""}/>
        </>
    )
}

// ベースの形
const Movies = ({ movieUrl }:movie)=>{
    return(
    <>
        <div>
            {/* 動画の埋め込み */}
        </div>
    </>
    )
}

export default Tutorial_movie;