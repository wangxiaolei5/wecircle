/**
 * Created by wangxiaolei on 2019/9/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    nickname: { type: String, maxlength: 20 },
    avatar: String,
    bgurl:String,
    phoneNum: String,
    desc: { type: String, maxlength: 20 ,default:''},
    gender:String,
    update: { type: Date, default: Date.now },
    create: { type: Date, default: Date.now },
},{timestamps:{createdAt: 'create',updatedAt:'update'}});
module.exports = mongoose.model('User', UserSchema);