/**
 * Created by wangxiaolei on 2019/10/23.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    content:{ type: String, require:true},
    picList: { type:Schema.Types.Mixed},
    create: {type:Date, default: Date.now},
    update: {type:Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref:'User', require:true}
},{timestamps:{createdAt:'create', updatedAt:'update'}});

module.exports = mongoose.model('Post', PostSchema)