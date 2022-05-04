const express = require('express');
const fs = require('fs');
const route = express.Router();

route.get('/', (req, res) => {
    let rawdata = fs.readFileSync(__dirname + '/data/posts.json');
    let posts = JSON.parse(rawdata);
    res.render('page/post/index', {
        posts: posts
    });
});


route.get('/create', (req, res) => {
    res.render('page/post/create');
});

route.post('/create', (req, res) => {
    let rawdata = fs.readFileSync(__dirname + '/data/posts.json');
    let posts = JSON.parse(rawdata);
    let { content = '', title = '', id = '', published_at = null, status = false } = req.body;
    id = id.split(' ').join('-');
    let post = posts.filter((post) => {
        return post.id === id;
    })
    post = post.length > 0 ? post[0] : null;

    if(post) {
        res.redirect('/posts/create')
    } else {
        let post = {
            id: id,
            title: title,
            published_at: published_at,
            status: status ? true : false,
            tags: [
                {text: "frontend", code: "frontend"}
            ],
        };
        fs.writeFileSync(__dirname + `/content/blog/posts/${post.id}.md`, content); 
        posts.push(post);
        fs.writeFileSync(__dirname + `/data/posts.json`, JSON.stringify(posts)); 
        fs.writeFileSync(__dirname + `/../pages/blog/posts/${post.id}.twig`, '{% extends "shared/blog/short_post_layout.twig" %}'); 
    }
    res.redirect('/posts')
});


route.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    let rawdata = fs.readFileSync(__dirname + '/data/posts.json');
    let posts = JSON.parse(rawdata);
    let post = posts.filter((post) => {
        return post.id === id;
    })
    post = post.length > 0 ? post[0] : null;
    if(post) {
        let content = fs.readFileSync(__dirname + `/content/blog/posts/${post.id}.md`, 
                {encoding:'utf8', flag:'r'}); 
        post.content = content
    }
    res.render('page/post/edit', {
        post: post
    });
});

route.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    let rawdata = fs.readFileSync(__dirname + '/data/posts.json');
    let posts = JSON.parse(rawdata);
    let post = posts.filter((post) => {
        return post.id === id;
    })
    post = post.length > 0 ? post[0] : null;

    const { content = '', title = '', published_at = null, status = false } = req.body;
    if(post) {
        fs.writeFileSync(__dirname + `/content/blog/posts/${post.id}.md`, content); 
        
        posts = posts.map((post) => {
            if(post.id === id) {
                delete post.content;
                post.status = status ? true : false;
                post.title = title;
                post.published_at = published_at;
            }
            return post;
        });
        fs.writeFileSync(__dirname + `/data/posts.json`, JSON.stringify(posts)); 
        fs.writeFileSync(__dirname + `/../pages/blog/posts/${post.id}.twig`, '{% extends "shared/blog/short_post_layout.twig" %}'); 
        post.title = title;
        post.content = content;
    }
    res.render('page/post/edit', {
        post: post
    });
});

module.exports = route;