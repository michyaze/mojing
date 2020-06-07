
cc.Class({
    extends: cc.Component,
    //1旁白 2提示 3对话 4输入框 5图片
    properties: {
        prefab_1: {default:null, type:cc.Prefab, tooltip: '旁白'},
        prefab_2: {default:null, type:cc.Prefab, tooltip: '提示'},
        prefab_3: {default:null, type:cc.Prefab, tooltip: '对话'},
        prefab_4: {default:null, type:cc.Prefab, tooltip: '输入框'},
        parent: cc.Node,   //预制件实例化后所在的父节点
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
                self.createPrefab(obj);
                index = index + 1;
                if(index > 2){
                    break;
                }
            }
        });

        // let node1 = cc.instantiate(this.prefab_1);
        // node1.parent = this.parent || this.node;

        // let node2 = cc.instantiate(this["prefab_2"]);
        // node2.parent = this.parent || this.node;
        // let node3 = cc.instantiate(this.prefab_3);
        // node3.parent = this.parent || this.node;
        // let node4 = cc.instantiate(this.prefab_4);
        // node4.parent = this.parent || this.node;
    },
    //实例化预制体
    createPrefab: function(configObj){
        var prefabName = "prefab_" + configObj.type;
        let node = cc.instantiate(this[prefabName]);
        node.parent = this.parent || node;
        node.getComponent("blockMgr").addLabel(configObj);
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
