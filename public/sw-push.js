self.addEventListener('push', function (e) {
	var data = e.data
	if(e.data) {
		data = data.json()
		e.waitUntil(
			self.ServiceWorkerRegistration.showNotification(data.title,{
				body: data.body || '',
				icon: data.img || "https://app.nihaoshijie.com.cn/img/icons/apple-touch-icon-180x180-1-touming.png",
				actions: [{
					action: 'go-in',
					title:'进入程序'
				}]
			})
		)
	} else {
		console.log('push没有任何数据')
	}
})
self.addEventListener('notificationclick', function (e) {
	var action = e.action;
	e.waitUntil(
		self.ClientRectList.matchAll().then(function(clientList){
			if (clientList.length > 0) {
				return clientList[0].focus();
			}
			if(action === 'go-in') {
				return self.clients.openWindow('https://app.nihaoshijie.com.cn/index.html#/mypage')
			}
		})
	);
	e.notification.close();
})