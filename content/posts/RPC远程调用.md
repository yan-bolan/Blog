+++
title = "RPC远程调用"
date = "2022-09-26 21:36:16"
slug = "56a27354"
aliases = ["/2022/09_26_56a27354.html"]
[taxonomies]
tags = ["RPC Web Services SOAP WSDL WSD"]
+++
# 历史

SOA的提出；

SOAP协议的流行；

REST风格出现；

gRPC:2015 ；

区别：

SOAP 和REST基于文本； gRPC基于二进制；

共同点：基于http应用层协议；位于网络在四层；

[IBM Documentation](https://www.ibm.com/docs/zh/radfws/9.6.1?topic=overview-web-services-standards)

# Web Service: 网页服务

Soap是一种协议：xml

为了规范协议有了XSD 约束；

xsd只是机器能识别；

提出了WSDL:人能看懂 ：相当于文档；

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220926214739.png)

# SOAP在不同的语言框架有不同的实现；

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220926215009.png)

# 应用场景

SOAP主要在安全性上，等一些特性上比REST好；应用在企业；

REST主要是互联网用户多下使用：所以是目前最流行的；

gRPC:更高的性能；

---

# [WebService基本概念及原理](https://www.cnblogs.com/jing99/p/6221122.html)

[WebService基本概念及原理 - kosamino - 博客园 (cnblogs.com)](https://www.cnblogs.com/jing99/p/6221122.html)

![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16645379779671664537977085.png)

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220930194741.png)

XML 规范可以参考[List of web service specifications - Wikipedia](https://en.wikipedia.org/wiki/List_of_web_service_specifications)全是英文；

[Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language (w3.org)](https://www.w3.org/TR/2007/REC-wsdl20-20070626/#component_model)

[World Wide Web Consortium (W3C)](https://www.w3.org/)

[ASP.NET WebService(二)_三種存取方式介紹_webmethod屬性大致介紹 (coolmandiary.blogspot.com)](https://coolmandiary.blogspot.com/2020/10/aspnet-webservice.html)

```csharp
    [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MESJITAPPlyMaterial(string JITDataJson) {
            Spec_MESJIT_L1 Spec_MESJIT_L1 = new Spec_MESJIT_L1();
            Spec_MESJIT_Response Spec_MESJIT_Response = new Spec_MESJIT_Response();

            #region 將收到的Json字串反序列化，轉成對象

            JavaScriptSerializer js = new JavaScriptSerializer();   //實例化一個能夠序列化數據的類
            Spec_MESJIT_L1 = js.Deserialize<Spec_MESJIT_L1>(JITDataJson);

            #endregion

            Spec_MESJIT_Response.Result = "0";
            Spec_MESJIT_Response.Msg = "";

            //将对象序列化成JSON字符串
            var jss = new JavaScriptSerializer();

            return jss.Serialize(Spec_MESJIT_Response);
        }
```

![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/20220930204200.png)
