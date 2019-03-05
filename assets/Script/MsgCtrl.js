// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        msgLabel: cc.Label,
        uidLabel: cc.Label,
        isSelf: {
            default: true,
            notify: function () {
                if (this.isSelf){
                    let w = this.getComponent(cc.Widget);
                    w.isAlignRight = true;
                    w.isAlignLeft = false;
                    w.right = 20;

                    let uw = this.uidLabel.node.getComponent(cc.Widget);
                    uw.isAlignRight = true;
                    uw.isAlignLeft = false;
                    uw.right = 0;

                } else {
                    let w = this.getComponent(cc.Widget);
                    w.isAlignRight = false;
                    w.isAlignLeft = true;
                    w.left = 20;
                    this.uidLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;

                    let uw = this.uidLabel.node.getComponent(cc.Widget);
                    uw.isAlignRight = false;
                    uw.isAlignLeft = true;
                    uw.left = 0;
                }
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    initMsg(msg, uid, isSelf){
        this.isSelf = isSelf;
        this.msgLabel.string = msg;
        this.uidLabel.string = uid;
        this.scheduleOnce((dt)=>{
            if (this.isSelf && this.msgLabel.node.width < 500){
                this.msgLabel.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
                this.msgLabel.overflow = cc.Label.Overflow.NONE;
            } else {
                this.msgLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
                this.msgLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
                this.msgLabel.node.width = 500;
            }
        }, 0);
    }

    // update (dt) {},
});
