/**
 * Created by wangxiaolei on 2019/10/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new mongoose.Schema({
    post:{type: Schema.Types.ObjectId, ref:'Post', required: true},
    user:{type: Schema.Types.ObjectId, ref:'User', required: true},
    create:{type: Date,default: Date.now},
    update:{type: Date,default: Date.now}
},{timeStamp:{createdAt:'create',updatedAt:'update'}})

LikeSchema.index({user:1,post:1},{unique:true});

module.exports = mongoose.model('like',LikeSchema)