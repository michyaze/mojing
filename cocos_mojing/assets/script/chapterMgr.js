
cc.Class({
    extends: cc.Component,

    properties: {
        chapter_1: {
            default:null, 
            type:cc.Button,
            tooltip: '关卡'
        },

    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("chapterMgr onLoad");
        cc.debug.setDisplayStats(false);
        // this.addClickEvent(this.chapter_1, this.node, "chapterMgr", "onType_1");
    },
    
    onType_1(){        
        cc.log("onType_1");
    },
    start () {
        cc.log("从本地加载数据：");
        this._config = {};
        var self = this;
        cc.loader.loadRes('config/play_1', function (err, object) {
            if (err) {
                cc.log("load config error!!");
                return;
            }
            self._config = object.json;
            cc.log("加载数据完成！");
            var index = 0;
            for (let id = 0; id < self._config.length; id++) {
                const obj = self._config[id];
                cc.log("id = " + obj.id);
                cc.log("content = " + obj.content);
                index = index + 1;
                if(index > 5){
                    break;
                }
            }
        });      
    },
    addClickEvent: function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        node.clickEvents.push(eventHandler);
    },
    // update (dt) {},
});
