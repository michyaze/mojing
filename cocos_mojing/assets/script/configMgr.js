
cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
        cc.log("从本地加载数据：");
        this._config = {};
        var self = this;
        cc.loader.loadRes('config/config', function (err, object) {
            if (err) {
                cc.log("load config error!!");
                return;
            }
            // 读取的数据返回在object中，这是一个拥有2个元素的对象
            // let engine = object.json.engine; // engine = box2D
            // let ver = object.json.version;   // ver = 2.3.1
            // cc.log("engine = " + engine);
            // cc.log("ver = " + ver);
            self._config = object.json;
            cc.log("加载数据完成！");
            for (let id = 0; id < self._config.length; id++) {
                const obj = self._config[id];
                cc.log("id = " + obj.id);
                cc.log("name = " + obj.name);
                cc.log("time = " + obj.time);
                cc.log("dec = " + obj.dec);
            }
        });      
    },

    // update (dt) {},
});
