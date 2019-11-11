/**
 * Created by wangxiaolei on 2019/11/1.
 */
var express = require('express');
var router = express.Router();
var Like = require('../models/Like');
var Comment = require('../models/Comment');
//点赞
router.post("/addlike",async (req, res, next) => {
    var postId = req.body.postId
    var userId = req.user._id
    try {
        var result = await Like.create({
            post: postId,
            user: userId
        });
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
//取消点赞
router.post('/removelike',async(req, res, next)=> {
    var postId = req.body.postId;
    var userId = req.user._id;
    console.log("req.user====")
    console.log(req.user)
    try {
        var result = await Like.deleteOne({
            post: postId,
            user: userId
        })
        res.json({
            code:0,
            data:result
        });
    } catch(e) {
        res.json({
            code: 1,
            data: e
        })
    }
})
//添加评论
router.post("/addcomment", async(req, res, next) => {
    var postId = req.body.postId;
    var userId = req.user._id;
    var content = req.body.content
    try {
        var result =  await Comment.create({
            post: postId,
            user: userId,
            content: content
        })
        res.json({
            code: 0,
            data: result
        })
    } catch(e) {
        console.log(e);
        res.json({
            code: 1,
            data: e
        })
    }
})
module.exports = router;