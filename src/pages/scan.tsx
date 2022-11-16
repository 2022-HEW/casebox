import React from 'react'
import Box from '../components/common/Box'
import Nav from '../components/common/Nav'
import Camera from '../components/Camera'
import Movie from '../components/common/Movie' 
import styles from "../styles/scan.module.css";

const Scan = () => {
  return (
    <Box>
      <Nav>
        <div id={styles.wrap}>
          <form>
            <table className={styles.table}>
              <tr>
                <th colspan="3">
                  <div className={styles.output}>
                  </div>
                </th>
                <th>
                  <div className={styles.error}>
                    <p></p>
                  </div>
                </th>
              </tr>
              <tr>
                <td><input type="button" value="７" onClick="calc_run(7)"></td>
                <td><input type="button" value="８" onClick="calc_run(8)"></td>
                <td><input type="button" value="９" onClick="calc_run(9)"></td>
                <td><input type="button" value="C" onclick = "cle()"></td>
              </tr>
              <tr>
                <td><input type="button" value="４" onClick="calc_run(4)"></td>
                <td><input type="button" value="５" onClick="calc_run(5)"></td>
                <td><input type="button" value="６" onClick="calc_run(6)"></td>
                <td><input type="button" value="←" onclick = "dele()"></td>
              </tr>
              <tr>
                <td><input type="button" value="１" onClick="calc_run(1)"></td>
                <td><input type="button" value="２" onClick="calc_run(2)"></td>
                <td><input type="button" value="３" onClick="calc_run(3)"></td>
                <td rowspan="2"><input type="button" value="検索" onClick="serch"></td>
              </tr>
              <tr>
                <td></td>
                <td><input type="button" value="０" onClick="calc_run(0)"></td>
              </tr>
            </table>
          </form>
        </div>
      </Nav>
    </Box>
  )
}

export default Scan
