import React from 'react';

const LoadBar = ({ reveal, percent }) => {

    var outerClasses = ["d-none", "mt-2", "progress"];
    if(reveal) {
        let dispIndex = outerClasses.indexOf("d-none");
        outerClasses.splice(dispIndex, 1);
    }

    const barStyle = {
        width: percent + "%"
    };

    return (
        <div className={outerClasses.join(" ")}>
            <div role="progressbar" className="progress-bar progress-bar-striped bg-success progress-bar-animated transitionNone" style={barStyle} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    );
};

export default LoadBar;