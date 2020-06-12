
cc.Class({
    extends: cc.Component,
    //1旁白 2提示 3对话 4输入框 5图片
    properties: {
        prefab_1: {default:null, type:cc.Prefab, tooltip: '旁白'},
        prefab_2: {default:null, type:cc.Prefab, tooltip: '文本'},
        prefab_3: {default:null, type:cc.Prefab, tooltip: '对话'},
        prefab_4: {default:null, type:cc.Prefab, tooltip: '输入框'},
        scrollView:cc.Node,
        parent: cc.Node,   //预制件实例化后所在的父节点
        btn_back:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log("chapterMgr onLoad");
        var button = this.btn_back.getComponent(cc.Button);
        this.addClickEvent(button, this.node, "chapterMgr", "onBtnBack", "configObj");
    },
    start () {
        this._isLoad = false;
        cc.log("从本地加载数据：");
        this._config = {};
        var self = this;
        cc.loader.loadRes('config/play_1', function (err, object) {
            if (err) {
                cc.log("load config error!!");
                return;
            }
            self._config = object.json;
            self.configLen = self._config.length;
            cc.log("加载数据完成！");
            self._isLoad = true;
            // var index = 0;
            // for (let id = 0; id < self._config.length; id++) {
            //     const obj = self._config[id];
            //     // cc.log("id = " + obj.id);
            //     // cc.log("content = " + obj.content);

            //     self["createPrefab_" + obj.type](obj);
            //     index = index + 1;
            // }
        });
        this._index = 0;
        this._dt = 0;
        this._isPass = true;   //输入是否正确,第一次要设置为成功 false会卡住


    },
    onBtnBack(event, argc){
        var main = cc.find("Canvas/Panel_main");
        main.active = true;
        var menu = cc.find("Canvas/Panel_menu");
        menu.active = true;   

        // this.node.active = false;
        this.node.destroy();
    },
    update(dt){
        if( !this._isLoad | this.isGameOver()){
            return;
        }
        const obj = this._config[this._index];
        //是输入框，并且没有正确
        if(obj.type == 4 & !this._isPass){
            return;
        }
        this._dt = this._dt + dt;
        if(this._dt > obj.time){
            this._dt = this._dt - obj.time;
            this["createPrefab_" + obj.type](obj);
            if(obj.type == 4){
                this._isPass = false;
            }
            else{
                this._index = this._index + 1;
            }
            this.scrollView.getComponent(cc.ScrollView).scrollToBottom(0.1);
        }   
    },
    isGameOver: function(){
        return this._index >= this._config.length;
    },
    //1旁白
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
            let labelNode = cc.instantiate(this.prefab_2);
            labelNode.parent = this.lastNode;
            let label = labelNode.getComponent(cc.Label);
            label.string = configObj.content;
            label.horizontalAlign = configObj.align;
            label._forceUpdateRenderData();
        }
        

        // node_clone.getComponent("blockMgr").addLabel(configObj);
    },
    //2提示
    createPrefab_2: function(configObj){
        let labelNode = cc.instantiate(this.prefab_2);
        labelNode.parent = this.parent;
        let label = labelNode.getComponent(cc.Label);
        label.string = configObj.content;
        label.horizontalAlign = configObj.align;
        label._forceUpdateRenderData();
    },
    //3对话
    createPrefab_3: function(configObj){
        let node = cc.instantiate(this.prefab_3);
        node.parent = this.parent;
        let iconNode = node.getChildByName("img_icon");
        let imgbgNode = node.getChildByName("img_bg");
        let labelNode = imgbgNode.getChildByName("label");
        let label = labelNode.getComponent(cc.Label);
        label.string = configObj.content;
        label.horizontalAlign = configObj.align;
        label._forceUpdateRenderData();
        imgbgNode.getComponent(cc.Layout)._doLayout();
        var iconSize = iconNode.getContentSize();
        var imgbgSize = imgbgNode.getContentSize();
        var height = 0;
        if(iconSize.height > imgbgSize.height){
            height = iconSize.height;
        }
        else{
            height = imgbgSize.height;
        }
        let size = node.getChildByName("img_bg");
        node.setContentSize(size.width, height);

    },
    //4输入框
    createPrefab_4: function(configObj){
        let node = cc.instantiate(this.prefab_4);
        node.parent = this.parent;
        var btn_enter = node.getChildByName("btn_enter").getComponent(cc.Button);
        this.addClickEvent(btn_enter, this.node, "chapterMgr", "onType_1", configObj);
    },
    //5图片
    createPrefab_5: function(configObj){
        cc.log("createPrefab_5");
    },
    checkAnswer:function(inputStr, answerStr){
        return inputStr == answerStr;
    },
    onType_1(event, argc){      
        cc.log("onType_1==== " + argc.answer);
        // 这里 event 是一个 Event 对象，你可以通过 event.target 取到事件的发送节点
        var node = event.target;
        var editBoxNode = node.parent.getChildByName("editBox");

        var inputStr = editBoxNode.getComponent(cc.EditBox).string;
        cc.log("inputStr ==== " + inputStr);
        var bRet = this.checkAnswer(inputStr, argc.answer);
        if(bRet){
            cc.log("true=====");
            node.getComponent(cc.Button).interactable = false;
            this._isPass = true;
            this._index = this._index + 1;
        }
        else{
            cc.log("false=====");
        }
    },
    addClickEvent: function(node,target,component,handler, argc){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        eventHandler.customEventData = argc;
        node.clickEvents.push(eventHandler);
    },

    // var userInfo = {
    //     "userName":"hello",
    //     "age":10,
    //     "sex":'woman'
    // };
 
    // //转换为字符串
    // var uI = JSON.stringify(userInfo);
    
    // //转换为json对象
    // var Iu = JSON.parse(uI);
    
    // console.log(Iu.userName);

    // update (dt) {},
});
