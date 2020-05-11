import React, { useState } from 'react';
import io from 'socket.io-client';
import { ENDPOINT, SLICE_SIZE } from '../Consts';

import PageSelection from './PageSelection';
import ImgUpload from './ImgUpload';

let socket;
socket = io(ENDPOINT);

const Join = () => {
    const nameField = React.createRef();

    const [ext, SetExt] = useState('');
    const [file, SetFile] = useState(null);
    const [src, SetSrc] = useState('');
    const [percent, SetPercent] = useState(0);
    const [disabled, SetDisabled] = useState(false);
    const [signedIn, SetSignedIn] = useState(false);

    const submitProfile = (event) => {
        event.preventDefault();
        const name = nameField.current.value;
        
        if(name === '') {
            alert("Name required");
            return;
        }

        SetDisabled(true);

        console.log(`Submit clicked - Name: ${name}, Ext: ${ext}, src: ${src}, file:`, file);

        if(file === null) {
            socket.emit('AddUser', { name, ext }, () => {
                SetSignedIn(true);
            });
        }
        else {
            socket.on('ImageReqSlice', (resObj) => {
                let place = resObj.currentSlice * SLICE_SIZE;
                let slice = file.slice(place, place + Math.min(SLICE_SIZE, file.size - place)); 

                const pct = (place / file.size) * 100;
                // Progress bar
                //console.log(pct);
                SetPercent(pct);

                fileReader.readAsArrayBuffer(slice);
            });
            socket.on('ImageUploadError', (resObj) => {
                console.log('Could not upload image');
                SetFile(null);
                // Progress bar
                SetPercent(0);
            });
            socket.on('ImageUploadEnd', (resObj) => {
                fileReader.onload = (evt) => {
                    console.log('Image upload successful');
                    SetFile(null);
                    // Progress bar
                    SetPercent(100);

                    socket.emit('AddUser', { name, ext }, () => {
                        SetSignedIn(true);
                    });
                };
                fileReader.readAsDataURL(file);
            });

            // Start image upload, adding user officially at the end.
            const slice = file.slice(0, SLICE_SIZE);
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                socket.emit('ImageUploadSlice', { ext, name, type: file.type, size: file.size, data: event.target.result });
            };
            fileReader.readAsArrayBuffer(slice);
        }
    };

    const GetImgDetails = (ext, file, src) => {
        console.log(`Ext: ${ext}, src: ${src}, file:`, file);
        SetExt(ext);
        SetFile(file);
        SetSrc(src);
    };

    // The elements on this page have been disabled, implies that the submit button was hit.
    const loadFile = disabled && file !== null;

    //console.log(`Main body called in Join.js`);

    return (
        signedIn ? (
            <PageSelection socket={socket} />
        ) : (
            <div className="position-relative h-100">
                <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <h1 className="text-center text-white">Welcome</h1>
                        <hr className="bg-light" />
                        <input type="text" className="form-control form-control-lg" placeholder="Name" ref={nameField} disabled={disabled} />
                    </div>

                    <div>
                        <ImgUpload GetImgDetails={GetImgDetails} disabled={disabled} loadFile={loadFile} percent={percent} />
                        <button className="btn btn-primary btn-lg btn-block mt-2" onClick={submitProfile} disabled={disabled}>Sign In</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Join;