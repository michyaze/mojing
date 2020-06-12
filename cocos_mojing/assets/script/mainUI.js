
cc.Class({
    extends: cc.Component,

    properties: {
        Btn_Type_1: {default:null, type:cc.Button,tooltip: '厝'},
        Btn_Type_2: {default:null, type:cc.Button,tooltip: '氧'},
        Btn_Type_3: {default:null, type:cc.Button,tooltip: '屿'},

        Btn_chapter_1: {default:null, type:cc.Button,tooltip: '副本1入口'},
        Panel_menu: {default:null, type:cc.Node,tooltip: '底部菜单'},

        Prefab_chapter:{default:null, type:cc.Prefab},
    },
    onLoad () {
        cc.log("onLoad");
        this.addClickEvent(this.Btn_Type_1, this.node, "mainUI", "onType_1");
        this.addClickEvent(this.Btn_Type_2, this.node, "mainUI", "onType_2");
        this.addClickEvent(this.Btn_Type_3, this.node, "mainUI", "onType_3");

        this.addClickEvent(this.Btn_chapter_1, this.node, "mainUI", "onBtn_chapter_1");
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
    onBtn_chapter_1(){
        cc.log("onBtn_chapter_1");
        // var chapter = cc.find("Canvas/Panel_chapter");
        // chapter.active = true;
        let chapter = cc.instantiate(this.Prefab_chapter);
        chapter.parent = cc.find("Canvas");

        this.node.active = false;
        this.Panel_menu.active = false;
    },
    addClickEvent: function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        node.clickEvents.push(eventHandler);
    },
    logg: function(){
        cc.log("logg===========>>");
    }
});
