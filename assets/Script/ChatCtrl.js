// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let NetProxy = require('./net/socket/NetProxy');

cc.Class({
    extends: cc.Component,

    properties: {
        labelDelay: cc.Label,
        editMsg: cc.EditBox,
        msgPanel: cc.Node,
        msgScroll: cc.ScrollView,
        msgPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let uid = cc.sys.localStorage.getItem("chat_uid");
        if (!uid) {
            uid = Date.now();
            cc.sys.localStorage.setItem("chat_uid", uid);
        }

        Global.eventMgr.on(Global.config.EVENT_NETWORK_OPENED, this.onNetOpen, this);
        Global.eventMgr.on(Global.config.EVENT_NETWORK_OPENED, this.onNetClose, this);
        Global.eventMgr.on(Global.config.EVENT_CHAT, this.onChat, this);

        let netProxy = this.netProxy = new NetProxy();
        netProxy.init();
        netProxy.connect();
    },

    beatHeart(dt){
        if (this.netProxy.isNetworkOpened()){
            let t = Date.now();
            this.netProxy.beatHeart((resp)=>{
                this.labelDelay.string = "delay:" + (resp.t - t) + "ms";
            });
        }
    },

    onNetOpen(){
        cc.log('on net connect.');
        this.beatHeart(0);
        this.schedule(this.beatHeart, 5);
    },

    onNetClose(){
        cc.log('on net closed.');
    },

    onChat(event){
        let resp = event.detail;
        cc.log(JSON.stringify(resp));
        let uid = cc.sys.localStorage.getItem("chat_uid");
        if (uid == resp.uid){
            return;
        }
        let msg = cc.instantiate(this.msgPrefab);
        msg.getComponent("MsgCtrl").initMsg(resp.msg, resp.uid, false);
        this._appendMsg(msg);
    },

    _appendMsg(msgNode){
        this.msgPanel.addChild(msgNode);

        if (this.msgPanel.height > this.msgScroll.node.height){
            this.msgScroll.scrollToBottom(0.5);
        }
    },

    start () {

    },

    onBtnSendMsg(){
        let str = this.editMsg.string;
        if (!str) return;
        this.netProxy.chat(str);

        let uid = cc.sys.localStorage.getItem("chat_uid");
        let msg = cc.instantiate(this.msgPrefab);
        msg.getComponent("MsgCtrl").initMsg(str, uid, true);
        this._appendMsg(msg);
    }


    // update (dt) {},
});
