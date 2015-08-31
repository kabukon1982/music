var GameLayer = cc.Layer.extend({
    ROADSTART: [{x: 352, y: 0}, {x: 450, y: 0}, {x: 545, y: 0}, {x: 640, y: 0}],
    ROADEND: [{x: -25, y: -190}, {x: 250, y: -190}, {x: 510, y: -190}, {x: 795, y: -190}],
    ROADENDX: [{x: 25, y: -30}, {x: 270, y: -30}, {x: 510, y: -30}, {x: 770, y: -30}],
    MISSPOS: [{x: 202, y: 180}, {x: 406, y: 180}, {x: 610, y: 180}, {x: 820, y: 180}],
    ROTATE: [20,9,0,-6],
    OFFSETX: [45,30,17,10],
    OFFSETY: [142,125,110,105],
    COUNTDOWN: 0,
    TIMER: 0,
    TIMEROVER: 41000,
    MUSICBOOK: [
        100,300,500,700,900,1200,1500,2000,2100,2400,2800,3600,4100,4700,4900,5100,5200,5400,5600,5800,6000,6100,6200,6300,6400,6500,6700,6900,7000,7200,7400,7500,7600,7800,7900,8100,8200,8300,8500,8700,8800,8900,9100,9200,9300,9400,9500,9700,9800,10000,10100,10200,10300,10400,10500,10600,10700,10800,10900,11000,11100,11300,11400,11600,11800,11900,12000,12100,12300,12400,12500,12700,12800,12900,13000,13100,13300,13400,13600,13700,13900,14000,14200,14300,14500,14600,14700,14800,14900,15000,15200,15300,15500,15700,15900,16100,16200,16400,16500,16600,16700,16800,16900,17000,17200,17300,17400,17500,17600,17700,17900,18000,18100,18200,18400,18500,18600,18800,18900,19000,19100,19300,19500,19600,19800,19900,20000,20100,20300,20400,20500,20600,20700,20900,21000,21100,21200,21300,21500,21600,21700,21800,21900,22100,22300,22500,22600,22800,23000,23100,23300,23400,23500,23600,23800,23900,24100,24200,24300,24500,24700,24800,24900,25000,25100,25200,25300,25400,25500,25600,25700,25800,25900,26050,26000,26100,26150,26200,26250,26300,26400,26500,26550,26600,26700,26800,26850,26900,27000,27050,27100,27200,27300,27350,27400,27450,27500,27600,27700,27800,27850,27900,28000,28050,28100,28200,28250,28300,28400,28500,28550,28600,28700,28800,28850,28900,29000,29050,29100,29200,29300,29350,29400,29500,29600,29700,29800,29850,29900,30000,30050,30100,30200,30300,30400,30500,30600,30700,30800,30900,31000,31100,31200,31300,31400,31500,31600,31700,31800,31900,32000,32100,32200,32300,32400,32500,32600,32700,32800,32900,33000,33100,33200,33300,33400,33500,33600,33700,33800,33900,34000,34100,34200,34300,34500,34700,35000,35400,35700,35800,36200,36300,36600,37400,37600,37700,38400,38600,38700,,39000,39300
    ],
    ctor: function(a) {
        this._super();
        this._context = a;
        this.init();
    },
    init: function() {
        this.WINSIZE = cc.winSize;
        window.BG.setOpacity(80);
        this._super();
        this.score = 0;
        this.createGoldLight();
        this.loadingText();
        //cc.audioEngine.playEffect(m_time);
        this.loadingUI();
        window.targetPoint = 30;
        

    },
    createGoldLight: function(){
    	var __text = this.goldLight = new  cc.Sprite(s_goldlight);
        __text.anchorX = 0;
        __text.anchorY = 0;
        __text.x = 200;
        __text.y = 100;
        __text.setOpacity(0);
        this.addChild(this.goldLight, 2);
    },
    loadingText: function(){
        
        var __text = this.text = new  cc.Sprite(s_text);
        __text.anchorX = 0.5;
        __text.anchorY = 1;
        
        __text.x = this.WINSIZE.width / 2;
        __text.y = 200;
        this.addChild(__text, 1);

    },
    loadingUI: function(){
        var __self = this;
        var __numlist = [s_three,s_two, s_one];

        var __num = new  cc.Sprite(__numlist[__self.COUNTDOWN]);
        __num.anchorX = 0.5;
        __num.anchorY = 0.5;
        __num.setScale(0.5);
        __num.x = __self.WINSIZE.width / 2;
        __num.y = __self.WINSIZE.height / 2;
        this.addChild(__num, 1);

        var __action = cc.sequence(cc.scaleTo(1, 2), cc.callFunc(function(){
            __num.setScale(0.5);
            __num.removeFromParent(!0);
            __self.COUNTDOWN++;
            if(__self.COUNTDOWN == 3){
                __self.text.removeFromParent(!0);
                window.BG.setOpacity(255);
                __self.setUI();
                __self.startGame();
            }else{
                __self.loadingUI();
            }
            
        }));
        __num.runAction(__action);
        
    },
    updateTime: function() {
        this.TIMER += 50;
        if(this.TIMER >= this.TIMEROVER){
            this.win();
            cc.director.pause();
            cc.audioEngine.stopMusic();
            return;
        }
        var s = this.MUSICBOOK.join("|")+"|";
        var d = "|" + this.TIMER + "|";
        if(s.indexOf(d) > -1){
            var __random = Math.ceil(Math.random() * 4);

            if(this.lastM == __random){
                if(__random + 1 > 4){
                    __random = __random - 1;
                }else if(__random - 1 < 1){
                    __random = __random + 1;
                }else{
                    __random = __random + 1;
                }
            }
            this.lastM = __random;
            var __rocket = new rocket(s_object);
            __rocket.init(__random);
            __rocket.anchorX = 0;
            __rocket.anchorY = 0;
            __rocket.setScale(0.15);
            __rocket.x = this.ROADSTART[__rocket.mix - 1].x;
            __rocket.y = cc.winSize.height + __rocket.getContentSize().height;
            this.addChild(__rocket, 3);
            var __self = this;
            var __speed = __rocket.downSpeed;
            var __action = cc.sequence(cc.spawn(cc.moveTo(__speed, {x:this.ROADENDX[__rocket.mix - 1].x,y: this.ROADENDX[__rocket.mix - 1].y - 50}), cc.scaleTo(__speed, 1)), cc.callFunc(function(){
            		__rocket.setOpacity(80);
                	var __action1 = cc.sequence(cc.spawn(cc.moveTo(0.35, {x:__self.ROADEND[__rocket.mix - 1].x,y: __self.ROADEND[__rocket.mix - 1].y}), cc.scaleTo(0.35, 1.1)), cc.callFunc(function(){
		                if(__rocket){
		                	var event = new cc.EventCustom("MISS");
                            event.setUserData(__rocket);
                            cc.eventManager.dispatchEvent(event);
		                }

		            }));
	            	__rocket.runAction(__action1);
            }));
            __rocket.runAction(__action);

        }
        
    },

    win: function() {
        $("#endBG").show();
        //cc.audioEngine.playEffect(m_win);
            this.score = this.formatScore(this.score);
        
        var __s = this.score.toString().split("");
        //for(var i = 0; i < __s.length; i++){
            $("#score1").attr("class", "score"+__s[0]);
            $("#score2").attr("class", "score"+__s[1]);
            $("#score3").attr("class", "score"+__s[2]);
        //}
        
    },
    postResult: function(result){
        
    },
    setUI: function(){
        var __self = this;
        var __btn = new button(s_score_btn);
            __btn.init();
            __btn.setAnchorPoint(1, 1);
            __btn.setPosition(__self.WINSIZE.width, __self.WINSIZE.height);
            __self.addChild(__btn, 1);
            
    },
    startGame: function() {
        var __self = this;
        this.mListener1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "MISS",
            callback: function(event){
                var __miss = new cc.Sprite(s_miss);
                    __miss.setAnchorPoint(0.5, 0.5);
                    __miss.setPosition(__self.MISSPOS[event._userData.mix - 1].x, __self.MISSPOS[event._userData.mix - 1].y);
                    __miss.setOpacity(0);
                    __self.addChild(__miss);
                var __actionTips3 = cc.sequence(cc.spawn(cc.moveTo(0.5, {x:__miss.x, y: __miss.y + 70}), new cc.FadeIn(0.5)),  cc.DelayTime.create(.5), new cc.FadeOut(0.3), cc.callFunc(function(){
                    __miss.removeFromParent(!0);
                    event._userData.removeFromParent(!0);
                }, this));
                __miss.runAction(__actionTips3);
            }
        });

        this.mListener2 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "SCORE",
            callback: function(event){
            	if(__self.lastScore){
            		__self.lastScore.removeFromParent(!0);
            	}
            	
                var __size = __self.WINSIZE;
                	var __scoreS = __self.lastScore = new cc.Sprite();
                        __scoreS.setAnchorPoint(0.5, 0.5);
	                    __scoreS.setPosition(__size.width / 2, __size.height / 2 + 80);
	                    __scoreS.setOpacity(0);
	                    __self.addChild(__scoreS);
                    __self.score += 2;
                    var __score = __self.formatScore(__self.score);
                    //
                    for(var i = 0; i < 3; i++){
                    	var __arr = [s_zero, s_one, s_two, s_three, s_four, s_five, s_six, s_seven, s_eight, s_nine];
                    	var __str = __score.split("");
                    	var __sss = __arr[parseInt(__str[i])];
                    	var __scoreN = new cc.Sprite(__sss);
                    	if(i==0){
                    		__scoreN.setPosition(-100, 0);
                    	}else if(i==2){
                    		__scoreN.setPosition(100, 0);
        				}
                        if(__self.scoreSize(__self.score) == 1){
                            __scoreS.x = __size.width / 2 - 100;
                        }else if(__self.scoreSize(__self.score) == 2){
                            __scoreS.x = __size.width / 2 - 50;
                        }
	                    __scoreN.setScale(0.8);
                        if(__sss != "0.png" || i == 2 || __self.score > 99){
                            __scoreS.addChild(__scoreN);
                        }
	                    
                    }
                var __actionTips1 = cc.sequence(cc.spawn(new cc.FadeIn(0.5) ), new cc.FadeOut(0.5), cc.callFunc(function(){
                    if(__self.lastScore){
	            		__self.lastScore.removeFromParent(!0);
	            	}
                }, this));
                __scoreS.runAction(__actionTips1);
                window.BG.setTexture(s_bgA);
                //
                var _bot = event._userData;
                //4
                __self.goldLight.x = _bot.x + __self.OFFSETX[_bot.mix - 1];
                __self.goldLight.y = _bot.y + __self.OFFSETY[_bot.mix - 1];

                __self.goldLight.setRotation(__self.ROTATE[_bot.mix - 1]);
                __self.goldLight.setOpacity(255);
                var __actionTips4 = cc.sequence( new cc.FadeOut(0.5));
                __self.goldLight.runAction(__actionTips4);
                
                var __actionTips3 = cc.sequence( cc.delayTime(0.3), cc.callFunc(function(){
                    window.BG.setTexture(s_bg);
                }, this));
                window.BG.runAction(__actionTips3);
                //good 飘起
                var __good = new cc.Sprite(s_good);
                    __good.setAnchorPoint(0.5, 0.5);
                    __good.setPosition(__self.MISSPOS[event._userData.mix - 1].x, __self.MISSPOS[event._userData.mix - 1].y);
                    __good.setOpacity(0);
                    __self.addChild(__good);
                var __actionTips6 = cc.sequence(cc.spawn(cc.moveTo(0.5, {x:__good.x, y: __good.y + 70}), new cc.FadeIn(0.5)),  cc.DelayTime.create(.5), new cc.FadeOut(0.3), cc.callFunc(function(){
                    __good.removeFromParent(!0);
                    event._userData.removeFromParent(!0);
                }, this));
                __good.runAction(__actionTips6);
            }
        });
        cc.eventManager.addListener(this.mListener1, 1);
        cc.eventManager.addListener(this.mListener2, 1);
        this.schedule(this.updateTime, 0.2);
        //this.schedule(this.checkTime, 1);
    }, 
    scoreSize: function(score){
        if(score < 10){
            return 1;
        }else if(score < 100){
            return 2;
        }else{
            3;
        }
    },
    formatScore: function(score){
        score = score.toString();
        var __s = score.split("");
        var __result = 0;
        if(__s.length >= 3){
            __result = score;
        }else if(__s.length == 2){
            __result = "0" + score;
        }else if(__s.length == 1){
            __result = "00" + score;
        }else{
            __result = "000";
        }
        return __result;
    }
});