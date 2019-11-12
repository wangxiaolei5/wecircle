var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var tokenUtil = require('./util/token');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var likecommentRouter = require('./routes/likecomment');
var messageRouter = require('./routes/message');
var app = express();
// app.get('/', function(req,res){
//     res.sendFile(__dirname + '/public/index.html')
// });
var mongoose = require('mongoose');
// 开启数据库连接
mongoose.connect('mongodb://127.0.0.1:27017/wecircle',{ useNewUrlParser: true ,useCreateIndex: true})
    .then(function(){
        console.log('数据库wecircle连接成功');
    })
    .catch(function(error){
        console.log('数据库wecircle连接失败：' + error);
    });
//跨域配置 本地调试使用
app.use(function(req, res, next){
    res.header("Access-Control-Allow-origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept, wec-access-token, Set-Cookie");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})
//app.use 是Express 拦截器的方法
app.use(function(req, res, next){
    var token = req.headers['wec-access-token'] || 'xx';
    var user = tokenUtil.checkToken({token});
    if(user) {
        //将当前的用户信息挂在req对象上，方便后面的路由方法使用
        req.user = user;
        tokenUtil.setToken({user,res});
        next();
    } else {
        if (config.tokenApi.join(',').indexOf(req.path) < 0) {
            next();
            return;
        }
        res.json({code:1000, message:'无效的token.'})
    }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/likecomment', likecommentRouter);
app.use('/message', messageRouter.router);
module.exports = app;
