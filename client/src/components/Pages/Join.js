import React, { useState } from 'react';
import { pages, SLICE_SIZE } from '../../Consts';
import ImgUpload from '../ImgUpload';
import LoadBar from '../LoadBar';
import Gbl from '../../Global';

const Join = ({socket, GoToPage}) => {
    const [name, SetName] = useState('');
    const [ext, SetExt] = useState('');
    const [file, SetFile] = useState(null);
    const [src, SetSrc] = useState('');
    const [percent, SetPercent] = useState(0);
    const [disabled, SetDisabled] = useState(false);

    const submitProfile = (event) => {
        event.preventDefault();
        
        if(name === '') {
            alert("Name required");
            return;
        }

        // Set global user name
        Gbl.user.name = name;

        SetDisabled(true);

        console.log(`Submit clicked - Name: ${name}, Ext: ${ext}, file: ${file}, src: ${src}`);

        // TODO: Shut down UI while uploading (or just animate it away anyway)
        // TODO: Phase/animate in users UI

        if(file === null) {
            socket.emit('AddUser', { name, ext }, () => {
                // TODO: Smooth transition functionality? Or just jump to next, not a big deal for scope of app.
                GoToPage(pages.USERS);
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
                        // TODO: Smooth transition functionality? Or just jump to next, not a big deal for scope of app.
                        GoToPage(pages.USERS);
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
        console.log(`Ext: ${ext}, file: ${file}, src: ${src}`);
        SetExt(ext);
        SetFile(file);
        SetSrc(src);
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading test1">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => SetName(event.target.value)} disabled={disabled} /></div>
                <ImgUpload GetImgDetails={GetImgDetails} disabled={disabled} />
                <button className="button mt-2" onClick={submitProfile} disabled={disabled}>Sign In</button>
            </div>
            <LoadBar reveal={disabled && file !== null} percent={percent} />
        </div>
    );
};

export default Join;