+++
title = "ASP_NET MVC"
date = "2023-03-19 12:07:26"
slug = "8d404d31"
aliases = ["/2023/03_19_8d404d31.html"]
description = "ASP.NET MVC读书笔记，梳理IIS各版本与ASP.NET请求处理管道的演进及ISAPI机制，并讲解MVC模式思想与MVP等变体。"
[taxonomies]
tags = ["aspnet", "net", "web"]
[extra]
cover = "https://picsum.photos/400"
+++
![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16791997798221679199778982.png)

当检测到某个HTTP请求时，先根据扩展名判断请求的是否是静态资源（比如.html、.img、.txt、.xml等），如果是，则直接将文件内容以HTTP回复的形式返回；如果是动态资源（比如.aspx、.asp、.php等），则通过扩展名从IIS的脚本映射（Script Map）中找到相应的ISAPI动态连接库（Dynamic Link Library，DLL）。

ISAPI（Internet Server Application Programming Interface）是一套本地的（Native）Win32 API，是IIS和其他动态Web应用或平台之间的纽带。ISAPI定义在

个动态连接库（DLL）文件中，ASP.NET ISAPI对应的DLL文件名称为aspnet_isapi.dll，我们可以在目录“%windir%\Microsoft.NET\Framework\{version no}\”中找到它。ISAPI支持ISAPI扩展（ISAPI Extension）和ISAPI筛选（ISAPI Filter），前者是真正处理HTTP请求的接口，后者则可以在HTTP请求真正被处理之前查看、修改、转发或拒绝请求，比如IIS可以利用ISAPI筛选进行请求的验证。



`C:\Windows\Microsoft.NET\Framework\v4.0.30319`





1.3.2　IIS 6.0与ASP.NET

通过上面的介绍，我们可以看出IIS 5.x至少存在着如下两个方面的不足。

●　ISAPI动态连接库被加载到InetInfo.exe进程中，它和工作进程之间是一种典型的跨进程通信方式，尽管采用命名管道，但是仍然会带来性能的瓶颈。

●　所有的ASP.NET应用运行在相同进程（aspnet_wp.exe）中的不同的应用程序域中，基于应用程序域的隔离不能从根本上解决一个应用程序对另一个程序的影响。在更多的时候，我们需要不同的Web应用运行在不同的进程中。

为了解决第一个问题，IIS 6.0将ISAPI动态连接库直接加载到工作进程中；为了解决第二个问题，引入了应用程序池<mark>（Application Pool）</mark>的机制。我们可以为一个或多个Web应用创建应用程序池，由于每一个应用程序池对应一个独立的工作进程，从而为运行在不同应用程序池中的Web应用提供基于进程的隔离级别。IIS 6.0的工作进程名称为w3wp.exe。



