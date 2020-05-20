var fs = require('fs');
var Consts = require('./Consts.js');

// Container for any/all images being uploaded at one time.
var uploads = {};
var uploadObj = { name: null, type: null, size: 0,  data: [], slice: 0 };

const UploadImage = (socketID, data) => {
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
    if(uploads[socketID].slice * Consts.SLICE_SIZE >= uploads[socketID].size) { 
        const fileBuffer = Buffer.concat(uploads[socketID].data);
        const fileName = socketID + '.' + data.ext;

        let retVal = { slice: 0, error: null };

        try {
            fs.writeFileSync(Consts.PATH + fileName, fileBuffer);
        } catch (error) {
            console.log(`ImageUploadSlice error: `, error);
            retVal = { slice: -1, error };
        } finally {
            console.log(`Erasing upload object: ${socketID}`);
            delete uploads[socketID];
        }

        return retVal;                  
    }
    else { 
        return { slice: uploads[socketID].slice, error: null };
    }
};

const GetImage = (socketID, imgExt) => {
    const fileName = socketID + '.' + imgExt;
    let data = fs.readFileSync(Consts.PATH + fileName);
    return "data:image/" + imgExt + ";base64,"+ data.toString("base64");
};

const RemoveImage = (fileName) => {
    fs.unlink(Consts.PATH + fileName, (err) => {
        if(err)
            console.log(err);
    });
};

module.exports = { UploadImage, GetImage, RemoveImage };