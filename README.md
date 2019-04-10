# Merak-Gateway开发手册

标签（空格分隔）： 网关文档,Merak,API
# 修订记录

|Date|By|Reason|
------|-----|-----
2018-03-08|屠晖|文档创建

---

# 1.Merak API网关简介

API网关作为整体系统开发的重要桥梁存在，是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。通过程序的API化可以进行高速效率的敏捷开发。

本Merak 网关框架的特点:
1.请求参数符合行业标准和亚马逊AWS,阿里云，Ucloud，京东云等云计算公司的API格式无缝兼容，适用于云平台和运维平台的API 格式，RPC方式。
2.公私钥非对称加密，安全级别高，并且可以进行权限认证
3.能进行进程级别的横向扩展
4.自动生成文档，单个文件就是一个控制器，能进行高速迭代开发
5.使用NODEJS编写，前端人员也能方便的读懂代码
6.本身具备CORS跨域功能
7.同步书写代码，实现异步高速请求，每秒可以处理2100多个请求
8.简单易用的业务逻辑编码方法,程序员只需要关心input入参，通过入参处理业务逻辑，之后进行output返回即可
9.方便进行问题最终，每个请求都会返回一个唯一的Request ID,此ID将记录整个流程的生命周期
10.另外还有Python Flask版 RPC 模式 GATEWAY FrameWrok


# 1.API请求结构
|Name|Description|Notes
--|
API调用地址|调用API的webservice入口|http://api.uap.sse.com.cn
公共参数|调用API时需要给出的公共参数|参见公共参数列表
API指令|即API指令名称，如:GetEzeiPubTopicMinutes|参见API指令列表
指令参数|执行每个指令时所需要提供的参数|参见API指令列表

范例:
下面是一个API请求示例，所调用的是DescribeDockerInstance指令。

```bash
http://api.uap.sse.com.cn/?Action=GetEzeiPubTopicMinutes
&ProjectId=1
&Contianers=caxsjkdhz123&Offset=0
&Limit=20  
&Signature=2697152c34abbc148a38a33c0dc0d3d7b99ce82f
&PublicKey=ssesomeone@example.com1296235120854146120
```

# 2.公共参数
公共参数是在操作所有 API 的时候，都必需给出的参数。
|参数名|必选|参数类型|说明
---|
Action|true|String|对应的API名称，如GetEzeiPubTopicMinutes
PublicKey|true|String|用户公钥
Signature|true|String|根据公钥及API指令生成的用户签名，参见签名算法
ProjectId|true|String|项目ID,为空时则为默认项目

# 3 返回结构
```js
{
     "Action" : "DescribeDockerInstanceResponse",
     "TotalCount" : 1,
     "RetCode" : 0,
     "Sets" : [
         {
             "State":"Running",
             "CreateTime":1234567890,
             "ChargeType":"Dynamic",
             "ExpireTime":1398328902,
             "CPU":2,
             "Memory":2048,
             "DiskSet":[
                 {
                     "Type": "Boot",
                     "DIskId": "209883a7-aaee-4492-974d-5d9d64ef79c4",
                     "Drive": "/dev/sda",
                     "Size": 20
                 },
                 {
                     "Type": "Data",
                     "DIskId": "5daef46a-63e6-40c2-8d0a-d3d5b3bc4d5b",
                     "Drive": "/dev/sdb",
                     "Size": 40
                 } ]
         }
     ]
 }
```

**note**
请使用您的PublicKey与Signature参数值替换这里的参数值。

# 4.请求方式
## 4.1 第一步 在生成API请求中的签名(Signature)时，需要提供账户中的PublicKey和PrivateKey，本例中假设:
PublicKey  = 'ssesomeone@example.com1296235120854146120'
PrivateKey = '46f09bb9fab4f12dfc160dae12273d5332b5debe'

* 将请求参数按照名进行升序排列

