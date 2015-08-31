var rocket = cc.Sprite.extend({
	ctor: function(filename, rect) {
		this._super(filename, rect);
		
	},
	init: function(mix) {
		var STARTSPEED = 0.2;
		var FIRSTHEIGHT = 2000;
		var FIRSTDOWNSPEED = 3;
		this.mix = mix;
		this.offset = 0;
		this.score = mix * 100;
		this.startSpeed = STARTSPEED; 
		this.downSpeed = 1.5;
		if(this.mix == 1 || this.mix == 2){
			this.offset = 12;

		}else{

			this.offset = 6;
		}

		var touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE, 
			swallowTouches: true,
			onTouchBegan: function(touch, event) {
				var target = event.getCurrentTarget();
				return target.onPatternTouchBegan(touch, event);
			},
			onTouchMoved: function(touch, event) {
				var target = event.getCurrentTarget();
				//target.onPatternTouchMoved(touch, event);
			},
			onTouchEnded: function(touch, event) {
			}
		});
		cc.eventManager.addListener(touchListener, this);
	},
	onPatternTouchBegan: function(touch, event) {
			var __target = event.getCurrentTarget();
			var __locationInNode = touch.getLocation();
			var __s = __target.getContentSize();
			var __p = __target.getPosition();
			var __rect = cc.rect(__p.x, __p.y, __s.width, __s.height);
			//var __rect = cc.rect(__p.x, __p.y, __s.width, __s.height);
			if (cc.rectContainsPoint(__rect, __locationInNode)) {
				if(Math.abs(__p.y) > 200){
					return;
				}
				if(Math.abs(__p.y) < window.targetPoint){
					if(!!__target.clicked){
						return;
					}
					//__target.setOpacity(100);	
					__target.setTexture(s_objectActive);
					__target.clicked = true;
					__target.stopAllActions();
					
					__target.x -= __target.offsetX;
					__target.y = 42;
					var __action = cc.sequence(cc.delayTime(0.5), cc.callFunc(function(){

						__target.removeFromParent(!0);
			        }));
			        __target.runAction(__action);
					var event1 = new cc.EventCustom("SCORE");
						event1.setUserData(__target);
						cc.eventManager.dispatchEvent(event1);
				}
				

			} else {
				return false;
			}
		return true;
	}

});