/**
 * Created by wangxiaolei on 2019/11/5.
 */
var socketPoll = {};//存储当前聊天用户的池子
module.exports = {
    setSocket(socket) {
        //用户进入聊天页面代表登录
        socket.on('login', function (obj) {
            console.log('用户' + obj._id + '进入聊天页面')
            socketPoll[obj._id] = socket;
        })
        //用户离开聊天页面代表登出
        socket.on('loginout', function (obj) {
            console.log('用户' + obj._id + '离开聊天页面')
            delete socketPoll[obj._id];
        })
    },
    sendMsg(obj) {
        var currentSocket = socketPoll[obj.id];
        console.log('向客户端推送信息');
        if(currentSocket) {
            currentSocket.emit(obj.action, obj.data)
        }
    }
}