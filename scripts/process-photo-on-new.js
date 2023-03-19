// const front = require('hexo-front-matter');
// const fs = require('hexo-fs');
// const axios = require('axios');

// hexo.on('new',async function(data){
//     /**
//      * It will be executed every time you call the hexo new command. The parameter data is an object with two fields:

//         path
//         Full path to the MD file of the new post

//         content
//         Complete content of the scaffold (template), which Hexo has used to create the new post; default is /scaffolds/post.md.
//      */
//  // parse article content
//  var post = front.parse(data.content);

// await axios.get('https://api.ixiaowai.cn/api/api.php?return=json')
//  .then(res => {

//     if (res.data.code=="200") {
//      post.cover = res.data.imgurl;
//     }
//     console.log(res.data.imgurl);
//  })
//  .catch(err => {
//       console.log(err);
//  });
 
// //https://api.ixiaowai.cn/ylapi/index.php（一言语录）

//  // convert content back
//  var postStr = front.stringify(post);
 
//  postStr = '---\n' + postStr;
//  // store article
//  fs.writeFile(data.path, postStr, 'utf-8');

// });