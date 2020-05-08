var fs = require('fs');
const { PATH, SLICE_SIZE } = require('./consts.js');

// Container for any/all images being uploaded at one time.
var uploads = {};
var uploadObj = { name: null, type: null, size: 0,  data: [], slice: 0 };

const UploadImage = (socketID, data, CB) => {
    if(!uploads[socketID]) {
        uploads[socketID] = Object.assign({}, uploadObj, data);
        uploads[socketID].data = [];
    }
    // Convert the ArrayBuffer to Buffer 
    data.data = Buffer.from(new Uint8Array(data.data)); 
    // Save the data 
    uploads[socketID].data.push(data.data); 
    uploads[socketID].slice++;

    // Upload complete
    if(uploads[socketID].slice * SLICE_SIZE >= uploads[socketID].size) { 
        const fileBuffer = Buffer.concat(uploads[socketID].data);
        const fileName = socketID + '.' + data.ext;

        // First, avatar image goes into open folder
        fs.writeFile(PATH + fileName, fileBuffer, (error) => {
            delete uploads[socketID];
            if(error) {
                CB(-1);
                return;
            }
            CB(0);
            return;
        });                    
    }
    else { 
        CB(uploads[socketID].slice);
    }
};

const GetImage = (socketID, imgExt) => {
    const fileName = socketID + '.' + imgExt;
    let data = fs.readFileSync(PATH + fileName);
    return "data:image/" + imgExt + ";base64,"+ data.toString("base64");
};

const RemoveImage = (fileName) => {
    fs.unlink(PATH + fileName, (err) => {
        if(err)
            console.log(err);
    });
};

module.exports = { UploadImage, GetImage, RemoveImage };