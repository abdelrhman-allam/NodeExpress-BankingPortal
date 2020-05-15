const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data');


router.get('/transfer', function(req, res){
    res.render('transfer');
});

router.post('/transfer', function(req, res){
    const from = req.body.from;
    const amount = parseInt(req.body.amount);
    const to = req.body.to;

    accounts[from].balance = parseInt(accounts[from].balance)- amount;
    accounts[to].balance = parseInt(accounts[to].balance) + amount;
    
    writeJSON();

    res.render('transfer', { message: "Transfer Completed"});
});

router.get('/payment', function(req, res){
    res.render('payment', {account: accounts.credit});
});

router.post('/payment', function(req, res){
    const from = req.body.from;
    const amount = parseInt(req.body.amount);
    const to = req.body.to;

    accounts.credit.balance = parseInt(accounts.credit.balance) - amount;
    accounts.credit.available = parseInt(accounts.credit.available) + amount;

    writeJSON();

    res.render('payment', { message: "Payment Successful",  account: accounts.credit});
});

module.exports = router;