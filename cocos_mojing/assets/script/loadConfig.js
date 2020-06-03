// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("从本地加载数据：");
        this._config = {};
        cc.loader.loadRes('config/config', function (err, object) {
            if (err) {
                cc.log("load config error!!");
                return;
            }
            // 读取的数据返回在object中，这是一个拥有2个元素的对象
            let engine = object.json.engine; // engine = box2D
            let ver = object.json.version;   // ver = 2.3.1
            cc.log("engine = " + engine);
            cc.log("ver = " + ver);
            self._config = object.json;
            cc.log("加载数据完成！");
        });      
    },

    // update (dt) {},
});
