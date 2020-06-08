
cc.Class({
    extends: cc.Component,
    //1旁白 2提示 3对话 4输入框 5图片
    properties: {
        prefab_1: {default:null, type:cc.Prefab, tooltip: '旁白'},
        prefab_2: {default:null, type:cc.Prefab, tooltip: '提示'},
        prefab_3: {default:null, type:cc.Prefab, tooltip: '对话'},
        prefab_4: {default:null, type:cc.Prefab, tooltip: '输入框'},
        prefab_5: {default:null, type:cc.Prefab, tooltip: '文本框'},
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
                // self.createPrefab(obj);
                self["createPrefab_" + obj.type](obj);
                index = index + 1;
                // if(index >= 12){
                //     break;
                // }
            }
        });
    },
    //创建类型1--旁白
    createPrefab_1: function(configObj){
        //新背景，创建背景和label
        if(configObj.belongs == 0){
            let node_clone = cc.instantiate(this.prefab_1);
            node_clone.parent = this.parent;
            this.lastNode = node_clone;
            let labelNode = node_clone.getChildByName("label");
            let label = labelNode.getComponent(cc.Label);
            label.string = configObj.content;
            label.horizontalAlign = configObj.align;
            label._forceUpdateRenderData();
        }
        //接上一个背景,只创建label
        else{
            if(this.lastNode == null){
                cc.log("createPrefab_1 parent error!");
                return;
            }
            let labelNode = cc.instantiate(this.prefab_5);
            labelNode.parent = this.lastNode;
            let label = labelNode.getComponent(cc.Label);
            label.string = configObj.content;
            label.horizontalAlign = configObj.align;
            label._forceUpdateRenderData();
        }
        

        // node_clone.getComponent("blockMgr").addLabel(configObj);
    },

    createPrefab_2: function(configObj){
        cc.log("createPrefab_2");
    },
    createPrefab_3: function(configObj){
        cc.log("createPrefab_3");
    },
    createPrefab_4: function(configObj){
        cc.log("createPrefab_4");
    },
    createPrefab_5: function(configObj){
        cc.log("createPrefab_5");
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
