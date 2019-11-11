/**
 * Created by wangxiaolei on 2019/11/5.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new mongoose.Schema({
    params: {type: Schema.Types.Mixed}, //聊天相关的参数，例如背景图片等等
    isDel:{type: Boolean, required: true, default: false},//是否删除
    lastMsgTime: {type: Date, default: Date.now},//最近一条消息的时间
    fromUser:{type:Schema.Types.ObjectId, ref:'User', required: true},
    toUser:{type:Schema.Types.ObjectId,ref:'User', required:true},
    create: {type:Date, default:Date.now},
    update:{type:Date, default:Date.now}
},{timestamp:{createdAt:'create',updatedAt:'update'}});

module.exports = mongoose.model('Chat',ChatSchema)