```js
{ 
    "Action"     :  "CreateUHostInstance",
    "ChargeType" :  "Month",
    "CPU"        :  2,
    "DiskSpace"  :  10,
    "ImageId"    :  "f43736e1-65a5-4bea-ad2e-8a46e18883c2", 
    "LoginMode"  :  "Password",
    "Memory"     :  2048,
    "Name"       :  "Host01",
    "Password"   :  "VUNsb3VkLmNu",
    "PublicKey"  :  "ssesomeone@example.com1296235120854146120",
    "Quantity"   :  1,
    "Region"     :  "cn-bj2"
    "Zone"       :  "cn-bj2-04"
}
```
## 4.2 第二步 对排序后的请求参数进行URL编码
```js
{ 
    "Action"     :  "CreateUHostInstance",
    "ChargeType" :  "Month",
    "CPU"        :  2,
    "DiskSpace"  :  10,
    "ImageId"    :  "f43736e1-65a5-4bea-ad2e-8a46e18883c2", 
    "LoginMode"  :  "Password",
    "Memory"     :  2048,
    "Name"       :  "Host01",
    "Password"   :  "VUNsb3VkLmNu",
    "PublicKey"  :  "ssesomeone@example.com1296235120854146120",
    "Quantity"   :  1,
    "Region"     :  "cn-bj2"
    "Zone"       :  "cn-bj2-04"
}
```

## 4.3 第三步 构造HTTP请求,参数名和参数值之间用 "=" 连接，参数和参数之间用"&"号连接，构造的URL请求为:

```js
http://api.uap.sse.com.cn/?Action=CreateUHostInstance
&CPU=2
&ChargeType=Month
&DiskSpace=10
&ImageId=f43736e1-65a5-4bea-ad2e-8a46e18883c2
&LoginMode=Password
&Memory=2048
&Name=Host01
&Password=VUNsb3VkLmNu
&PublicKey=ssesomeone@example.com1296235120854146120&Quantity=1
&Region=cn-bj2
&Zone=cn-bj2-04
```


## 4.4 第四步 被签名串的构造规则为: 被签名串 = 所有请求参数拼接(无需HTTP转义)。并在本签名串的结尾拼接API密钥的私钥（PrivateKey）。

ActionCreateUHostInstanceCPU2ChargeTypeMonthDiskSpace10ImageIdf43736e1-65a5-4bea-ad2e-8a46e18883c2LoginModePasswordMemory2048NameHost01PasswordVUNsb3VkLmNuPublicKeyssesomeone@example.com1296235120854146120Quantity1Regioncn-bj2Zonecn-bj2-0446f09bb9fab4f12dfc160dae12273d5332b5debe

## 4.5 举例:Python SDK源码
生成被签名串的 SHA1 签名，即是请求参数”Signature”的值。
按照上述算法，本例中，计算出的Signature为 4f9ef5df2abab2c6fccd1e9515cb7e2df8c6bb65 。

```python
import hashlib
import urlparse
import urllib
 
def _verfy_ac(private_key, params):
    items=params.items()
    # 请求参数串
    items.sort()
    # 将参数串排序
 
    params_data = "";
    for key, value in items:
        params_data = params_data + str(key) + str(value)
    params_data = params_data + private_key
 
    sign = hashlib.sha1()
    sign.update(params_data)
    signature = sign.hexdigest()
 
    return signature
    # 生成的Signature值
```

## 4.6 请求举例
将签名参数附在原有请求串的最后面。最终的HTTP请求串为(为了查看方便，我们人为地将参数之间用回车分隔开)

```bash
Action=CreateUHostInstance
&CPU=2
&ChargeType=Month
&DiskSpace=10
&ImageId=f43736e1-65a5-4bea-ad2e-8a46e18883c2
&LoginMode=Password
&Memory=2048
&Name=Host01
&Password=VUNsb3VkLmNu
&PublicKey=%40example.com1296235120854146120
&Quantity=1
&Region=cn-bj2
&Zone=cn-bj2-04
&Signature=4f9ef5df2abab2c6fccd1e9515cb7e2df8c6bb65
```

