export const ENDPOINT = 'localhost:5000';
export const SLICE_SIZE = 100000;
export const pages = { USERS: 0, CHAT: 1 };
export const msgTypes = { TEXT: 0, CE_FIGHT: 1, CE_TRAP: 2, CE_BLANK: 3 };

export const iceBreakers = { NONE: 0, FIGHT: 1, TRAP: 2, BLANK: 3 };
export const CE_MSG_DELAY = 750;

export const FIGHT_MAX_ROUNDS = 5;
export const fightRoundActions = { PUNCH: 0, TACKLE: 1, KICK: 2 };
export const fightWinner = { SENDER: 0, RESPONDER: 1, TIE: 2 };
export const fightSteps = { INIT: 0, ACCEPT: 1, CANCEL: 2, ACT: 3, END: 4 };

export const trapSteps = { INIT: 0, ACCEPT: 1, REJECT: 2, STRUGGLE: 3, END: 4 };
export const TRAP_STRUGGLE_TIME = 3000;
export const TRAP_STRUGGLE_COUNT = 15;

export const GetOrientation = (file, callback) => {
    var reader = new FileReader();
    reader.onload = function(e) {

        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) !== 0xFFD8)
        {
            return callback(-2);
        }
        var length = view.byteLength, offset = 2;
        while (offset < length) 
        {
            if (view.getUint16(offset+2, false) <= 8) return callback(-1);
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xFFE1) 
            {
                if (view.getUint32(offset += 2, false) !== 0x45786966) 
                {
                    return callback(-1);
                }

                var little = view.getUint16(offset += 6, false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                {
                    if (view.getUint16(offset + (i * 12), little) === 0x0112)
                    {
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
                    }
                }
            }
            else if ((marker & 0xFF00) !== 0xFF00)
            {
                break;
            }
            else
            { 
                offset += view.getUint16(offset, false);
            }
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
};

export const ResetOrientation = (srcBase64, srcOrientation, callback) => {
    var img = new Image();
    
    img.onload = function() {
        var width = img.width,
            height = img.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d");
    
        // set proper canvas dimensions before transform & export
        if (4 < srcOrientation && srcOrientation < 9) {
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }
    
        // transform context before drawing image
        switch (srcOrientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
            case 7: ctx.transform(0, -1, -1, 0, height, width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
        }
    
        // draw image
        ctx.drawImage(img, 0, 0);
    
        // export base64
        callback(canvas.toDataURL());
    };

    img.src = srcBase64;
};