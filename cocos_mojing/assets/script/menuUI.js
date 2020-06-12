
cc.Class({
    extends: cc.Component,

    properties: {
        Img_main: {default:null, type:cc.Button,tooltip: '主页'},
        Img_bag: {default:null, type:cc.Button,tooltip: '锦囊'},
        Img_record: {default:null, type:cc.Button,tooltip: '档案'},
        Img_my: {default:null, type:cc.Button,tooltip: '我的'},
        Img_select: {default:null, type:cc.Node,tooltip: '选择'},
        node_main: {default:null, type:cc.Node,tooltip: 'node_main'},
        node_bag: {default:null, type:cc.Node,tooltip: 'node_bag'},
        node_my: {default:null, type:cc.Node,tooltip: 'node_my'},
        panel_main: {default:null, type:cc.Node,tooltip: 'node_my'},
    },
    onLoad () {
        cc.log("menuUI onLoad");
        this.addClickEvent(this.Img_main, this.node, "menuUI", "onImg_main");
        this.addClickEvent(this.Img_bag, this.node, "menuUI", "onImg_bag");
        this.addClickEvent(this.Img_record, this.node, "menuUI", "onImg_record");
        this.addClickEvent(this.Img_my, this.node, "menuUI", "onImg_my");
    },
    onImg_main(){        
        cc.log("onImg_main");
        this.panel_main.getComponent("mainUI").logg();
        this.setSelect(this.Img_main, this.node_main);
    },
    onImg_bag(){
        cc.log("onImg_bag");
        this.setSelect(this.Img_bag, this.node_bag);
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
        this.setSelect(this.Img_my, this.node_my);
    },
    addClickEvent: function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        node.clickEvents.push(eventHandler);
    },
    start () {
        cc.log("start");
        this._select = this.node_main;
    },
    setSelect(pImg, pNode){
        if (this._select == pNode) {
            cc.log("same");
            return;
        }
        var pos = pImg.node.getPosition();
        this.Img_select.setPosition(pos);
        this._select.active = false;
        this._select = pNode;
        this._select.active = true;
    }
});
