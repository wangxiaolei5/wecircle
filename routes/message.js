/**
 * Created by wangxiaolei on 2019/11/5.
 */
var express = require('express')
var router = express.Router();
var User = require('../models/User')
var Message = require('../models/Message')
var Chat = require('../models/Chat')
var push = require('../util/push')
var socket = require('../util/socket')

var getMsgByChat = async function(chat,keyword){
    var reg = new RegExp(keyword, 'i')
    var list = [];
    if(keyword) {
        var list = await Message.find({
             chat: chat._id,
            'content.type': 'str',
            'content.value': {
                 $regex: reg
            }
        }).sort({'create': -1}).exec();
    } else {
        var list = await Message.find({
            chat: chat._id
        }).sort({'create': -1}).exec()
    }
    return list[0] || false
}
var addmsg = async function(myId, content, toUserId) {
    var chatId = '';
    //首先需要查询是否已经有过聊天
    var list = await Chat.find({
        $or:[
            { $and: [{fromUser: myId}, {toUser: toUserId}]},
            { $and: [{fromUser: toUserId}, {toUser: myId}]}
        ]
    }).sort({'create':1}).exec()
    //如果有就把chatId记录下来
    if(list.length) {
        chatId = list[0]._id
    } else { //如果没有就创建一个
        var chat = await Chat.create({
            params:{
                users:[myId, toUserId]
            },
            fromUser: myId,
            toUser: toUserId
        })
        chatId = chat._id
    }
    //添加一条消息
    var result = await Message.create({
        content: content,
        fromUser: myId,
        chat: chatId,
        toUser: toUserId
    })
//    更新chat的最后一条消息时间
    var updateChat = await Chat.findByIdAndUpdate(chatId, {
        lastMsgTime: result.create
    }).exec()

    return result
}
//发送消息接口
router.post('/addmsg', async (req, res, next) => {
    //当前登录用户的id
    var myId = req.user._id;
    //发送内容
    var content = req.body.content;
    //接受者id
    var toUserId = req.body.toUser;
    try {
        var result = await addmsg(myId, content, toUserId);
        console.log("result===");
        console.log(result);
        // 消息创建成功
        if (result._id) {
        //    消息通知逻辑
            if (result.content.type === 'str') {
                push(result.toUser, {title:'收到新消息', body: result.content.value})
            } else {
                push(result.toUser,{title:'收到新消息',body:'[图片]'})
            }
            //把用户详细查询出来
            var user = await User.findById(result.fromUser).exec();
            //socket 实时消息
            socket.sendMsg({
                id: toUserId,
                action:'recieveMsg',
                data:{
                    content: result.content,
                    fromUser: user,
                    toUser: toUserId
                }
            })
        }

        res.json({
            code: 0,
            data: result
        })
    } catch(e) {
        res.json({
            code: 1,
            data: e
        })
    }
})

//查询私信列表接口
router.get('/getchatlist', async (req, res, next) => {
    try {
        var myId = req.user._id;
        var keyword = req.query.keyword || '';
        var list = await Chat.find({
            $or:[
            { fromUser: myId},
            { toUser: myId}]
        }).populate('fromUser').populate('toUser').sort({'lastMsgTime': -1}).exec()
        var result = [];

        for(var i = 0; i < list.length; i++){
            var chat = JSON.parse(JSON.stringify(list[i]));
            chat.msg = await getMsgByChat(list[i],keyword);
            if (chat.msg) {
                var user = {}
                if(chat.toUser._id == myId){
                    user = chat.fromUser
                } else {
                    user = chat.toUser
                }
                chat.user = user
                result.push(chat)
            }
        }
        res.json({
            code: 0,
            data: result
        })
    } catch(e) {
        res.json({
            code: 1,
            data: e
        })
    }
})
router.get('/getchathistory', async (req, res, next) => {
    try {
        var myId = req.user._id
        var list = await Message.find({
            $or:[
                {$and:[{fromUser: myId},{toUser:req.query.toUser}]},
                {$and:[{fromUser: req.query.toUser},{toUser:myId}]}
            ]
        }).populate('fromUser').sort({'create': 1}).exec()
        var result = [];
        for (var i = 0; i < list.length; i++) {
            var msg = JSON.parse(JSON.stringify(list[i]))
            if(req.user._id == msg.fromUser._id) {
                msg.mine = true
            } else{
                msg.mine = false
            }
            result.push(msg)
        }
        res.json({
            code: 0,
            data: result
        })
    } catch(e){
        res.json({
            code: 1,
            data: e
        })
    }

})

module.exports = {
    router: router,
    addmsg: addmsg
}