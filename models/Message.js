/**
 * Created by wangxiaolei on 2019/11/5.
 */
var  mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    content:{type: Schema.Types.Mixed},//聊天内容
    fromUser:{type:Schema.Types.ObjectId, ref: 'User', required: true}, //发送者
    chat: {type: Schema.Types.ObjectId, ref:'Chat',required:true},
    toUser: {type: Schema.Types.ObjectId, ref:'User', required:true},
    create: {type: Date, default: Date.now},
    update:{ type: Date,default: Date.now}
},{timestamp:{createdAt:'create', updatedAt:'update'}});

module.exports = mongoose.model('Message', MessageSchema);