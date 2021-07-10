const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Table = require('../models/table');

router.post('/', (req, res, next)=>{
    const newRec = new Table({
        creation_time: Date.now(),
        LDR: req.body.LDR,
        temp: req.body.temp,
        hum: req.body.hum,
        ph: req.body.ph,
        device_number: req.body.device_number
    });
    newRec.save().then(res=>{
        console.log('saved')
    }).catch(err=>{
        console.log("error", err);
    })
    res.status(201).json({
        msg: 'success', 
        data: newRec
    })
    res.status(404).json({
        msg: 'json error'
    })
})

router.put('/:id', (req, res, next)=>{
    const newRec = {
        creation_time: Date.now(),
        LDR: req.body.LDR,
        temp: req.body.temp,
        hum: req.body.hum,
        ph: req.body.ph,
        device_number: req.body.device_number
    };
    Table.updateOne({ _id: req.params.id }, newRec, (err, res2)=>{
        if(err){
            res.send(err);
        }
        else
        res.send(res2);
    })
})

router.get('/:id', function(req, res, next) {
    Table.findOne({ _id: req.params.id }, (err, res2)=>{
        if(err){
            res.send(err);
        }
        else
        res.send(res2);
    })
});

router.get('/get/:device_number', function(req, res, next) {
    Table.find({ device_number: req.params.device_number }, (err, res2)=>{
        if(err){
            res.send(err);
        }
        else
        res.send(res2);
    })
});

router.get('/', function(req, res, next) {
    Table.find({}, (err, res2)=>{
        if(err){
            res.send(err);
        }
        else
        res.send(res2);
    })
});

router.delete('/:id', function(req, res, next) {
    Table.deleteOne({ _id: req.params.id }, (err, res2)=>{
        if(err){
            res.send(err);
        }
        else
        res.send(res2);
    })
});


module.exports = router;
  