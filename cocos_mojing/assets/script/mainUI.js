
cc.Class({
    extends: cc.Component,

    properties: {
        Btn_Type_1: {
            default:null, 
            type:cc.Button,
            tooltip: '厝'
        },

        Btn_Type_2: {
            default:null, 
            type:cc.Button,
            tooltip: '氧'
        },

        Btn_Type_3: {
            default:null, 
            type:cc.Button,
            tooltip: '屿'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("onLoad");
        this.addClickEvent(this.Btn_Type_1, this.node, "mainUI", "onType_1");
        this.addClickEvent(this.Btn_Type_2, this.node, "mainUI", "onType_2");
        this.addClickEvent(this.Btn_Type_3, this.node, "mainUI", "onType_3");
    },


    onType_1(){        
        cc.log("onType_1");
    },

    onType_2(){
        cc.log("onType_2");
    },

    onType_3(){
        cc.log("onType_3");
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
});
