// 首先，我们必须建立一个 Hexo 实例（instance），第一个参数是网站的根目录，也就是 base_dir，而第二个参数则是初始化的选项。接着执行 init 方法后，Hexo 会加载插件及配置文件。
var Hexo = require('hexo');
// const fs = require('hexo-fs');//npm install hexo-fs --save
var hexo = new Hexo(process.cwd(), {});

hexo.init().then(function(){
    // get input arguments if exists
    var args = process.argv.slice(2);
    var data = {
      title : args[0],
     tags : args.length>1? args[1].split(',') :"",
    // var categories = args[1];
    // var date = args[3];
        cover :"https://tuapi.eees.cc/api.php?category=dongman&type=302" // args[4];
    }
    hexo.post.create(data, false).then(function(post){
        console.log(post);
        var exec = require('child_process').exec;
        exec( 'explorer.exe' + ' ' + post.path);
    }); 
    
});