![](https://raw.githubusercontent.com/yan-bolan/picbed/master/img/picgo/16792041905691679204189719.png)



图1-6体现了IIS的结构和处理HTTP请求的流程。与IIS 5.x不同，W3SVC从InetInfo.exe进程脱离出来（对于IIS 6.0来说，InetInfo.exe基本上可以看作单纯的IIS管理进程），运行在另一个进程SvcHost.exe中。不过W3SVC的基本功能并没有发生变化，只是在功能的实现上作了相应的改进。与IIS 5.x一样，元数据库（Metabase）依然存在于InetInfo.exe进程中。



![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16792043985691679204398177.png)



1.3.3　IIS 7.0与ASP.NET

IIS 7.0在请求的监听和分发机制上又进行了革新性的改进，主要体现在对于Windows进程激活服务（Windows Process Activation Service，WAS）的引入，将原来（IIS 6.0）W3SVC承载的部分功能分流给了WAS。通过上面的介绍，我们知道对于IIS 6.0来说W3SVC主要承载着3大功能。

●　HTTP请求接收：接收HTTP.SYS监听到的HTTP请求。

●　配置管理：从元数据库（Metabase）中加载配置信息对相关组件进行配置。

●　进程管理：创建、回收、监控工作进程。

IIS 7.0将后两组功能实现到了WAS中，接收HTTP请求的任务依然落在W3SVC头上。WAS的引入为IIS 7.0提供了对非HTTP协议的支持。WAS通过监听器适配器接口（Listener Adapter Interface）抽象出不同协议监听器。具体来说，除了基于网络驱动的HTTP.SYS提供HTTP请求监听功能外还提供了TCP监听器、命名管道监听器和MSMQ监听器以提供基于TCP、命名管道和MSMQ传输协议的监听支持。

与此3种监听器相对的是3种监听适配器，它们提供监听器与WAS中的监听器适配器接口之间的适配。从这个意义上讲，IIS 7.0中的W3SVC更多地为HTTP.SYS起着监听适配器的作用。这3种非HTTP监听器和监听适配器定义在程序集SMHost.exe中，我们可以在目录%windir%\Microsoft.NET\Framework\v3.0\Windows Communication Foundation\中找到它们。



图1-8揭示了IIS 7.0的整体构架及整个请求处理流程。无论是从W3SVC接收到的HTTP请求，还是通过WCF提供的监听适配器接收到的请求，最终都会传递到WAS。如果相应的工作进程（或者应用程序池）尚未创建，则创建它，否则将请求分发给对应的工作进程进行后续的处理。WAS在进行请求处理过程中，通过内置的配置管理模块加载相关的配置信息，并对相关的组件进行配置。与IIS 5.x和IIS 6.0基于Metabase的配置信息存储不同的是，IIS 7.0大都将配置信息存放于XML形式的配置文件中，基本的配置存放在applicationHost.config中。



![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16792092635441679209263023.png)



![loading-ag-418]()

从另一个角度讲，IIS运行在非托管的环境中，而ASP.NET管道则是托管的，ISAPI还是连接非托管环境和托管环境的纽带。IIS 5.x和IIS 6.0把两个管道进行隔离至少带来了下面的一些局限与不足：

●　相同操作的重复执行：IIS与ASP.NET之间具有一些重复的操作，比如身份验证。

●　动态文件与静态文件处理的不一致：因为只有基于ASP.NET动态文件（比如.aspx、.asmx、.svc等）的HTTP请求才能通过ASP.NET ISAPI进入ASP.NET管道，而对于一些静态文件（比如.html、.xml、.img等）的请求则由IIS直接响应，那么ASP.NET管道中的一些功能将不能用于这些基于静态文件的请求，比如我们希望通过Forms认证应用于基于图片文件的请求就做不到。

●　IIS难以扩展：对于IIS的扩展基本上就体现在自定义ISAPI，但是对于大部分人来说，这不是一件容易的事情。因为ISAPI是基于Win32的非托管的API，并非一种面向应用的编程接口。通常我们希望的是诸如定义ASP.NET的HttpModule和HttpHandler一样，通过托管代码的方式来扩展IIS。

对于Windows平台下的IIS来讲，ASP.NET无疑是一等公民，它们之间不应该是“井水不犯河水”，而应该是“你中有我，我中有你”的关系，为此在IIS 7.0中实现了两者的集成，通过集成可以获得如下的好处。

●　允许通过本地代码（Native Code）和托管代码（Managed Code）两种方式定义IIS Module，这些IIS Module注册到IIS中形成一个通用的请求处理管道。由这些

第1章　ASP.NET+MVC

ASP.NET MVC是一个全新的Web应用框架。将术语ASP.NET MVC拆分开来，即ASP.NET+MVC，前者代表支撑该应用框架的技术平台，意味着ASP.NET MVC和传统的Web Forms应用框架一样都是建立在ASP.NET平台之上；后者则表示该框架背后的设计思想，意味着ASP.NET MVC采用了MVC架构模式。

1.1　传统MVC模式

对于大部分面向最终用户的应用来说，它们都需要具有一个可视化的UI界面与用户进行交互，我们将这个UI称为视图（View）。在早期，我们倾向于将所有与UI相关的操作糅合在一起，这些操作包括UI界面的呈现、用于交互操作的捕捉与响应、业务流程的执行以及对数据的存取，我们将这种设计模式称为自治视图（Autonomous View，AV）。

1.1.1　自治视图

说到自治视图，很多人会感到陌生，但是我们（尤其是.NET开发人员）可能经常在采用这种模式来设计我们的应用。Windows Forms和ASP.NET Web Forms虽然分别属于GUI和Web开发框架，但是它们都采用了事件驱动的开发方式，所有与UI相关的逻辑都可以定义在针对视图（Windows Forms或者Web Forms）的后台代码（Code Behind）中，并最终注册到视图本身或者视图元素（控件）的相应事件上。

一个典型的人机交互应用具有三个主要的关注点，即数据在可视化界面上的呈现、UI处理逻辑（用于处理用户交互式操作的逻辑）和业务逻辑。自治视图模式将三者混合在一起，势必会带来如下一些问题：

●　业务逻辑是与UI无关的，应该最大限度地被重用。由于业务逻辑定义在自治视图中，相当于完全与视图本身绑定在一起，如果我们能够将UI的行为抽象出来，基于抽象化UI的处理逻辑也是可以被共享的。但是定义在自治视图中的UI处理逻辑完全丧失了重用的可能。

●　业务逻辑具有最强的稳定性，UI处理逻辑次之，而可视化界面上的呈现最差（比如我们经常会为了更好地呈现效果来调整HTML）。如果将具有不同稳定性的元素融为一体，那么具有最差稳定性的元素决定了整体的稳定性，这是“短板理论”在软件设计中的体现。

●　任何涉及UI的组件都不易测试。UI是呈现给人看的，并且用于与人进行交互，用机器来模拟活生生的人来对组件实施自动化测试不是一件容易的事，自治视图严重损害了组件的可测试性。

为了解决自治视图导致的这些问题，我们需要采用关注点分离（Seperation of Concerns，SoC）的方针将可视化界面呈现、UI处理逻辑和业务逻辑三者分离出来，并且采用合理的交互方式将它们之间的依赖降到最低。将三者“分而治之”，自然也使UI逻辑和业务逻辑变得更容易测试，测试驱动设计与开发变成了可能。这里用于进行关注点分离的模式就是MVC。

1.1.2　什么是MVC模式

MVC的创建者是Trygve M. H. Reenskau，他是挪威的计算机专家，同时也是奥斯陆大学的名誉教授。MVC是他在1979年访问施乐帕克研究中心（Xerox Palo Alto Research Center，Xerox PARC）期间提出一种主要针对GUI应用的软件架构模式。MVC最初用于SmallTalk，Trygve最初对MVC的描述记录在Applications Programming in Smalltalk-80(TM):How to use Model-View-Controller (MVC)这篇论文中，有兴趣的读者可以通过地址http://st-www.cs.illinois.edu/users/smarch/st-docs/mvc.html阅读这篇论文。

MVC体现了关注点分离这一基本的设计方针，它将构成一个人机交互应用涉及的功能分为Model、Controller和View三部分，它们各自具有相应的职责。

●　Model是对应用状态和业务功能的封装，我们可以将它理解为同时包含数据和行为的领域模型（Domain Model）。Model接受Controller的请求并完成相应的业务处理，在状态改变的时候向View发出相应的通知。

●　View实现可视化界面的呈现并捕捉最终用户的交互操作（比如鼠标和键盘操作）。

●　View捕获到用户交互操作后会直接转发给Controller，后者完成相应的UI逻辑。如果需要涉及业务功能的调用，Controller会直接调用Model。在完成UI处理之后，Controller会根据需要控制原View或者创建新的View对用户交互操作予以响应。

图1-1揭示了MVC模式下Model、View和Controller之间的交互。对于传统的MVC模式，很多人认为Controller仅仅是View和Model之间的中介，实则不然，View和Model存在直接的联系。View可以直接调用Model查询其状态信息。当Model状态发生改变的时候，它也可以直接通知View。比如在一个提供股票实时价位的应用中，维护股价信息的Model在股价变化的情况下可以直接通知相关的View改变其显示信息。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00000.jpg)

