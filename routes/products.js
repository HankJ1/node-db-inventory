const express = require('express');
const router = express.Router();
const Product = require('../models/product')

router.get('/', (req, res) => {
    const items = Product.find()
    .then((result) => {
        //console.log(result);
        res.render('catalogue', {title: "all products", items: result, type:"Armor, Steed, Dagger, Sword"});
    })
})

router.get('/steeds', (req, res) => {
    const items = Product.find()
    .then((result) => {
        //console.log(result);
        res.render('catalogue', {title: "Steeds", items: result, type: "Steed"});
    })
})

router.get('/armor', (req, res) => {
    const items = Product.find()
    .then((result) => {
        //console.log(result);
        res.render('catalogue', {title: "Armor", items: result, type: "Armor"});
    })
})

router.get('/daggers', (req, res) => {
    const items = Product.find()
    .then((result) => {
        //console.log(result);
        res.render('catalogue', {title: "Daggers", items: result, type: "Dagger"});
    })
})

router.get('/swords', (req, res) => {
    const items = Product.find()
    .then((result) => {
        //console.log(result);
        res.render('catalogue', {title: "Swords", items: result, type: "Sword"});
    })
})

router.get('/new', (req, res) => {
    res.render('new-product');
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const items = Product.findById(id)
    .then((result) => {
        res.render('focused', {title: result.title, props: result, type: result.type + "s"});
    })
})

router.post('/:id', (req, res) => {
    let info = req.body;
    let id = req.params.id;
    console.log(info.title);
    if(info.password === "sugar") {
        Product.findOneAndUpdate({_id: id}, {title: info.title, description: info.description, price: info.price})
        .then(result => {
            res.json({answer: `/products/${id}`})
        })
        // .then(result => console.log(result))
        .catch(err => console.log(err))
    } else {
        console.log('authentication failed');
        res.json( {answer: 'error'});
    }

    
})

router.post('/new', (req, res) => {
    console.log('post requested');
    console.log(req.body);

    const product = new Product(req.body)
    product.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err));
})

module.exports = router;