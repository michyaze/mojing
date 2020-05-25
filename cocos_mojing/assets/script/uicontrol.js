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
        myLable:{
            default:null,
            type:cc.Node
        },
        myButton:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },
    _setLableVisible: function(){
        if (this.activeInHierarchy){
            cc.log("true");
            this.active = false;
        }
        else{
            cc.log("false");
            this.active = true;
        }
        cc.log("touchend : " + this.activeInHierarchy);
    },
    onEnable: function () {
        this.myButton.on("touchend", this._setLableVisible, this.myLable);
        cc.log("onEnable");
    },
    onDisable: function () {
        this.node.off('touchend', this._setLableVisible, this.myLable);
        cc.log("onDisable");
    },
    start () {

    },

    // update (dt) {},
});
