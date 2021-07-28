import React from 'react';
import './product.css';
export default () => {
    return <div className="box" onClick={() => { window.location.hash = 'b' }}>
        prod
    </div>
}