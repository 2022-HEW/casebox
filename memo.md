# 必須ルール

## htmlタグについて
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


<div>


# components
componentは部品を指していて、nextはcomponentを組み合わせてページを作る。
部品で作ることによって処理やCSSを使い回せる。
拡張子は.tsx

例 nav

# pages 
ここにページごとのファイルを入れる。
拡張子は.tsx
例　index.tsx,service_select.tsx

# エラーが出るとき確認すること

ファイル名を指定する際、.tsxと拡張子がついている
