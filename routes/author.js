const express = require('express')
const Author = require('../models/author')
const router = express.Router()

router.get('/', async (req, res) => {
    const searchOptions = {}
    if(req.query.name != null || req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('author/index', {author: authors, searchOptions: req.query})
    } catch {
        res.render('/')
    }
})

router.get('/new', (req, res) => {
    res.render('author/new', {author: new Author()})
})

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect("/author")
    } catch {
        res.render('author/new', {
            author: author,
            errorMessage: "Error creating author"
        })
    }
    // author.save((err, newAuthor) => {
    //     if(err) {
    //         res.render('author/new', {
    //             author: author,
    //             errorMessage: "Error creating author"
    //         })
    //     } else {
    //         res.redirect("/author")
    //     }
    // })
})

module.exports = router