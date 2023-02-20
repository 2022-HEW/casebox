# 必須ルール

## 起動
ターミナルに npm run dev
 http://localhost:3000/
 にアクセス
 
停止 Ctrl + C

## htmlタグについて(JSX記法)
関数に対してreturnの中にhtmlタグを書く

例 const a = () =>{
    console.log("");

    return(
        <div>a</div>
    )
}

return()直下には一つのエレメントしか入らない
例
✕ return(
    <div class="a">a</div>
    <div class="b">b</div>
    )

◯ return(
    <div>
        <div className="a">a</div>
        <div className="a">a</div>
    </div>
    )


✕ <div class="a">a</div>
◯ <div className="a">a</div>

*スタイルを付ける場合
<div className={styles.a}></div>

閉じタグがないもの
✕ <img src="" alt="">
◯ <img src="" alt=""/>

## cssを反映させる
例 import styles from "../styles/nav.module.css"

importでファイルを読み込む。
styles は命名
fromのあとに持ってくる場所を書く

<div className={styles.a}></div>
でクラス名をつける

# component（コンポーネント）
componentは部品を指していて、nextはcomponentを組み合わせてページを作る。
部品で作ることによって処理やCSSを使い回せる。
拡張子は.tsx

例 nav.tsx

## export
export defaultをつけることで他のファイルからインポートできる。
コンポーネントの名前は頭文字が大文字

例 export default function Sample(){

    } 
## import
import コンポーネントの名前 from "ファイルの位置"

例 import Sample from "./sample"

使うときはHTMLタグのように使う

例　const a =()=>{

        return(
            <Sample/>
        )
    }
# pages 
ここにページごとのファイルを入れる。
拡張子は.tsx
例　index.tsx,service_select.tsx
# props
## propsの分割代入
const { name, age } = props

を

const name = props.name
const age = props.age

さらに

const a = ({ name, age }:型)=> {}

でかける


# ページ遷移
Linkタグをインポート
pagesの相対パスはカレントディレクトリの直下になるため気をつける！

例 
<Link href="">
    <a>a</a>
</Link>

# Typescript
## 型宣言の後ろに「？」
？はオプションパラメータであり、宣言した引数を省略できる。
複数ある場合、後ろの引数でしか使えない

# エラーが出るとき確認すること

importを忘れている

特殊なパスを確認する

ファイル名を指定する際、.tsxと拡張子がついている

rafc:雛形生成

# Recoil
Reactの状態管理のライブラリ

## Atom
Atomは状態の単位を表すAtomが更新されるとコンポーネントは再レンダリングされる。
同じAtomが複数のコンポーネントで使われるとき、すべてのコンポーネントがそのAtomを共有します。

keyはユニークである必要がある


npm install recoil
npm install react-slick
npm install @types/react-slick
npm install slick-carousel
<!-- npm install jsqr --save -->
npm install @azure/cognitiveservices-computervision
npm install react-konva konva --save
<!-- npm install react-color --save -->
npm install use-image
npm install @welldone-software/why-did-you-render --save-dev
<!-- npm install react-konva-utils -->
npm install @azure/storage-blob
npm install @azure/identity
<!-- npm install uuid dotenv -->
npm install formidable
npm install react-qrcode
npm install js-sha1
npm install recoil-persist
<!-- npm i express -->
<!-- npm install axios multer -->
npm i formidable
npm i @types/formidable
npm install sharp

npm install sass