图1-1　Model-View-Controller之间的交互

从消息交换模式的角度来讲，Model针对View的状态通知和View针对Controller的用户交互通知都是单向的，我们推荐采用事件机制来实现这两种类型的通知。从设计模式的角度来讲就是采用观察者（Observer）模式通过注册/订阅的方式来实现它们，即View作为Model的观察者通过注册相应的事件来检测状态的改变，而Controller作为View的观察者通过注册相应的事件来处理用户的交互操作。

我看到很多人将MVC和所谓的“三层架构”进行比较，其实两者并没有什么可比性，MVC更不是分别对应着UI、业务逻辑和数据存取三个层次，不过两者也不能说完全没有关系。Trygve M. H. Reenskau当时提出MVC的时候是将其作为构建整个GUI应用的架构模式，这种情况下的Model实际上维护着整个应用的状态并实现了所有的业务逻辑，所以它更多地体现为一个领域模型。而对于多层架构来说（比如我们经常提及的三层架构），MVC是被当成UI呈现层（Presentation Layer）的设计模式，而Model则更多地体现为访问业务层的入口（Gateway）。如果采用面向服务的设计，业务功能被定义成相应服务并通过接口（契约）的形式暴露出来，这里的Model还可以表示成进行服务调用的代理。

1.2　MVC的变体

通过采用MVC模式，我们可以将可视化UI元素的呈现、UI处理逻辑和业务逻辑分别定义在View、Controller和Model中，但是对于三者之间的交互，MVC并没有进行严格的限制。最为典型的就是允许View和Model绕开Controller进行直接交互，View可以通过调用Model获取需要呈现给用户的数据，Model也可以直接通知View让其感知到状态的变化。当我们将MVC应用于具体的项目开发中，不论是基于GUI的桌面应用还是基于Web UI的Web应用，如果不对Model、View和Controller之间的交互进行更为严格的限制，我们编写的程序可能比自治视图更加难以维护。

今天我们将MVC视为一种模式（Pattern），但是作为MVC最初提出者的Trygve M. H. Reenskau却将MVC视为一种范例（Paradigm），这可以从它在Applications Programming in Smalltalk-80(TM):How to use Model-View-Controller (MVC)中对MVC的描述可以看出来：In the MVC paradigm the user input, the modeling of the external world, and the visual feedback to the user are explicitly separated and handled by three types of object, each specialized for its task.

模式和范例的区别在于前者可以直接应用到具体的应用上，而后者则仅仅提供一些基本的指导方针。在我看来MVC是一个很宽泛的概念，任何基于Model、View和Controller对UI应用进行分解的设计都可以成为MVC。当我们采用MVC的思想来设计UI应用的时候，应该根据开发框架（比如Windows Forms、WPF和Web Forms）的特点对Model、View和Controller的界限以及相互之间的交互设置一个更为严格的规则。

在软件设计的发展历程中出现了一些MVC的变体（Varation），它们遵循定义在MVC中的基本原则，我们现在来简单地讨论一些常用的MVC变体。

1.2.1　MVP

MVP是一种广泛使用的UI架构模式，适用于基于事件驱动的应用框架，比如ASP.NET Web Forms和Windows Forms应用。MVP中的M和V分别对应于MVC的Model和View，而P（Presenter）则自然代替了MVC中的Controller。但是MVP并非仅仅体现在从Controller到Presenter的转换，更多地体现在Model、View和Presenter之间的交互上。

MVC模式中元素之间“混乱”的交互主要体现在允许View和Model绕开Controller进行单独“交流”，这在MVP模式中得到了彻底解决。如图1-2所示，能够与Model直接进行交互的仅限于Presenter，View只能通过Presenter间接地调用Model。Model的独立性在这里得到了真正的体现，它不仅仅与可视化元素的呈现（View）无关，与UI处理逻辑（Presenter）也无关。使用MVP的应用是用户驱动的而非Model驱动的，所以Model不需要主动通知View以提醒状态发生了改变。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00001.jpg)

图1-2　Model-View-Presenter之间的交互

MVP不仅仅避免了View和Model之间的耦合，更进一步地降低了Presenter对View的依赖。如图1-2所示，Presenter依赖的是一个抽象化的View，即View实现的接口IView，这带来的最直接的好处就是使定义在Presenter中的UI处理逻辑变得易于测试。由于Presenter对View的依赖行为定义在接口IView中，我们只需要Mock一个实现了该接口的View就能对Presenter进行测试。

构成MVP三要素之间的交互体现在两个方面，即View/Presenter和Presenter/Model。Presenter和Model之间的交互很清晰，仅仅体现在Presenter对Model的单向调用。而View和Presenter之间该采用怎样的交互方式是整个MVP的核心，MVP针对关注点分离的初衷能否体现在具体的应用中很大程度上取决于两者之间的交互方式是否正确。按照View和Presenter之间的交互方式以及View本身的职责范围，Martin Folwer将MVP可分为PV（Passive View）和SC（Supervising Controller）两种模式。

PV与SC

解决View难以测试的最好的办法就是让它无需测试，如果View不需要测试，其先决条件就是让它尽可能不涉及到UI处理逻辑，这就是PV模式目的所在。顾名思义，PV（Passive View）是一个被动的View，包含其中的针对UI元素（比如控件）的操作不是由View自身主动来控制，而被动地交给Presenter来操控。

