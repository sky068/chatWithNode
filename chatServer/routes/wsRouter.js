let expressWS = require('express-ws');
let work = require('./work');

let wsRouter = null;

function WSRouter(app, server){
    this.app = app;
    this.server = server;
    this.clients = [];
    expressWS(app, server);

    this.listenClientConnection = ()=>{
        app.ws('/', (ws, req)=>{
            console.log('client connect to server successful.');
            this.clients.push(ws);
            console.log('clients: ' + this.clients.length);
            ws.on('message', (msg)=>{
                console.log('on message: ' + msg);
                work(this, ws, msg);
            });

            ws.on('close', (msg)=>{
                console.log('on close: ' + msg);
                for (let index=0; index<this.clients.length; index++){
                    if (this.clients[index] == ws){
                        this.clients.splice(index,1);
                    }
                }
                console.log('clients: ' + this.clients.length);
            });

            ws.on('error', (err)=>{
                console.log('on error: ' + error);
            });
        })
    }
}


module.exports = {
    init: function(app, server){
        if (wsRouter == null){
            wsRouter = new WSRouter(app, server);
        }
        return wsRouter;
    }
}