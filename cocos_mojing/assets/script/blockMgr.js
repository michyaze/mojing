
cc.Class({
    extends: cc.Component,

    properties: {

    },

    addLabel: function(configObj){
        var label = this.node.getComponent(cc.Label);
        label.string = configObj.content;
        label.horizontalAlign = configObj.align;
        label._forceUpdateRenderData();
        
        var nSize = this.node.getContentSize();
        var pSize = this.node.parent.getContentSize();
        var height = pSize.height + nSize.height + 5;//间距5
        this.node.parent.setContentSize(pSize.width, height);
    },
});