如果我们纯粹地采用PV模式来设计View，意味着我们需要将View中的UI元素通过属性的形式暴露出来。具体来说，当我们在为View定义接口的时候，需要定义基于UI元素的属性使Presenter可以对View进行细粒度操作，但这并不意味着我们直接将View上的控件暴露出来。举个简单的例子，假设我们开发的HR系统中具有如图1-3所示的一个Web页面，我们通过它可以获取某个部门的员工列表。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00002.jpg)

图1-3　员工查询页面

现在通过ASP.NET Web Forms应用来设计这个页面，我们来讨论一下如果采用PV模式，View的接口该如何定义。对于Presenter来说，View供它操作的控件有两个，一个是包含所有部门列表的DropDownList，另一个则是显示员工列表的GridView。在页面加载的时候，Presenter将部门列表绑定在DropDownList上，与此同时包含所有员工的列表被绑定到GridView。当用户选择某个部门并点击“查询”按钮后，View将包含筛选部门在内的查询请求转发给Presenter，后者筛选出相应的员工列表之后将其绑定到GridView。

如果我们为该View定义一个接口IEmployeeSearchView，我们不能按照所示的代码将上述这两个控件直接以属性的形式暴露出来。针对具体控件类型的数据绑定属于View的内部细节（比如说针对部门列表的显示，我们可以选择DropDownList也可以选择ListBox），不能体现在表示用于抽象View的接口中。另外，理想情况下定义在Presenter中的UI处理逻辑应该是与具体的技术平台无关的，如果在接口中涉及控件类型，这无疑将Presenter也与具体的技术平台绑定在了一起。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00003.jpg)

正确的接口和实现该接口的View（一个Web页面）应该采用如下的定义方式。Presenter通过对属性Departments和Employees赋值进而实现对相应DropDownList和GridView的数据绑定，通过属性SelectedDepartment得到用户选择的筛选部门。为了尽可能让接口只暴露必需的信息，我们特意将对属性的读/写作了控制。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00004.jpg)

PV模式将所有的UI处理逻辑全部定义在Presenter上，意味着所有的UI处理逻辑都可以被测试，所以从可测试性的角度来这是一种不错的选择，但是它要求将View中可供操作的UI元素定义在对应的接口中，对于一些复杂的富客户端（Rich Client）View来说，接口成员将会变得很多，这无疑会提升编程所需的代码量。从另一方面来看，由于Presenter需要在控件级别对View进行细粒度的控制，这无疑会提供Presenter本身的复杂度，往往会使原本简单的逻辑复杂化，在这种情况下我们往往采用SC模式。

在SC模式下，为了降低Presenter的复杂度，我们将诸如数据绑定和格式化这样简单的UI处理逻辑转移到View中，这些处理逻辑会体现在View实现的接口中。尽管View从Presenter中接管了部分UI处理逻辑，但是Presenter依然是整个三角关系的驱动者，View被动的地位依然没有改变。对于用户作用在View上的交互操作，View本身并不进行响应，而是直接将交互请求转发给Presenter，后者在独立完成相应的处理流程（可能涉及针对Model的调用）之后会驱动View或者创建新的View作为对用户交互操作的响应。

View和Presenter交互的规则（针对SC模式）

View和Presenter之间的交互是整个MVP的核心，能否正确地应用MVP模式来架构我们的应用主要取决于能否正确地处理View和Presenter两者之间的关系。在由Model、View和Presenter组成的三角关系中，核心不是View而是Presenter，Presenter不是View调用Model的中介，而是最终决定如何响应用户交互行为的决策者。

打个比方，View是Presenter委派到前端的客户代理，而作为客户的自然就是最终的用户。对于以鼠标/键盘操作体现的交互请求应该如何处理，作为代理的View并没有决策权，所以它会将请求汇报给委托人Presenter。View向Presenter发送用户交互请求应该采用这样的口吻：“我现在将用户交互请求发送给你，你看着办，需要我的时候我会协助你”，而不应该是这样：“我现在处理用户交互请求了，我知道该怎么办，但是我需要你的支持，因为实现业务逻辑的Model只信任你”。

对于Presenter处理用户交互请求的流程，如果中间环节需要涉及到Model，它会直接发起对Model的调用。如果需要View的参与（比如需要将Model最新的状态反应在View上），Presenter会驱动View完成相应的工作。

对于绑定到View上的数据，不应该是View从Presenter上“拉”回来的，应该是Presenter主动“推”给View的。从消息流（或者消息交换模式）的角度来讲，不论是View向Presenter完成针对用户交互请求的通知，还是Presenter在进行交互请求处理过程中驱动View完成相应的UI操作，都是单向（One-Way）的。反应在应用编程接口的定义上就意味着不论是定义在Presenter中被View调用的方法，还是定义在IView接口中被Presenter调用的方法最好都没有返回值。如果不采用方法调用的形式，我们也可以通过事件注册的方式实现View和Presenter的交互，事件机制体现的消息流无疑是单向的。

View本身仅仅实现单纯的、独立的UI处理逻辑，它处理的数据应该是Presenter实时推送给它的，所以View尽可能不维护数据状态。定义在IView的接口最好只包含方法，而避免属性的定义，Presenter所需的关于View的状态应该在接收到View发送的用户交互请求的时候一次得到，而不需要通过View的属性去获取。

实例演示：SC模式的应用（S101）

为了让读者对MVP模式，尤其是该模式下的View和Presenter之间的交互方式有一个深刻的认识，我们现在来做一个简单的实例演示。本实例采用上面提及的关于员工查询的场景，并且采用ASP.NET Web Forms来建立这个简单的应用，最终呈现出来的效果如图1-3所示。前面我们已经演示了采用PV模式下的IView应该如何定义，现在我们来看看SC模式下的IView有何不同。

