import React from 'react';

const LoadBar = ({ percent }) => {

    const barStyle = { width: percent + "%" };

    return (
        <div id="ImageUploadBar" className="progress position-absolute h-100 w-100">
            <div role="progressbar" className="progress-bar progress-bar-striped bg-success progress-bar-animated transitionNone" style={barStyle} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    );
};

export default LoadBar;