import React from 'react';
import Box from '../../components/main/common/Box';
import Nav from '../../components/main/common/Nav';
import Camera from '../../components/Camera';
import Movie from '../../components/main/index/Movie';
import styles from "../../styles/scan.module.css";
import { NextPage } from 'next';

const scan:NextPage = () => {
  return (
    <Box>
      <Nav>
        <div className={styles.wrap}>
          <div className={styles.table}>
            <div className={styles.tr}>
              <div className={styles.th}>
                　
              </div>
            </div>
            
            <form>
              <div className={styles.tr}>
                <div className={styles.td}><input type="button" value="１" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="２" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="３" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="C" className={styles.buttonC}/></div>
              </div>
              <div className={styles.tr}>
                <div className={styles.td}><input type="button" value="４" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="５" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="６" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="検索" className={styles.buttonS}/></div>
              </div>
              <div className={styles.tr}>
                <div className={styles.td}><input type="button" value="７" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="８" className={styles.button}/></div>
                <div className={styles.td}><input type="button" value="９" className={styles.button}/></div>
              </div>
              <div className={styles.nav}>
                <a href='' className={styles.scan}>スキャン</a>
              </div>
            </form>
          </div>
        </div>
        <Camera/>
      </Nav>
    </Box>
  )
}

export default scan
