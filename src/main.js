window.onload = function() {
    var gameScene = {};
    window.game = {};
    cc.game.onStart = function() {
        
        var screenSize = cc.view.getFrameSize(); 
        var designSize = cc.size(1024, 768);
        cc.loader.resPath = "images";

        cc.view.setDesignResolutionSize(1024, 768,cc.ResolutionPolicy.SHOW_ALL);
        cc.LoaderScene.preload(g_resources, function() {
            //处理loading

            setTimeout(function(){

                window.MyScene = cc.Scene.extend({
                    onEnter: function() {
                        $("#loading").hide();
                        $("#spinner").hide();
                        $("#Cocos2dGameContainer").show();
                        //this.scheduleUpdate();
                        this._super();  
                        // $("#gameCanvas").get(0).style.width = "1024px";
                        // $("#gameCanvas").get(0).style.height = "678px";
                        // $("#Cocos2dGameContainer").get(0).style.width = "1024px";
                        // $("#Cocos2dGameContainer").get(0).style.height = "678px";
                        // $("#Cocos2dGameContainer").get(0).style.margin = "0px";
                        this._gameBgLayer = new GameBgLayer(this);
                        this.addChild(this._gameBgLayer);
                        this._gameLayer = new GameLayer(this);
                        this.addChild(this._gameLayer);
                    }
                });
                cc.director.runScene(new MyScene());
                },3000)
            
        }, this);


    };
    //cc.game.run("gameCanvas");

};