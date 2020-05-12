import React, { Component } from 'react';
import io from 'socket.io-client';
import { ENDPOINT, SLICE_SIZE } from '../Consts';

import PageSelection from './PageSelection';
import ImgUpload from './ImgUpload';

import defaultImg from '../images/SpeechlessGuy.png';

let socket;

// TAG (build): Remove "ENDPOINT" on build/deployment
socket = io();

class Join extends Component {

    state = {
        file: null,
        percent: 0,
        disabled: false,
        signedIn: false
    };

    constructor(props) {
        super(props);

        this.nameField = React.createRef();
        this.fileExt = '';
        this.fileSrc = defaultImg;

        this.slice = null;
        this.fileReader = null;

        socket.on('ImageReqSlice', (resObj) => {
            let place = resObj.currentSlice * SLICE_SIZE;
            this.slice = this.state.file.slice(place, place + Math.min(SLICE_SIZE, this.state.file.size - place)); 

            const percent = (place / this.state.file.size) * 100;
            this.setState({ percent });

            this.fileReader.readAsArrayBuffer(this.slice);
        });

        // TODO: Make sure file reader is shut down as soon as error hits!

        socket.on('ImageUploadError', (error) => {
            console.log('Could not upload image due to error: ', error);
            this.fileReader.abort();
            alert("Error uploading image, restoring default, my bad. :(");
            this.fileExt = '';
            this.fileSrc = defaultImg;
            this.setState({
                file: null,
                disabled: false,
                percent: 0
            });
        });
        socket.on('ImageUploadEnd', (resObj) => {
            this.fileReader.onload = (evt) => {
                console.log('Image upload successful');
                this.setState({
                    file: null,
                    percent: 100
                });

                socket.emit('AddUser', { name: this.nameField.current.value, ext: this.fileExt }, () => {
                    this.setState({ signedIn: true });
                });
            };
            this.fileReader.readAsDataURL(this.state.file);
        });

        this.SubmitProfile = this.SubmitProfile.bind(this);
        this.GetImgDetails = this.GetImgDetails.bind(this);
    }


    SubmitProfile (event) {
        event.preventDefault();
        const name = this.nameField.current.value;
        
        if(name === '') {
            alert("Name required");
            return;
        }

        this.setState({ disabled: true });

        console.log(`Submit clicked - Name: ${name}, Ext: ${this.fileExt}, src: ${this.fileSrc}, file:`, this.state.file);


        if(this.state.file === null) {
            socket.emit('AddUser', { name, ext: this.fileExt }, () => {
                this.setState({ signedIn: true });
            });
        }
        else {
            // Start image upload, adding user officially at the end.
            this.slice = this.state.file.slice(0, SLICE_SIZE);
            this.fileReader = new FileReader();
            this.fileReader.onload = (event) => {
                socket.emit('ImageUploadSlice', { ext: this.fileExt, name, type: this.state.file.type, size: this.state.file.size, data: event.target.result });
            };
            this.fileReader.readAsArrayBuffer(this.slice);
        }
    };

    GetImgDetails (ext, file, src) {
        console.log(`Ext: ${ext}, src: ${src}, file:`, file);
        this.fileExt = ext;
        this.fileSrc = src;
        this.setState({ file });
    };

    //console.log(`Main body called in Join.js`);

    render() {

        // The elements on this page have been disabled, implies that the submit button was hit.
        const willLoadFile = this.state.disabled && this.state.file !== null;

        return (
            this.state.signedIn ? (
                <PageSelection socket={socket} />
            ) : (
                <div className="position-relative h-100">
                    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
                        <div>
                            <h1 className="text-center text-white">Welcome</h1>
                            <hr className="bg-light" />
                            <input type="text" className="form-control form-control-lg" placeholder="Name" ref={this.nameField} disabled={this.state.disabled} />
                        </div>

                        <div>
                            <ImgUpload GetImgDetails={this.GetImgDetails} imgSrc={this.fileSrc} disabled={this.state.disabled} willLoadFile={willLoadFile} percent={this.state.percent} />
                            <button className="btn btn-primary btn-lg btn-block mt-2" onClick={this.SubmitProfile} disabled={this.state.disabled}>Sign In</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
};

export default Join;