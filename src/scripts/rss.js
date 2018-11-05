const { Feed } = require("feed");
var fs = require('fs');

const feed = new Feed({
  title: "Tasy Nguyen Blog",
  description: "Tasy Nguyen Blog RSS Feed",
  link: "https://tasynguyen3894.github.io/",
});

var posts;
var data = fs.readFileSync('src/data/tags.json');

posts = JSON.parse(data);

posts.forEach(post => {
  feed.addItem({
    title: post.title,
    guid: "https://tasynguyen3894.github.io/" + post.url,
    link: "https://tasynguyen3894.github.io/" + post.url,
    description: post.title,
  });
});
 
// // feed.addCategory("Technologie");
 
// // feed.addContributor({
// //   name: "Johan Cruyff",
// //   email: "johancruyff@example.com",
// //   link: "https://example.com/johancruyff"
// // });

let rss = feed.rss2();
// console.log(rss)
fs.writeFile('dist/rss.xml', rss, function (err) {
    if (err) throw err;
    console.log('Saved!');
});
