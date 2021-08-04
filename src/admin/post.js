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
    let { content = '', title = '', id = '' } = req.body;
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
            content: content,
            title: title,
            tags: [
                {text: "frontend", code: "frontend"}
            ],
        };
        fs.writeFileSync(__dirname + `/content/blog/posts/${post.id}.md`, content); 
        posts.push(post);
        fs.writeFileSync(__dirname + `/data/posts.json`, JSON.stringify(posts)); 
        fs.writeFileSync(__dirname + `/../pages/blog/posts/${post.id}.twig`, '{% extends "shared/blog/post_layout.twig" %}'); 
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

    const { content = '', title = '' } = req.body;
    if(post) {
        fs.writeFileSync(__dirname + `/content/blog/posts/${post.id}.md`, content); 
        post.content = content;
        posts = posts.map((post) => {
            if(post.id === id) {
                post.title = title;
            }
            return post;
        });
        fs.writeFileSync(__dirname + `/data/posts.json`, JSON.stringify(posts)); 
        post.title = title;
    }
    res.render('page/post/edit', {
        post: post
    });
});

module.exports = route;