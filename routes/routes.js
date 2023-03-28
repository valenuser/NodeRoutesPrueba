const express = require('express')
const router = express.Router()

const Task = require('../models/mongoModel')

router.get('/',async(req,res)=>{
    const task =  await Task.find()
    res.json(task)
})

router.get('/:id',async(req,res)=>{
    const task = await Task.findById(req.params.id)
    res.json(task)
})

router.post('/',async(req,res)=>{
    const {title,description} = req.body
    const task = new Task({title,description})
    await task.save()
    res.json({status:'task saved'})
 })

router.put('/:id',async(req,res)=>{
    const {title,description} = req.body
    const taskUpdated = ({title,description})
    await Task.findByIdAndUpdate(req.params.id, taskUpdated)
    res.json({status:'task updated'})
})

router.delete('/:id', async(req,res)=>{
    await Task.findByIdAndRemove(req.params.id)
    res.json({status:'task removed'})
})

module.exports = router