先来看看表示员工信息的数据类型如何定义。我们通过具有如下定义的数据类型Employee来表示一个员工。简单起见，我们仅仅定义了表示员工基本信息（ID、姓名、性别、出生日期和部门）的5个属性。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00005.jpg)

作为包含应用状态和状态操作行为的Model通过如下一个简单的EmployeeRepository类型来体现。如代码所示，表示所有员工列表的数据通过一个静态字段来维护，而GetEmployees返回指定部门的员工列表，如果没有指定筛选部门或者指定的部门字符为空，则直接返回所有的员工列表。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00006.jpg)

接下来我们来看作为View接口的IEmployeeSearchView的定义。如下面的代码片段所示，该接口定义了BindEmployees和BindDepartments两个方法，分别用于绑定基于部门列表的DropDownList和基于员工列表的GridView。除此之外，IEmployeeSearchView接口还定义了一个事件DepartmentSelected，该事件会在用户选择了筛选部门后点击“查询”按钮时触发。DepartmentSelected事件参数类型为自定义的DepartmentSelectedEventArgs，属性Department表示用户选择的部门。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00007.jpg)

作为MVP三角关系核心的Presenter通过EmployeeSearchPresenter表示。如下面的代码片段所示，表示View的只读属性类型为IEmployeeSearchView接口，而另一个只读属性Repository则表示作为Model的EmployeeRepository对象，两个属性均在构造函数中初始化。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00008.jpg)

在构造函数中我们注册了View的DepartmentSelected事件，作为事件处理器的OnDepartmentSelected方法通过调用Repository（即Model）得到了用户选择部门下的员工列表，返回的员工列表通过调用View的BindEmployees方法实现了在View上的数据绑定。在Initialize方法中，我们通过调用Repository获取所有员工的列表，并通过View的BindEmployees方法显示在界面上。作为筛选条件的部门列表通过调用View的BindDepartments方法绑定在View上。

最后我们来看看作为View的Web页面如何定义。如下所示的是作为页面主体部分的HTML，核心部分是一个用于绑定筛选部门列表的DropDownList和一个绑定员工列表的GridView。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00009.jpg)

如下所示的是该Web页面的后台代码的定义，它实现了定义在IEmployeeSearchView接口的两个方法（BindEmployees和BindDepartments）和一个事件（DepartmentSelected）。表示Presenter的同名只读属性在构造函数中被初始化。在页面加载的时候（Page_Load方法）Presenter的Initialize方法被调用，而在“查询”按钮被点击的时候（ButtonSearch_Click）事件DepartmentSelected被触发。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00010.jpg)

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00011.jpg)

1.2.2　Model 2

Trygve M. H. Reenskau当初提出的MVC是作为基于GUI的桌面应用的架构模式并不太适合Web本身的特性，虽然MVC/MVP也可以直接用于ASP.NET Web Forms应用，但这是因为微软就是基于桌面应用的编程模式来设计基于Web Forms的ASP.NET应用框架的。Web应用不同于GUI桌面应用的主要区别在于：用户是通过浏览器与应用进行交互，交互请求和响应是通过HTTP请求和响应来完成的。

为了让MVC能够为Web应用提供原生的支持，另一个被称为Model 2的MVC变体被提出来，这来源于基于Java的Web应用架构模式。Java Web应用具有两种基本的基于MVC的架构模式，分别被称为Model 1和Model 2。Model1类似于我们前面提及的自治试图模式，它将数据的可视化呈现和用户交互操作的处理逻辑合并在一起。Model 1使用于那些比较简单的Web应用，对于相对复杂的应用应该采用Model 2。

为了让开发者采用相同的编程模式进行GUI桌面应用和Web应用的开发，微软通过ViewState和Postback对HTTP请求和回复机制进行了封装，使我们能够像编写Windows Forms应用一样采用事件驱动的方式进行ASP.NET Web Forms应用的编程。而Model 2采用完全不同的设计，它让开发者直接面向Web，让他们关注HTTP的请求和响应，所以Model 2提供对Web应用原生的支持。

对于Web应用来说，和用户直接交互的UI界面由浏览器来提供，用户交互请求通过浏览器以HTTP请求的方式发送到Web服务器，服务器对请求进行相应的处理并最终返回一个HTTP回复对请求予以响应。接下来我们详细讨论作为MVC的三要素是如何相互协作最终完成对请求的响应的。图1-4所示的序列图体现了整个流程的全过程。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00012.jpg)

图1-4　Model 2交互流程

Model 2中一个HTTP请求的目标是Controller中的某个Action，后者体现为定义在Controller类型中的某个方法，所以对请求的处理最终体现在对目标Controller对象的激活和对相应Action方法的执行。一般来说，Controller的类型和Action方法的名称以及作为Action方法的部分参数（针对HTTP-GET）可以直接通过请求的URL解析出来。

如图1-4所示，我们通过一个拦截器（Interceptor）对抵达Web服务器的HTTP请求进行拦截。一般的Web应用框架都提供了这样的拦截机制，对于ASP.NET来说，我们可以通过HttpModule的形式来定义这么一个拦截器。拦截器根据请求解析出目标Controller的类型和对应的Action方法的名称，随后目标Controller被激活，相应的Action方法被执行。

在激活Controller对象的目标Action方法被执行过程中，它可以调用Model获取相应的数据或者改变其状态。在Action方法执行的最后阶段会选择相应的View，整个View被最终转换成HTML，以HTTP响应的形式返回到客户端并呈现在浏览器中。绑定在View上的数据来源于Model或者基于显示要求进行的简单逻辑计算，我们有时候将它们称为VM（View Model），即基于View的Model（这里的View Model与MVVM模式下的VM是完全不同的两个概念，后者不仅包括呈现在View中的数据，也包括数据操作行为）。

