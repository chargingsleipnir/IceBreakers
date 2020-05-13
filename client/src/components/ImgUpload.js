import React from 'react';

import LoadBar from './LoadBar';

let URL = window.URL || window.webkitURL;
const extArr = ['jpg', 'jpeg', 'png', 'gif'];

// TODO: Reset src to default guy on error
// TODO: Reset file input to null value on error

const ImgUpload = ({ GetImgDetails, imgSrc, disabled, willLoadFile, percent }) => {

    const imgChange = (event) => {
        // Make sure only 1 file has been uploaded
        if(event.target.files.length !== 1) {
            alert("Can only use 1 photo at a time.");
            return;
        }

        // Make sure the file is an image
        const fname = event.target.value;
        const ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
        if(extArr.indexOf(ext) === -1) {
            alert('Image must have extension: jpg, jpeg, png, or gif');
            return;
        }

        let file = event.target.files[0];

        var img = new Image();
        img.onload = () => { console.log("img width: " + img.width + ", height: " + img.height); };
        img.src = URL.createObjectURL(file);

        GetImgDetails(ext, file, img.src);
    };

    const html_LoadBar = willLoadFile ? <LoadBar percent={percent} /> : "";

    //console.log(`Main body called in ImgUpload.js`);

    return (
        <div className="mt-2">
            <img src={imgSrc} id="AvatarSelected" className="rounded-circle mt-1 mb-1 mt-md-3 mb-md-3 mt-lg-5 mb-lg-5" alt="User avatar" />

            <input id="HiddenFileUploader" placeholder="File" className="d-none" type="file" accept="image/*" capture="user" onChange={imgChange} disabled={disabled} />
            {/* Clicking this button activates the hidden file button above.  */}
            <button className="btn btn-secondary btn-lg btn-block mt-2 position-relative" onClick={() => { document.getElementById("HiddenFileUploader").click(); }} disabled={disabled}>
                <span>Upload picture</span>
                { html_LoadBar }
            </button>
        </div>
    );
};

export default ImgUpload;