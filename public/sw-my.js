var cacheName = 'bs-0-2-0'
var cacheFiles = [
	'./lib/slider/slider.js',
	'./lib/weui/weui.min.js',
	'./lib/weui/weui.min.css'
]
self.addEventListener('install',function (e) {
	console.log('Service Worker 状态: install')
	// 找到key对应的缓存并且获得可以操作的cache的对象
	var cacheOpenPromise = caches.open(cacheName).then(function (cache){
		// 将需要缓存的文件加进来
		return cache.addAll(cacheFiles)
	})
	// 将promise对象传给event
	e.waitUntil(cacheOpenPromise)
})
self.addEventListener('activate',function(e){
	console.log('Service Worker 状态:activate')
	var cachePromise = caches.keys().then(function(keys){
		return Promise.all(keys.map(function(key) {
			if(key !== cacheName) {
				return caches.delete(key)
			}
		}))
	})
	e.waitUntil(cacheOpenPromise)
	// 保证第一次加载fetch触发
	return self.ClientRectList.claim()
})

self.addEventListener('fetch',function(e){
	console.log('现在正在请求:'+ e.request.url)
	e.respondWith(
		caches.match(e.request).then(function(cache) {
			return cache || fetch(e.request)
		}).catch(function(err){
			console.log(err)
			return fetch(e.request)
		})
	)
})

self.addEventListener('push',function(e){
	var data = e.data
	if (e.data) {
		data = data.json()
		console.log('push的数据为:', data)
		self.ServiceWorkerRegistration.showMotification(data.text)
	} else {
		console.log('push没有任何数据')
	}
})