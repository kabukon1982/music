var button = cc.Sprite.extend({
	ctor: function(filename, rect) {
		this._super(filename, rect);
		
	},
	init: function() {
		var touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE, 
			swallowTouches: true,
			onTouchBegan: function(touch, event) {
				var target = event.getCurrentTarget();
				return target.onPatternTouchBegan(touch, event);
			},
			onTouchMoved: function(touch, event) {
			},
			onTouchEnded: function(touch, event) {
			}
		});
		cc.eventManager.addListener(touchListener, this);
	},
	onPatternTouchBegan: function(touch, event) {
		var __target = event.getCurrentTarget();
		var __locationInNode = touch.getLocation();
		__locationInNode = __target.convertToNodeSpace(__locationInNode);
			var __s = __target.getContentSize();
			var __p = __target.getPosition();
			var __rect = cc.rect(0, 0, __s.width, __s.height);
			//var __rect = cc.rect(__p.x, __p.y, __s.width, __s.height);
			if (cc.rectContainsPoint(__rect, __locationInNode)) {
				window.location.href = "index.html";
			} else {
				return false;
			}
		
		return true;
	}

});