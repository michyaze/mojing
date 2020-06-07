
cc.Class({
    extends: cc.Component,

    properties: {

    },

    addLabel: function(configObj){
        var labelNode = this.node.getChildByName("label");
        var node = cc.instantiate(labelNode);
        node.parent = this.node;
        var label = node.getComponent(cc.Label);
        label.string = configObj.content;
        label.horizontalAlign = 0;//configObj.align;
        label._forceUpdateRenderData();
        labelNode.active = false;
        
        var size = node.getContentSize();
        var nSize = this.node.getContentSize();
        this.node.setContentSize(nSize.width, size.height);
    },
    logg: function(){
        cc.log("logg===========>>");
    }
});
