import React from 'react';
import './test.scss';
export default () => {
    return <div className="box" onClick={() => { window.location.hash = 'b' }}>
        {/* <img src=".../asset/images/test_1.jpg" alt="" /> */}
        {/* <img src={Img} alt="" /> */}
        <div className="ct"></div>
        <div className="product"></div>
    </div>
}