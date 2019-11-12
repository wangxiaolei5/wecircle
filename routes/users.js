var express = require("express");
var router = express.Router();
var sms = require("../util/sms");
var User = require("../models/User");
var config = require('../config');
var token = require('../util/token');
var rateLimit = require("express-rate-limit");
/*
* 验证码请求限制调用频率同一个ip 1分钟调用最多1次
* */
/*
* 创建一个用户
* */
var createUser = function(data) {
    var nickname = "用户" + Date.now();
    var avatar = config.uploadPath + "avatar/avatar" + Math.ceil(Math.random() * 9) + ".jpg";
    var bg = config.uploadPath + "bg/topbg" + Math.ceil(Math.random() * 4) + ".jpg";
    var gender = '1'
    return User.create({
        nickname: nickname,
        avatar: avatar,
        gender: gender,
        bgurl:bg,
        phoneNum: data.phonenum
    })
}
/*
* 根据手机号判断是新用户还是老用户
* */
var checkUser = function(data) {
    return User.findOne({phoneNum:data.phonenum}).exec();
}
/*
* 验证码请求限制调用频率同一个ip 1分钟调用最多1次
* */
var phonecodeLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //分钟调用1次
    max: 1, //1分钟调用1次
    handler:function (req, res, next) {
        res.json({
            code: 1,
            msg: "请稍后请求"
        })
    }
})
router.get('/phonecode', phonecodeLimiter, (req, res, next)=> {
    if(req.headers.referer) {
        console.log('req.headers.referer')
        if(req.headers.referer.indexOf('http://118.178.87.147')> -1||req.headers.referer.indexOf('http://192.168.10.221')> -1) {

        } else {
            res.json({
                code:1,
                msg:"非法请求"
            })
            return
        }
    } else {
        res.json({
            code:1,
            msg:"非法请求"
        })
        return
    }
    sms.sendSms({phonenum: req.query.phoneNum},function(result){
        res.json({
            code: 0,
            data: result
        })
    },function(result){
        res.json({
            code:1,
            data:result
        })
    })

});
/*
* 根据id获取个人信息
* */
router.get('/userinfo',async (req,res,next)=> {
  try {
      var user = await User.findById(req.query.userId).exec();
      res.json({
          code: 0,
          data: user
      })
  }  catch(e) {
      res.json({
          code:1,
          data:e
      })
  }
})
router.post('/update', async (req, res, next) => {
    try {
        var user = await User.findByIdAndUpdate(req.user._id, req.body).exec();
        res.json({
            code: 0,
            data: user
        })
    } catch(e) {
        res.json({
            code: 1,
            data: e
        })
    }
})
/*
* 获取验证码图片
* */
router.get('/capcha', (req,res) => {
    var captcha = svgCapcha.create({
        ignoreChars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        noise: 2
    })
    res.cookie('captcha',captcha.text, {
        maxAge: 60 * 1000 * 30,
        httpOnly: true
    })
    res.type('svg');
    res.status(200).send(captcha.data);
})
var signupLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    skip: function(req, res) {
        return req.cookies.captcha ? true : false;
    },
    handler: function(req,res,next) {
        res.json({
            code: 0,
            data:{
                code: 'needCaptcha'
            }
        })
    }
});
/*
* 注册/登录
* */
router.post('/signup',signupLimiter,async (req, res, next) => {
    //如果cookie里有验证码，证明此次登录请求是需要验证码
    if(req.cookies.captcha) {
        //如果没有输入验证码，返回前端需要输入验证码
        if(!req.body.captcha) {
            res.json({
                code: 0,
                data: {
                  code: 'needCaptcha'
                }
            })
            return
        }
        if(req.body.captcha.toLocaleLowerCase() !== req.cookies.capcha.toLocaleLowerCase()) {
            res.json({
                code: 1,
                msg: "验证码错误"
            })
            return
        } else {
            res.clearCookie('capcha')
        }

    }
    sms.checkCode({phonenum: req.body.phonenum,code:req.body.code},async function(result) {
        if(result.code === 0) {
            //是否是已经存在的用户
            var user = await checkUser(req.body);
            //没有的话创建一个新的用户
            if (!user) {
             user = await createUser(req.body)
            }
            //将用户数据设置在cookie里面
            token.setToken({user,res});
            //返回当前用户数据
            res.json({
                code:0,
                data:user
            })
        } else {
            //验证码值不合法返回错误信息
            res.json({
                code: 1,
                data: result.msg,
                msg: result.msg
            })
        }
    },function(result) {
        //验证码值不合法返回错误信息
        res.json({
            code: 1,
            data: result.msg,
            msg: result.msg
        })
    })


})
router.post('/addsubscription',async (req, res, next) => {
    var userid = req.user ? req.user._id: '';
    try {
        var result =  await Subscription.create({
            subscription: req.body.subscription,
            userid:userid
        })
        res.json({
            code: 0,
            data: result
        })
    } catch(e) {
        res.json({
            code: 0,
            data: e.errmsg.indexOf('dup key') ? 'has scription' : e.errmsg
        })
    }
})

module.exports = router;