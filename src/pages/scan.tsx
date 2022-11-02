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
            <Movie movieUrl={""}/>
            <div id={styles.wrap}>
              <div id={styles.number}>
              <form name="dentaku">
                <table>
                  <!-- 液晶画面部分 -->
                  <tr>
                    <td colspan="4">
                      <input type="text" class="display" name="display" value="" disabled>
                    </td>
                  </tr>
            
                  <!-- 上から1段目（7~9＋÷） -->
                  <tr>
                    <td><input type="button" value="7" onclick="get_calc(this)"></td>
                    <td><input type="button" value="8" onclick="get_calc(this)"></td>
                    <td><input type="button" value="9" onclick="get_calc(this)"></td>
                    <td><input type="button" value="÷" class="operator" name="div_btn" onclick="get_calc(this)"></td>
                  </tr>
                    
                  <!-- 上から2段目（4~6＋×） -->
                  <tr>
                    <td><input type="button" value="4" onclick="get_calc(this)"></td>
                    <td><input type="button" value="5" onclick="get_calc(this)"></td>
                    <td><input type="button" value="6" onclick="get_calc(this)"></td>
                    <td><input type="button" value="×" class="operator" name="multi_btn" onclick="get_calc(this)"></td>
                  </tr>
            
                  <!-- 上から3段目（1~3＋-） -->
                  <tr>
                    <td><input type="button" value="1" onclick="get_calc(this)"></td>
                    <td><input type="button" value="2" onclick="get_calc(this)"></td>
                    <td><input type="button" value="3" onclick="get_calc(this)"></td>
                    <td><input type="button" value="-" class="operator" onclick="get_calc(this)"></td>
                  </tr>
            
                  <!-- 上から4段目（0/C/=/+) -->
                  <tr>
                    <td><input type="button" value="0" onclick="get_calc(this)"></td>
                    <td><input type="button" value="C" onclick="get_calc(this)"></td>
                    <td><input type="button" value="=" class="equal" onclick="get_calc(this)"></td>
                    <td><input type="button" value="+" class="operator" onclick="get_calc(this)"></td>
                  </tr>
            
                </table>
                </form>
              </div>
            </div>
            <Camera/>
            <div>scan</div>
        </Nav>
    </Box>
  )
}
export default Scan
