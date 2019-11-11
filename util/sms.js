/**
 * Created by wangxiaolei on 2019/9/26.
 */
var Core = require('@alicloud/pop-core');
var config = require('../config');

//创建请求client实例
var client = new Core({
    accessKeyId:config.accessKeyId,//accessKeyId
    accessKeySecret: config.accessKeySecret,//accessKeySecret，请各位使用自己的accessKeySecret
    endpoint: 'https://dysmsapi.aliyuncs.com',//固定写死即可
    apiVersion: '2017-05-25'//固定写死即可
});

var SignName = 'vuewecircle';
var TemplateCode = 'SMS_175573853';

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var getFormatedDate = function() {
    var date = new Date();
    var formatedDate = date.Format("yyyy-MM-dd").replace(/-/g,'');
    // console.log(date.Format("yyyy-MM-dd"))
    return formatedDate;
}

var diffRange = 1000 * 60 * 1; // 1分钟过期

var pattern = /\d{6}/;

module.exports = {
    /*
     * 发送手机验证码
     */
    sendSms(data,succ,fail){
        //随机获取6位数字
        var s2msCode = "";

        for(var i = 0; i < 6; i++) {
            s2msCode += Math.floor(Math.random() * 10);
        }

        var params = {
            PhoneNumbers:data.phonenum,//需要发送的手机号
            SignName: SignName,//短信签名名称
            TemplateCode: TemplateCode,//模板code字符串
            TemplateParam:`{"code":${s2msCode}}`//生成的随机数
        }

        var requestOption = {
            method: 'POST'
        };

        //apiKey是SendSms
        client.request('SendSms', params, requestOption).then((result) => {
            console.log(result);
            succ && succ(result)
        }, function(ex) {
            console.log(ex);
            fail && fail(ex)
        })
    },
    /*
     * 查看已经发送的验证码
     */
    checkCode(data,succ,fail){
        console.log("data===")
        console.log(params)
        var params = {
            PhoneNumber: data.phonenum,//需要验证的手机号 phonenum
            SendDate: getFormatedDate(),//短信发送日期，支持查询最近30天的记录。格式为yyyyMMdd，例如20181225
            PageSize: 40,//指定每页显示的短信记录数量
            CurrentPage:1//指定发送记录的的当前页码
        }
        console.log(params)
        var requestOption = {
            method: 'POST'
        };
        //apiKey是QuerySendDetails
        client.request('QuerySendDetails', params, requestOption).then((result) => {

            if (result.Code === 'OK') {
                console.log("alimns)=== OK")
                var detail = result.SmsSendDetailDTOs.SmsSendDetailDTO[0] || {};
                console.log(detail)
                console.log(new Date())
                console.log(new Date(detail.ReceiveDate))
                console.log(new Date() - new Date(detail.ReceiveDate))
                //只筛选1分钟以内的数据
                if ((new Date() - new Date(detail.ReceiveDate)) < diffRange) {
                    //校验查询到的第一条最新的数据，使用正则表达式match到验证码，和用户输入传进来的验证码进行比对
                    if (detail.Content.match(pattern)[0] && (detail.Content.match(pattern)[0] === data.code)) {
                        succ && succ({
                            code:0,
                            msg:'验证成功'
                        })
                    } else {//否则就校验失败
                        fail && fail({
                            code:1,
                            msg:'短信验证失败'
                        });
                    }
                } else {//校验失败,验证码过期
                    fail && fail({
                        code:1,
                        msg:'短信验证失败'
                    });
                }
            } else {//否则就校验失败
                console.log("alimns)=== NOT OK")
                fail && fail({
                    code:1,
                    msg:'短信验证失败'
                });
            }
        }, (ex) => {//api接口调用失败兼容
            console.log(ex);
            fail && fail({
                code:1,
                msg:'短信验证失败'
            })
        })
    }
};