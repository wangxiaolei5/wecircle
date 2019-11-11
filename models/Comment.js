/**
 * Created by wangxiaolei on 2019/10/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    content: String,
    post:{type:Schema.Types.ObjectId, ref:'Post', require:true},
    user:{type:Schema.Types.ObjectId, ref:'User', required:true},
    create:{type: Date, default:Date.now},
    update:{type:Date, default:Date.now}
},{timeStamp:{createdAt:'create',updatedAt:'update'}});

module.exports = mongoose.model('Comment', CommentSchema);