1.2.3　ASP.NETMVC与Model 2

ASP.NET MVC就是根据Model 2模式设计的。对于HTTP请求的拦截以实现对目标Controller和Action的解析是通过一个自定义HttpModule来实现的，而对目标Controller的激活则通过一个自定义HttpHandler来完成。在本章的最后我们会通过一个例子来模拟ASP.NET MVC的工作原理。

在上面我们多次强调MVC的Model是维持应用状态提供业务功能的领域模型，或者是多层架构中进入业务层的入口或者业务服务的代理，但是ASP.NET MVC中的Model还是这个Model吗？稍微了解ASP.NET MVC的读者都知道，ASP.NET MVC的Model仅仅是绑定到View上的数据而已，它和MVC模式中的Model并不是一回事。由于ASP.NET MVC中的Model是基于View的，我们可以将其称为View Model。

由于ASP.NET MVC只有View Model，所以ASP.NET MVC应用框架本身仅仅关于View和Controller，真正的Model以及Model和Controller之间的交互体现在我们如何来设计Controller。我个人觉得将用于构建ASP.NET MVC的MVC模式成为M（Model）-V（View）-VM（View Model）-C（Controller）也许更为准确。

1.3　IIS/ASP.NET管道

前面我们对MVC模式及其变体作了详细的介绍，其目的在于让读者充分地了解ASP.NET MVC框架的设计思想，接下来我们来介绍支撑ASP.NET MVC的技术平台。顾名思义，ASP.NET MVC就是建立在ASP.NET平台上基于MVC模式建立的Web应用框架，深刻理解ASP.NET MVC的前提是对ASP.NET管道式设计具有深刻的认识。由于ASP.NET Web应用总是寄宿于IIS上，所以我们将两者结合起来介绍，力求让读者完整地了解请求在IIS/ASP.NET管道中是如何流动的。由于不同版本的IIS的处理方式具有很大的差异，接下来会介绍3个主要的IIS版本各自对Web请求的不同处理方式。

1.3.1　IIS 5.x与ASP.NET

我们先来看看IIS 5.x是如何处理基于ASP.NET资源（比如.aspx、.asmx等）请求的。整个过程基本上可以通过图1-5体现。IIS 5.x运行在进程InetInfo.exe中，该进程寄宿着一个名为World Wide Web Publishing Service（简称W3SVC）的Windows服务。W3SVC的主要功能包括HTTP请求的监听、工作进程和配置管理（通过从Metabase中加载相关配置信息）等。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00013.jpg)

图1-5　IIS 5.x与ASP.NET

当检测到某个HTTP请求时，先根据扩展名判断请求的是否是静态资源（比如.html、.img、.txt、.xml等），如果是，则直接将文件内容以HTTP回复的形式返回；如果是动态资源（比如.aspx、.asp、.php等），则通过扩展名从IIS的脚本映射（Script Map）中找到相应的ISAPI动态连接库（Dynamic Link Library，DLL）。

ISAPI（Internet Server Application Programming Interface）是一套本地的（Native）Win32 API，是IIS和其他动态Web应用或平台之间的纽带。ISAPI定义在一个动态连接库（DLL）文件中，ASP.NET ISAPI对应的DLL文件名称为aspnet_isapi.dll，我们可以在目录“%windir%\Microsoft.NET\Framework\{version no}\”中找到它。ISAPI支持ISAPI扩展（ISAPI Extension）和ISAPI筛选（ISAPI Filter），前者是真正处理HTTP请求的接口，后者则可以在HTTP请求真正被处理之前查看、修改、转发或拒绝请求，比如IIS可以利用ISAPI筛选进行请求的验证。

如果我们请求的是一个基于ASP.NET的资源类型，比如.aspx、.asmx和.svc等，aspnet_isapi.dll会被加载，而ASP.NET ISAPI扩展会创建ASP.NET的工作进程（如果该进程尚未启动）。对于IIS 5.x来说，该工作进程为aspnet.exe。IIS进程与工作进程之间通过命名管道（Named Pipes）进行通信。

在工作进程初始化过程中，.NET运行时（CLR）被加载进而构建了一个托管的环境。对于某个Web应用的初次请求，CLR会为其创建一个应用程序域（Application Domain）。在应用程序域中，HTTP运行时（HTTP Runtime）被加载并用以创建相应的应用。寄宿于IIS 5.x的所有Web应用都运行在同一个进程（工作进程aspnet_wp.exe）的不同应用程序域中。

1.3.2　IIS 6.0与ASP.NET

通过上面的介绍，我们可以看出IIS 5.x至少存在着如下两个方面的不足。

●　ISAPI动态连接库被加载到InetInfo.exe进程中，它和工作进程之间是一种典型的跨进程通信方式，尽管采用命名管道，但是仍然会带来性能的瓶颈。

●　所有的ASP.NET应用运行在相同进程（aspnet_wp.exe）中的不同的应用程序域中，基于应用程序域的隔离不能从根本上解决一个应用程序对另一个程序的影响。在更多的时候，我们需要不同的Web应用运行在不同的进程中。

为了解决第一个问题，IIS 6.0将ISAPI动态连接库直接加载到工作进程中；为了解决第二个问题，引入了应用程序池（Application Pool）的机制。我们可以为一个或多个Web应用创建应用程序池，由于每一个应用程序池对应一个独立的工作进程，从而为运行在不同应用程序池中的Web应用提供基于进程的隔离级别。IIS 6.0的工作进程名称为w3wp.exe。

