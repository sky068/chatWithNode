module.exports = function(wsRouter, ws, msg){
    let msgObj = JSON.parse(msg);
    switch (msgObj.act){
        case 'heart':{
            msgObj.data.t = Date.now();
            ws.send(JSON.stringify(msgObj));
            break;
        }
        case 'chat': {
            for (let w of wsRouter.clients){
                w.send(msg);
            }
            break;
        }

        default:
            break;
    }
}