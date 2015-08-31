var BG1 = null;
var BG2 = null;
var GameBgLayer = cc.Layer.extend({
    _context: null,
    _progressTime: null,
    _progressTimeScheduler: null,
    _updateScheduler: null,
    _score: null,
    ctor: function(a) {
        this._super();
        this._context = a;
        this.init();
    },
    init: function() {
        this._super();
        
        var __bg1 = window.BG = new cc.Sprite(s_bg);
        __bg1.anchorX = 0;
        __bg1.anchorY = 0;
        __bg1.x = 0;
        __bg1.y = 0;
        this.addChild(__bg1);

    }
});