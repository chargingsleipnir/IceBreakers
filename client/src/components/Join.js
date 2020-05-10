import React, { useState } from 'react';
import io from 'socket.io-client';
import { ENDPOINT, SLICE_SIZE } from '../Consts';

import PageSelection from './PageSelection';
import ImgUpload from './ImgUpload';
import LoadBar from './LoadBar';

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
    const html_LoadBar = disabled && file !== null ? <LoadBar percent={percent} /> : "";
    
    //console.log(`Main body called in Join.js`);

    return (
        signedIn ? (
            <PageSelection socket={socket} />
        ) : (
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading test1">Join</h1>
                    <div>
                        <input type="text" className="joinInput" placeholder="Name" ref={nameField} disabled={disabled} />
                    </div>
                    <ImgUpload GetImgDetails={GetImgDetails} disabled={disabled} />
                    <button className="button mt-2" onClick={submitProfile} disabled={disabled}>Sign In</button>
                </div>
                { html_LoadBar }
            </div>
        )
    );
};

export default Join;