import React from 'react';

import LoadBar from './LoadBar';

const URL = window.URL || window.webkitURL;
const extArr = ['jpg', 'jpeg', 'png', 'gif'];

const ImgUpload = ({ GetImgDetails, imgSrc, orientation, isPortrait, disabled, willLoadFile, percent }) => {

    const ImgChange = (event) => {
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
        img.onload = () => { 
            console.log("img width: " + img.width + ", height: " + img.height);

            //console.log("file:", file);
            //console.log("img.src:", img.src);

            GetImgDetails(ext, file, img.src, orientation, img.height > img.width);

            // TAG: EXIF - Currently being handled by css {image-orientation: from-image;}, though this is still not widely supported.
            // GetOrientation(file, function(orientation) {
            //     // -2: not jpeg
            //     // -1: not defined
            //     console.log('orientation: ' + orientation);
            //     GetImgDetails(ext, file, img.src, orientation, img.height > img.width);
            // });
        };
        img.src = URL.createObjectURL(file);
    };

    const html_LoadBar = willLoadFile ? <LoadBar percent={percent} /> : "";
    //console.log(`Main body called in ImgUpload.js`);

    var imgTag = <img src={imgSrc} alt="User avatar" className={isPortrait ? "portrait" : ""} />
    // TAG: EXIF - Currently being handled by css {image-orientation: from-image;}, though this is still not widely supported.
    // const UpdatedImg = (dataURL) => {
    //     imgTag = <img src={dataURL} alt="User avatar" className={isPortrait ? "portrait" : ""} />
    //     console.log(`Image updated to correct orientation: ${orientation}`);
    // }
    // Consts.ResetOrientation(imgSrc, orientation, UpdatedImg)

    return (
        <div className="mt-2">
            {/* Container exists so that the image can keep it's aspect ratio and just can cut-off/masked by the container */}
            <div id="AvatarSelected" className="avatarsUserIdent rounded-circle mt-1 mb-1 mt-md-3 mb-md-3 mt-lg-5 mb-lg-5">
                {imgTag}
            </div>

            <input id="HiddenFileUploader" placeholder="File" className="d-none" type="file" accept="image/*" capture="user" onChange={ImgChange} disabled={disabled} />
            {/* Clicking this button activates the hidden file button above.  */}
            <button className="btn btn-secondary btn-lg btn-block mt-2 position-relative" onClick={() => { document.getElementById("HiddenFileUploader").click(); }} disabled={disabled}>
                <span>Upload picture</span>
                { html_LoadBar }
            </button>
        </div>
    )

};

export default ImgUpload;