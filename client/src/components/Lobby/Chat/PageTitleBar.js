import React from 'react';

const PageTitleBar = ({ BackFunc, title }) => (
    <div>
        <div className="maxW1000 m-0Auto position-relative">
            <button onClick={BackFunc} className="btn text-white posAbsAlignVert50pct">
                <i className="fas fa-arrow-left fa-lg"></i>
            </button>
            <div className="head3 text-center text-white">{title}</div>
        </div>
    </div>
);

export default PageTitleBar;