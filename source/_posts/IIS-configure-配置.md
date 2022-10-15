---
title: IIS configure 配置
cover: https://tva1.sinaimg.cn/large/0072Vf1pgy1foxk3pfp31j31hc0u0kas.jpg
date: 2022-10-15 21:24:06
tags: iis 
---

 HTTPError50019### HTTP Error 500.19 - Internal Server Error

overrideMode

This configuration section cannot be used at this path. This happens when the section is locked at a parent level. Locking is either by default (overrideModeDefault="Deny"), or set explicitly by a location tag with overrideMode="Deny" or the legacy allowOverride="false".

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221015212425.png)

上面的报错大概意思是允许运行过程中修改文件？？？

加上开发者特征：ASP.NET4.8就可以了

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221015212540.png)

[覆盖模式缺省和允许定义属性 (microsoft.com)](https://techcommunity.microsoft.com/t5/iis-support-blog/overridemodedefault-and-allowdefinition-attributes/ba-p/305415)

如果不希望任何人更改 IIS 中的默认文档，

This solved my error on Windows Server 2012, IIS 8.5. Should work for other versions too.

1. Go to **Server Manager**, click add **Roles and Features**
2. In the roles section choose: **Web Server**
3. Under **Security** sub-section choose everything (I excluded digest, IP restrictions and URL authorization as we don't use them)
4. Under **Application Development** choose `.NET Extensibility 4.5` and `ASP>NET 4.5`, both ISAPI entries
5. In the **Features** section choose: `NET 3.5`, `.NET 4.5`, `ASP.NET 4.5`
6. In the **Web server** section choose: `Web Server (all)`, `Management Tools (IIS Management Console and Management Service)`, `Windows`

方法：增加 `overrideModeDefault="Allow"` 显式定义

> [iis 7 - IIS complains about a locked section - how can I find out where it's locked? - Server Fault](https://serverfault.com/questions/360438/iis-complains-about-a-locked-section-how-can-i-find-out-where-its-locked)
> 
> Worked out these steps which fix the issue for me:
> 
> 1. Open IIS Manager
> 2. Click the server name in the tree on the left
> 3. Right hand pane, Management section, double click Configuration Editor
> 4. At the top, choose the section `system.webServer/security/authentication/anonymousAuthentication`
> 5. Right hand pane, click Unlock Section
> 6. At the top, choose the section `system.webServer/security/authentication/windowsAuthentication`
> 7. Right hand pane, click Unlock Section

~~看了这个大概意思是在GUI管理面板可以修改站点的配置，而不是由web.config 设定；~~

~~所以要在web.config设定是否允许修改；????~~

Configuration locking can happen at:

1. Applicationhost.config (config string: MACHINE/WEBROOT/APPHOST)

2. a Site Web.config file (MACHINE/WEBROOT/APPHOST/Web Site Name)

3. Any App web.config file that (MACHINE/WEBROOT/APPHOST/Site Name/App Name)

Locking a section (section: IIS configuration section, eg `<asp>`) lets you deny the ability to configure those settings to anyone at a lower level in the hierarchy than you.

[iis - Config Error: This configuration section cannot be used at this path - Stack Overflow](https://stackoverflow.com/questions/9794985/config-error-this-configuration-section-cannot-be-used-at-this-path)

 had the same problem. Don't remember where I found it on the web, but here is what I did:

- Click "Start button"
- in the search box, enter "Turn windows features on or off"
- in the features window, Click: "Internet Information Services"
- Click: "World Wide Web Services"
- Click: "Application Development Features"
- Check (enable) the features. I checked all but CGI.

btw, I'm using Windows 7. Many comments over the years have certified this works all the way up to Windows 10 and Server 2019, as well.

还真是要加功能；

On Windows 10 and this works for me. My project target .Net 4.8 but the IIS only has .Net 4.7, but it's not an issue

？？

Care of this [Learn IIS article](https://learn.microsoft.com/en-us/iis/manage/managing-your-configuration-settings/an-overview-of-feature-delegation-in-iis):

Using the **Feature Delegation** from the root of IIS:

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221015215743.png)

![](https://raw.githubusercontent.com/TangxinGH/picbed/master/img/picgo/20221015220040.png)

看来微软的东西太小人用，文档真的是少

下面是官方文档：

[An Overview of Feature Delegation in IIS 7.0 | Microsoft Learn](https://learn.microsoft.com/en-us/iis/manage/managing-your-configuration-settings/an-overview-of-feature-delegation-in-iis)



> 服务器管理员感兴趣的是，默认情况下，在 IIS 7.0 及更高版本上，开发人员/站点所有者可以将默认文档、目录浏览、HTTP 响应标头、HTTP 重定向、处理程序和模块的配置放入其web.config文件中。 这允许开发人员将“start.aspx”配置为其默认文档，并更改网站 URL 结构，以便所有请求 `www.contoso.com/techcareers/` 都重定向到 `www.contoso.com/careers/technical/` - 无需服务器管理员帮助。
> 
> 
> 
> 可以通过解锁更多配置来实现此目的。 例如，解锁自定义错误配置，以便开发人员可以指定重定向 `www.contoso.com/NotFound.aspx`到所有 404 个，或解锁失败的请求跟踪配置，以便开发人员可以跟踪对页面 *.axd 返回状态 500 的 500 请求。
> 
> 
> 
> 对于开发人员和站点所有者，IIS 配置无需修改元数据库。 配置更改可以直接在web.config和 ASP.NET 配置中进行。 这解决了需要为应用程序编写 MSI 以进行自定义 IIS 配置更改等问题：有一组手动说明来设置应用程序;或者，尝试记住一年后生产服务器上的应用程序的配置详细信息。



到目前为止，本文讨论了如何控制开发人员 (或内容提供程序或网站所有者) 可以在web.config文件中配置 *的内容* ，但未涵盖在解锁后 *如何* 设置配置。