除了上面两点改进之外，IIS 6.0还有其他一些值得称道的地方。其中最重要的一点就是创建了一个名为HTTP.SYS的HTTP监听器。HTTP.SYS以驱动程序的形式运行在Windows的内核模式（Kernel Mode）下，它是Windows 2003的TCP/IP网络子系统的一部分，从结构上看它属于TCP之上的一个网络驱动程序。

严格地说，HTTP.SYS已经不属于IIS的范畴了，所以HTTP.SYS的配置信息也没有保存在IIS的元数据库（Metabase）中，而是定义在注册表中。HTTP.SYS的注册表项的路径为HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services/HTTP。HTTP.SYS能够带来如下的好处。

●　持续监听：由于HTTP.SYS是一个网络驱动程序，始终处于运行状态，对于用户的HTTP请求能够及时作出反应。

●　更好的稳定性：HTTP.SYS运行在操作系统内核模式下，并不执行任何用户代码，所以其本身不会受到Web应用、工作进程和IIS进程的影响。

●　内核模式下数据缓存：如果某个资源被频繁请求，HTTP.SYS会把响应的内容进行缓存，缓存的内容可以直接响应后续的请求。由于这是基于内核模式的缓存，不存在内核模式和用户模式的切换，响应速度将得到极大的改进。

图1-6体现了IIS的结构和处理HTTP请求的流程。与IIS 5.x不同，W3SVC从InetInfo.exe进程脱离出来（对于IIS 6.0来说，InetInfo.exe基本上可以看作单纯的IIS管理进程），运行在另一个进程SvcHost.exe中。不过W3SVC的基本功能并没有发生变化，只是在功能的实现上作了相应的改进。与IIS 5.x一样，元数据库（Metabase）依然存在于InetInfo.exe进程中。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00014.jpg)

图1-6　IIS 6.0与ASP.NET

当HTTP.SYS监听到用户的HTTP请求时将其分发给W3SVC，W3SVC解析出请求的URL，并根据从Metabase获取的URL与Web应用之间的映射关系得到目标应用，并进一步得到目标应用运行的应用程序池或工作进程。如果工作进程不存在（尚未创建或被回收），则为该请求创建新的工作进程。我们将工作进程的这种创建方式称为请求式创建。在工作进程的初始化过程中，相应的ISAPI动态连接库被加载。对于ASP.NET应用来说，被加载的ISAPI.dll为aspnet_isapi.dll。ASP.NET ISAPI再负责进行CLR的加载、应用程序域的创建和Web应用的初始化等操作。

1.3.3　IIS 7.0与ASP.NET

IIS 7.0在请求的监听和分发机制上又进行了革新性的改进，主要体现在对于Windows进程激活服务（Windows Process Activation Service，WAS）的引入，将原来（IIS 6.0）W3SVC承载的部分功能分流给了WAS。通过上面的介绍，我们知道对于IIS 6.0来说W3SVC主要承载着3大功能。

●　HTTP请求接收：接收HTTP.SYS监听到的HTTP请求。

●　配置管理：从元数据库（Metabase）中加载配置信息对相关组件进行配置。

●　进程管理：创建、回收、监控工作进程。

IIS 7.0将后两组功能实现到了WAS中，接收HTTP请求的任务依然落在W3SVC头上。WAS的引入为IIS 7.0提供了对非HTTP协议的支持。WAS通过监听器适配器接口（Listener Adapter Interface）抽象出不同协议监听器。具体来说，除了基于网络驱动的HTTP.SYS提供HTTP请求监听功能外还提供了TCP监听器、命名管道监听器和MSMQ监听器以提供基于TCP、命名管道和MSMQ传输协议的监听支持。

与此3种监听器相对的是3种监听适配器，它们提供监听器与WAS中的监听器适配器接口之间的适配。从这个意义上讲，IIS 7.0中的W3SVC更多地为HTTP.SYS起着监听适配器的作用。这3种非HTTP监听器和监听适配器定义在程序集SMHost.exe中，我们可以在目录%windir%\Microsoft.NET\Framework\v3.0\Windows Communication Foundation\中找到它们。

WCF提供的这3种监听器和监听适配器最终以Windows服务的形式体现。虽然它们定义在一个程序集中，我们依然可以通过服务工作管理器对其进行单独的启动、终止和配置。SMHost.exe提供了4个重要的Windows Service。

●　NetTcpPortSharing：为WCF提供TCP端口共享。关于端口共享在WCF中的应用，本人拙著《WCF全面解析》（上册）对此有详细的介绍。

●　NetTcpActivator：为WAS提供基于TCP的激活请求，包含TCP监听器和对应的监听适配器。

●　NetPipeActivator：为WAS提供基于命名管道的激活请求，包含命名管道监听器和对应的监听适配器。  NetMsmqActivator：为WAS提供基于MSMQ的激活请求，包含MSMQ监听器和对应的监听适配器。

图1-7为上述的4个Windows服务在服务控制管理器中的呈现。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00015.jpg)

图1-7　定义在SMHost.exe中的Windows Service

图1-8揭示了IIS 7.0的整体构架及整个请求处理流程。无论是从W3SVC接收到的HTTP请求，还是通过WCF提供的监听适配器接收到的请求，最终都会传递到WAS。如果相应的工作进程（或者应用程序池）尚未创建，则创建它，否则将请求分发给对应的工作进程进行后续的处理。WAS在进行请求处理过程中，通过内置的配置管理模块加载相关的配置信息，并对相关的组件进行配置。与IIS 5.x和IIS 6.0基于Metabase的配置信息存储不同的是，IIS 7.0大都将配置信息存放于XML形式的配置文件中，基本的配置存放在applicationHost.config中。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00016.jpg)

图1-8　IIS 7.0与ASP.NET

ASP.NET集成

