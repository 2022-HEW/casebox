import styles from "../styles/template_select.module.css"

export default function Template(){
    return(
        <div className={styles.container}>
        {/* <!-- モーダル --> */}
        <div className="overlay"></div>
        <div className="modal">
            <img src="./img/02.jpg" alt="商品画像" className="modal_product"/>
            <p className="modal_name">アボカドケース</p>
            <p className="modal_price">&yen;;1,380(税込)</p>
            <p className="modal_cancel">✕</p>
            <button className="count_down">ー</button>
            <div className="count">1</div>
            <button className="count_up">＋</button>
            <a href="./pay_select.html" className="pay_select">支払い選択へ</a>
        </div>

        <div id="back">
        <p>戻る</p>
    </div>
        <div id="display_box">
            <div id="disp">
                <div id="product">
                {/* <!-- モーダル -->
                <!--  --> */}
                    <div id="firstline">
                        <div className="productContainer">
                            <img src="img/template_case/tpl_avocado.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_butterfly.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_flower.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_hanya.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_onigiri.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_soda.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>
                    </div>
                    
                    <div id="secondline">
                        <div className="productContainer">
                            <img src="img/template_case/tpl_avocado.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_butterfly.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_flower.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_hanya.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_onigiri.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>

                        <div className="productContainer">
                            <img src="img/template_case/tpl_soda.png" alt="" className="product"/>
                            <span className="product_name">アボカドケース</span>
                            <span className="price">&yen;1,500</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="service_select">
                <div id="select"><p><a href="./template.select.html">テンプレ</a></p></div>
                <div id="btn1"><p><a href="./service_select.html">トップ</a></p></div>
                <div id="btn2"><p><a href="./product_edit.html">オリジナル</a></p></div>
                <div id="btn3"><p><a href="./draw_edit.html">手書き</a></p></div>
                <div id="btn4"><p><a href="./rank.php">ランキング</a></p></div>
                <div id="btn5"><p><a href="./site_qr.html">サイト</a></p></div>
                <div id="btn6"><p><a href="./help.html">ヘルプ</a></p></div>
            </div>
        </div>
    </div>
    )
}