# 5.开发方式
```js
'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var fibers = require("fibers")
var _ = require("underscore")
const util = require('util')
var redis_conn = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function () {
        var self = this
        self.output.RetCode = 1
        self.output.Data = [0]
    }   
})

```
是的，就这些，你已经写好了一个HTTP网关控制器，返回码是 RetCode 为1,返回数据为0


# 6.API网关程序结构
API控制器部分:
.
├── ContainerList.js
├── DescribeInstance.js
└── ImageList.js

/merak/method/V1         

一个文件就是一个API Action


# 7.在线文档
![image_1bnfnv8qh8hl1f3poeluqvnha9.png-307kB][2]
通过访问http://120.26.3.87:8008/APIDOC 即可访问最新在线文档

# 8.生成文档
 
```bash
 1.npm install apidoc
 2.apidoc -i myapp/ -o apidoc/ [-t mytemple/]  
  myapp是当前工作目录下的源码目录
  apidoc用于存放生成的文档文件目录
  mytemple是自定义模板文件夹,可不指定  
  看到"success：Done" 表示生成成功,到apidoc目录下打开index.html查看生成文档
```

编辑文档文件
```js
/** 
     *  
     * @api {get} /companyst 获取公司信息 
     * @apiName 获取公司列表 
     * @apiGroup All 
     * @apiVersion 0.1.0 
     * @apiDescription 接口详细描述 
     *  
     * @apiParam {int} pageNum分页大小  
     *  
     * @apiSuccess {String} code 结果码 
     * @apiSuccess {String} msg 消息说明 
     * @apiSuccess {Object} data 分页数据封装 
     * @apiSuccess {int} data.count 总记录数 
     * @apiSuccess {Object[]} data.list 分页数据对象数组 
     * @apiSuccessExample Success-Response: 
     *  HTTP/1.1 200 OK 
     * { 
     * code:0, 
     * msg:'success', 
     * data:{} 
     *  } 
     *   
     *  @apiError All 对应<code>id</code>的用户没找到 asdfasdf  
     *  @apiErrorExample {json} Error-Response: 
     *  HTTP/1.1 404 Not Found 
     *  { 
     *   code:1, 
     *   msg:'user not found', 
     *   } 
     *    
     * @param param 
     * @return 
     * @throws Exception 
     */  
```

# 9.进程管理和扩展
## 9.1 通过Pm2来进行进程管理

|App nam||mode|pid|status|restart|uptime|cpu|mem|watching
--|--|
ezcs-fake |16|fork|2224|online|623080|18D|0%|15.3 MB|disabled
merak          | 56| fork | 14567 |online  | 421     |2D     |0%  | 59.2 MB  | disabled |
phecda_alert     |13 | fork |0     |stopped |0   | 0      | 0%  | 0 B       | disabled 






## 9.2 进程扩展
pm2 start merak -i 4 
其中4表示instance ,就是起4个实例进行Cluster

# 10.负载均衡
通过Nginx进行7层负载均衡转发

# 11.网关日志
所有日志具有如下级别:
danger
warning
info
debug


# 12 Install
npm install --registry=http://registry.npm.bilibili.co


# 13 启动
pm2 start start.json

在默认的 生产模式下，只输出danger日志，其中info日志通过会通过接口写入到Elastissearch集群中去

**查询地址:180.7.89.5:9100**


  [1]: http://static.zybuluo.com/firstsko/i7vij24tisxoblm46nhzfadh/image_1bnfq7rtt18j916ma1qrp1d81j9l9.png
  [2]: http://static.zybuluo.com/firstsko/rpeqjh5i2ey60oo6nbn3tb6j/image_1bnfnv8qh8hl1f3poeluqvnha9.png
