import React, { useState } from 'react';

import defaultImg from '../images/SpeechlessGuy.png';
import Gbl from '../Global';

let URL = window.URL || window.webkitURL;
const extArr = ['jpg', 'jpeg', 'png', 'gif'];

const ImgUpload = ({ GetImgDetails, disabled }) => {
    const [src, SetSrc] = useState(defaultImg);

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
        //console.log(file);

        // TODO: Save this for the duration of the local instance, so the user always has access to their image
        var img = new Image();
        img.onload = () => { console.log("img width: " + img.width + ", height: " + img.height); };
        img.src = URL.createObjectURL(file);
        SetSrc(img.src);

        // Set global user image source.
        Gbl.user.imgSrc = img.src;

        GetImgDetails(ext, file, src);
    };

    //console.log(`Main body called in ImgUpload.js`);

    return (
        <div className="mt-2">
            <img src={src} alt="User avatar" width="500" height="500" />

            <input id="HiddenFileUploader" placeholder="File" className="d-none" type="file" accept="image/*" capture="user" onChange={imgChange} disabled={disabled} />
            {/* Clicking this button activates the hidden file button above.  */}
            <div><button className="button mt-2" onClick={() => { document.getElementById("HiddenFileUploader").click(); }} disabled={disabled}>Take/Upload picture</button></div>
            
            {/* // TODO: Use mobile camera or webcam. - File uploader can act as both?
            <input id="HiddenPhotoUploader" placeholder="Image" className="d-none" type="file" accept="image/*" capture="user" />
            <div><button className="button mt-2" onClick={() => { document.getElementById("HiddenPhotoUploader").click(); }}>Take picture</button></div>  
            */}
        </div>
    );
};

export default ImgUpload;