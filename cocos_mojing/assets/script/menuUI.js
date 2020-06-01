// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Img_main: {
            default:null, 
            type:cc.Button,
            tooltip: '主页'
        },

        Img_bag: {
            default:null, 
            type:cc.Button,
            tooltip: '锦囊'
        },

        Img_record: {
            default:null, 
            type:cc.Button,
            tooltip: '档案'
        },
        Img_my: {
            default:null, 
            type:cc.Button,
            tooltip: '我的'
        },
        Img_select: {
            default:null, 
            type:cc.Node,
            tooltip: '选择'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("onLoad");
        this.addClickEvent(this.Img_main, this.node, "menuUI", "onImg_main");
        this.addClickEvent(this.Img_bag, this.node, "menuUI", "onImg_bag");
        this.addClickEvent(this.Img_record, this.node, "menuUI", "onImg_record");
        this.addClickEvent(this.Img_my, this.node, "menuUI", "onImg_my");
    },


    onImg_main(){        
        cc.log("onImg_main");
        var pos = this.Img_main.node.getPosition();
        this.Img_select.setPosition(pos);
    },

    onImg_bag(){
        cc.log("onImg_bag");
        var pos = this.Img_bag.node.getPosition();
        this.Img_select.setPosition(pos);
    },

    onImg_record(){
        cc.log("onImg_record");
        var pos = this.Img_record.node.getPosition();
        this.Img_select.setPosition(pos);
    },
    onImg_my(){
        cc.log("onImg_my");
        var pos = this.Img_my.node.getPosition();
        this.Img_select.setPosition(pos);
    },
    addClickEvent: function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        node.clickEvents.push(eventHandler);
    },

    start () {

    },

    // update (dt) {},
});