从上面对IIS 5.x和IIS 6.0的介绍中，我们不难发现IIS与ASP.NET是两个相互独立的管道（Pipeline）。在各自管辖范围内，它们各自具有自己的一套机制对HTTP请求进行处理。两个管道通过ISAPI实现“连通”，IIS是第一道屏障，当对HTTP请求进行必要的前期处理（比如身份验证等）时，通过ISAPI将请求分发给ASP.NET管道。当ASP.NET在自身管道范围内完成对HTTP请求的处理时，处理后的结果再返回到IIS，IIS对其进行后期处理（比如日志记录、压缩等），最终生成HTTP响应。图1-9反映了IIS 6.0与ASP.NET之间的桥接关系。

![alt](http://localhost:8000/ce41850b-122a-476e-9ac7-4c153e9e1ac7/OEBPS/Image00017.jpg)

图1-9　基于IIS 6.0与ASP.NET双管道设计

从另一个角度讲，IIS运行在非托管的环境中，而ASP.NET管道则是托管的，ISAPI还是连接非托管环境和托管环境的纽带。IIS 5.x和IIS 6.0把两个管道进行隔离至少带来了下面的一些局限与不足：

●　相同操作的重复执行：IIS与ASP.NET之间具有一些重复的操作，比如身份验证。

●　动态文件与静态文件处理的不一致：因为只有基于ASP.NET动态文件（比如.aspx、.asmx、.svc等）的HTTP请求才能通过ASP.NET ISAPI进入ASP.NET管道，而对于一些静态文件（比如.html、.xml、.img等）的请求则由IIS直接响应，那么ASP.NET管道中的一些功能将不能用于这些基于静态文件的请求，比如我们希望通过Forms认证应用于基于图片文件的请求就做不到。

●　IIS难以扩展：对于IIS的扩展基本上就体现在自定义ISAPI，但是对于大部分人来说，这不是一件容易的事情。因为ISAPI是基于Win32的非托管的API，并非一种面向应用的编程接口。通常我们希望的是诸如定义ASP.NET的HttpModule和HttpHandler一样，通过托管代码的方式来扩展IIS。

对于Windows平台下的IIS来讲，ASP.NET无疑是一等公民，它们之间不应该是“井水不犯河水”，而应该是“你中有我，我中有你”的关系，为此在IIS 7.0中实现了两者的集成，通过集成可以获得如下的好处。

●　允许通过本地代码（Native Code）和托管代码（Managed Code）两种方式定义IIS Module，这些IIS Module注册到IIS中形成一个通用的请求处理管道。由这些IIS Module组成的这个管道能够处理所有的请求，不论请求基于怎样的资源类型。比如，可以将FormsAuthenticationModule提供的Forms认证应用到基于.aspx、CGI和静态文件的请求。

●　将ASP.NET提供的一些强大的功能应用到原来难以企及的地方，比如将ASP.NET的URL重写功能置于身份验证之前。

●　采用相同的方式去实现、配置、检测和支持一些服务器特性（Feature），比如Module、Handler映射、定制错误配置（Custom Error Configuration）等。

图1-10演示了在ASP.NET集成模式下，IIS整个请求处理管道的结构。可以看到，原来ASP.NET提供的托管组件可以直接应用在IIS管道中。

![loading-ag-727]()

1.3.4　ASP.NET管道

以IIS 6.0为例，在工作进程w3wp.exe中，利用aspnet_isapi.dll加载.NET运行时（如果.NET运行时尚未加载），IIS 6.0引入了应用程序池的概念，一个工作进程对应着一个应用程序池。一个应用程序池可以承载一个或多个Web应用，每个Web应用映射到一个IIS虚拟目录。与IIS 5.x一样，每一个Web应用运行在各自的应用程序域中。

如果HTTP.SYS接收到的HTTP请求是对该Web应用的第一次访问，在成功加载了运行时后，会通过AppDomainFactory为该Web应用创建一个应用程序域，随后一个特殊的运行时IsapiRuntime被加载。IsapiRuntime定义在程序集System.Web中，对应的命名空间为System.Web.Hosting，被加载的IsapiRuntime会接管该HTTP请求。

IsapiRuntime会首先创建一个IsapiWorkerRequest对象，用于封装当前的HTTP请求，并将该IsapiWorkerRequest对象传递给ASP.NET运行时HttpRuntime。从此时起，HTTP请求正式进入了ASP.NET管道。HttpRuntime会根据IsapiWorkerRequest对象创建用于表示当前HTTP请求的上下文（Context）对象HttpContext。

随着HttpContext被成功创建，HttpRuntime会利用HttpApplicationFactory创建新的或获取现有的HttpApplication对象。实际上ASP.NET维护着一个HttpApplication对象池，HttpApplicationFactory从池中选取可用的HttpApplication用于处理HTTP请求，处理完毕后将其释放到对象池中。HttpApplicationFactory负责处理当前的HTTP请求。

在HttpApplication初始化过程中，会根据配置文件加载并初始化相应的HttpModule对象。对于HttpApplication来说，在它处理HTTP请求的不同阶段会触发不同的事件（Event），而HttpModule的意义在于通过注册HttpApplication的相应的事件，将所需的操作注入整个HTTP请求的处理流程。ASP.NET的很多功能，比如身份验证、授权、缓存等，都是通过相应的HttpModule实现的。

最终完成对HTTP请求的处理实现在HttpHandler中。对于不同的资源类型，具有不同的HttpHandler。比如.aspx页面对应的HttpHandler为System.Web.UI.Page，WCF的.svc文件对应的HttpHandler为System.ServiceModel.Activation.HttpHandler。上面整个处理流程如图1-11所示。

![](https://fastly.jsdelivr.net/gh/yan-bolan/picbed@master/img/picgo/16792100405471679210040019.png)
