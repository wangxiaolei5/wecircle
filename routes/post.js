/**
 * Created by wangxiaolei on 2019/10/23.
 */
var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var config = require('../config');
var Post = require('../models/Post.js');
var Comment = require('../models/Comment.js');
var Like = require('../models/Like.js');
var push = require('../util/push')

var storageMemory = multer.memoryStorage()
var storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/upload/'))
    },
    filename: function (req, file, cb){
        var extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
})

var upload = multer({storage: storage});
var sizeOf = require('image-size');
//根据post查询评论数据
var getCommentByPost = async function(post) {
    return Comment.find({post:post._id}).populate('user').sort({'create':1}).exec()
}
//根据post查询点赞数据
var getLikeByPost = async function(post) {
    return Like.find({post:post._id}).populate('user').sort({'create':1}).exec()
}
//根据post是否被当前用户点赞
var checkPostIsLike = function(likes, currentUserId) {
    if(!currentUserId) return false
    var flag = false;
    for(var i = 0; i < likes.length; i++) {
        if(likes[i].user._id == currentUserId._id) {
            flag = true;
            break;
        }
    }
    return flag;
}
router.post('/uploadimgaliyun',upload.single('image'),async function(req, res, next){
    const OSS = require('ali-oss');
    const client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: config.accessKeyId,//accessKeyId
        accessKeySecret: config.accessKeySecret,//accessKeySecret，请各位使用自己的accessKeySecret
        bucket:'vuewecircle'
    })
    //从请求中得到文件数据
    var file = req.file;
    //得到图片尺寸
    var dimensions = sizeOf(file.path);
    //调用阿里云接口上传
    let result = await client.put(file.filename, file.path);
    //返回数据
    res.json({
        code: 0,
        data:{
            url: result.url.replace('http:', ''),
            size: dimensions
        }
    })
    //删除临时图片文件
    fs.unlinkSync(file.path)
})
/*
* 本地图片上传
* */
router.post('/uploadimg',upload.single('image'),function(req, res, next) {
    var file = req.file
    var dimensions = sizeOf(file.path)
    res.json({
        code: 0,
        data:{
            url: config.uploadPath + file.filename,
            size: dimensions
        }
    })
})
/*
 * 创建朋友圈post
 */
router.post('/savepost',async function(req,res,next) {
    var userid = req.user._id;
    var p = {
        content: req.body.content,
        picList: req.body.picList,
        user: userid
    };
    try {
        var result = await Post.create(p);
        res.json({
            code: 0,
            data: result
        })
    }catch(e) {
        res.json({
            code: 1,
            data: e
        })
    }

})
/*
* 获取朋友圈列表数据
* */
router.get('/getcirclepost',async function(req,res,next){
    var  pageSize = 5;
    var pageStart = req.query.pageStart || 0;

    var posts = await Post.find().skip(pageStart * pageSize).limit(pageSize).populate('user').sort({'create': -1}).exec();

    var result = [];
    for(var i = 0; i< posts.length; i++) {
        //根据post查comments
        var comments = await getCommentByPost(posts[i]);
        //根据post查likes
        var likes = await getLikeByPost(posts[i]);
        //这里对数据做一次拷贝，否则无法直接给数据添加字段
        var post = JSON.parse(JSON.stringify(posts[i]));
        post.comments = comments || [];
        post.likes = likes || [];
        //判断是否点过赞
        post.isLike = checkPostIsLike(likes, req.user);
        result.push(post)
    }
    res.json({
        code: 0,
        data: result
    })
})

module.exports = router
