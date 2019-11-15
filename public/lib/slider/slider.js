(function(root){
	// 构造函数
	function Slider (opts) {
		 var imgWrap = document.createElement('DIV')
		 imgWrap.style.cssText = `
		 transform:translate3d(0,0,3px);
		 transition:opacity 200ms;
		 opacity:0;
		 position:fixed;
		 top:0;
		 left:0;
		 right:0;
		 bottom:0;
		 background-color:#000;
		 z-index:999;
		 `;
		 this.wrap = imgWrap
		 this.list = opts.list
		 this.idx = opts.page || 0 
		 this.init()
		 this.renderDOM()
		 this.bindDOM()
	}
	Slider.prototype.init = function () {
		this.radio = window.innerHeight / window.innerWidth
		this.scaleW = window.innerWidth + 10;
		this.scaleMax = 2
	}
	Slider.prototype.renderDOM = function () {
		var wrap = this.wrap
		var data = this.list 
		var len = data.length 

		this.outer = document.createElement('ul')
		this.outer.style.cssText = "height:100%;overflow:hidden"

		for(var i = 0; i < len; i++) {
			var li = document.createElement("li");
			li.style.cssText = "position:absolute;display:flex;align-items:center;overflow:hidden;height:100%"
			var item = data[i]
			li.style.width = window.innerWidth + 'px';
			li.style.transform = 'translate3d(' + (i - this.idx) * this.scaleW + 'px, 0, 0)'
			if (item) {
				if(item['height'] / item['width'] > this.radio) {
					li.innerHTML = '<img style="max-width:100%;max-height:100%;height:"'+ window.innerHeight+'px;margin:0 auto;" src="'+ item["img"] +'">'
				} else {
					li.innerHTML = '<img style="max-width:100%;max-height:100%;width:'+window.innerWidth+'px;margin: 0 auto;"  src="' + item['img'] + '">'
				}
			}
			this.outer.appendChild(li)
		}
		this.outer.style.cssText = 'width:' + this.scaleW + 'px;height:100%;overflow:hidden;'

		wrap.style.height = window.innerHeight + 'px'
		wrap.appendChild(this.outer)

		this.divider = document.createElement('ul');
		this.divider.style.cssText = 'position:absolute;bottom:24px;left:50%;font-size:19px;transform:translateX(-50%);color:rgb(109,109,109)'
		// 渲染分页的UI样式
		for(var k = 0; k < len; k++) {
			var dividerItem = document.createElement("li");
			dividerItem.innerText = "."
			dividerItem.style.cssText = "float:left;margin-right:5px"
			if( k === this.idx) {
				dividerItem.style.color = '#fff'
			}
			this.divider.appendChild(dividerItem)
		}
		if(len >= 2) {
			wrap.appendChild(this.divider)
		}
	}
	Slider.prototype.goIndex = function (n) {
		var idx = this.idx
		this.lis = this.outer.getElementsByTagName('li')
		var len = this.length
		var cidx
		cidx = idx + n * 1 
		if(cidx > len -1) {
			cidx = len -1
		} else if(cidx < 0) {
			cidx = 0
		}
		// 保留当前索引值
		this.idx = cidx

		// 改变过渡方式，从无动画变成有动画
		this.lis[cidx].style.transition = 'transform 0.2s ease-out'
		this.lis[cidx - 1] && (this.lis[cidx - 1].style.transition = 'transform 0.2s ease-out')
		this.lis[cidx + 1] && (this.lis[cidx + 1].style.transition = 'transform 0.2s ease-out')

		// 改变动画后所应该的位移值
		this.lis[cidx].style.transform = 'translate3d(0,0,0)'
		this.lis[cidx - 1] && (this.lis[cidx - 1].style.transform = 'translate3d(-' + this.scaleW + 'px,0,0)')
		this.lis[cidx - 1] && (this.lis[cidx - 1].style.transform = 'translate3d(-' + this.scaleW + 'px,0,0)')

		for(var i = 0; i < this.divider.children.length; i++) {
			var current = this.divider.children[i].style
			if (i === cidx) {
				current.color = '#fff'
			} else {
				current.color = 'rgb(109,109,109)'
			}
		}
	}
	Slider.prototype.bindDOM = function () {
		var self = this
		var scaleW = self.scaleW
		var outer = self.outer

		// 手指按下的处理事件
		var startHandler = function(evt) {
			self.startTime = new Date() * 1

			self.startX = evt.touches[0].pageX
			self.startY = evt.touches[0].pageY

			// 清除偏移量
			self.offsetX = 0 
			if(evt.touches.length >= 2){ //判断是否有两个点在屏幕上
				self.joinPinchScale = true;
				self.pinchStart = evt.touches;
				self.pinchScaleEnd = self.pinchScale || (self.joinDbClickScale ? self.scaleMax : 1)
			}

			if(evt.touches.length === 1) {
				self.oneTouch = true
			}
		}
		// 手指移动的处理事件
		var moveHandler = function (evt) {
			evt.preventDefault()
			var target = evt.target;

			if(target.nodeName === 'IMG') {

				if(self.joinPinchScale && evt.touches.length >= 2) {
					var now = evt.touches
					self.pinchScale = self.pinchScaleEnd * (getDistance(now[0],now[1]) / getDistance(self.pinchStart[0],self.pinchStart[1]))
					// 首先将动画暂停
					target.style.transition = 'none';
					// 通过scale设置方法系数
					target.style.transform ='scale3d(' + self.pinchScale +',' + self.pinchScale + ',1)';
					return
				} 
				if((self.joinPinchScale || self.joinDbClickScale) && self.oneTouch) { //处理双击，双指放大状态时的拖动行为
					self._offsetX = (self._offsetEndX||0) + evt.targetTouches[0].pageX - self.startX
					self._offsetY = (self._offsetEndY||0) + evt.targetTouches[0].pageY - self.startY
					// 拖动时，保持图片缩放不变，只位移
					var _scale = self.joinPinchScale ? self.pinchScale : self.scaleMax
					// 首先将动画暂停
					target.style.transition = "none"
					target.style.transform = 'scale3d(' +_scale+','+_scale + ',1) translate3d('+(self_offsetX*0.5) + 'px,' + (self._offsetY*0.5) + 'px, 0)'
					return
				}
				
			}
			//处理翻页逻辑
			if (self.oneTouch) {
				// 计算手指的偏移量
				self.offsetX = evt.targetTouches[0].pageX - self.startX
				var list = outer.getElementsByTagName('li')
				// 起始索引
				var i = self.idx - 1 
				// 结束索引
				var m = i + 3 
				for(i;i < m;i++) {
					list[i] && (list[i].style.transition = 'transform 0s ease-out')
					list[i] && (list[i].style.transform = 'translate3d(' + ((i-self.idx) * self.scaleW + self.offsetX) + 'px,0,0)')
				}
			}
		}

		// 手指抬起的处理事件
		var endHandler = function (evt) {
			var target = evt.target;
			// 标志位重置逻辑
			if(target.nodeName === 'IMG' && (self.joinDbClickScale || self.joinPinchScale)){
				self._offsetEndX = self._offsetX;
				self._offsetEndY = self._offsetY;

				if(self.pinchScale < 1) {
					target.style.transition = 'tranform .2s ease-in-out'
					target.style.transform = 'scale3d(1,1,1)'
					self.pinchScale = 1;
				}
			}
			self.oneTouch = false;
			// 翻页逻辑和动画
			// 边界就翻页值
			var boundary = scaleW / 6
			// 手指抬起的时间值
			var endTime = new Date() * 1 
			// 当手指移动时间超过300ms的时候,说明是拖动(手指始终没有离开)操作,按设定临界值位移算
			if(endTime - self.startTime > 300) {
				// 如果超过临界值，就表示要移动到下一页
				if(self.offsetX >= boundary) {
					self.goIndex('-1')
				} else if(self.offsetX < 0 && self.offsetX < -boundary) {
					self.goIndex('+1')
				} else {
					self.goIndex('0')
				}
			} else {
				if(self.offsetX > 50) {
					self.goIndex('-1')
				} else if(self.offsetX < -50) {
					self.goIndex('+1')
				} else {
					self.goIndex('0')
				}
			}
		}
		// 双击放大事件
		var dbHandler = function(evt) {
			var target = evt.target
			var d = evt
			if (target.nodeName === 'IMG') {
				if(self.joinDbClickScale || self.joinPinchScale) {
					target.style.transition = 'transform .2s ease-in-out'
					target.style.transform = 'scale3d(1,1,1)'

					self.joinDbClickScale = false
					self.joinPinchScale = false
					
					self.pinchScale = 1;
				} else {
					self.originX = d.offsetX;
					self.originY = d.offsetY;
					target.style.transition = 'transform .2s ease-in-out'
					target.style.transform = 'scale3d(' + self.scaleMax + ',' + self.scaleMax + ',1)'
					target.style.transformOriginX = self.originX + 'px'
					target.style.transformOriginY = self.originY + 'px'

					self.pinchScale  = self.scaleMax
					self.joinDbClickScale = true
				}

			}
		}
		// 单击图片，隐藏图片查看器
		var tapCloseHandler = function (evt) {
			self.wrap.style.opacity = 0
			setTimeout(function() {
				document.body.removeChild(self.wrap)
			},200)
		}
		// 采用两次点击时间来判断是单击还是双击
		var lastClickTime = 0;
		var  clickTimer
		var clkHandler = function(evt) {
			var nowTime = new Date().getTime()
			if(nowTime - lastClickTime < 230) {
				lastClickTime = 0;
				clickTimer && clearTimeout(clickTimer)
				dbHandler(evt)
			} else {
				lastClickTime = nowTime;
				clickTimer = setTimeout(function() {
				  tapCloseHandler(evt)
				},230)
			}
		}

		var getDistance = function(p1, p2) {
			var x = p2.pageX -  p1.pageX,
				y = p2.pageY -  p1.pageY;
			return Math.sqrt((x * x) + (y * y)).toFixed(2);	
		}

		document.body.appendChild(this.wrap)

		// 先将透明度设置为1，这里采用的是一个模拟FadeIn的动画
		setTimeout(function() {
			self.wrap.style.opacity = 1
		})

		outer.addEventListener('touchstart',startHandler)
		outer.addEventListener('touchmove',moveHandler)
		outer.addEventListener('touchend',endHandler)
		outer.addEventListener('click',clkHandler)
	}
	root.Slider = Slider
})(window)

window.onload = function() {
	// 阻止双指放大
	document.addEventListener('gesturestart',function(event) {
		event.preventDefault();
	})
}