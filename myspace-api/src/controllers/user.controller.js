const { json } = require('body-parser');
const userService = require('../services/user.service')

exports.getUsers = (req, res)=>{
    const list_users = userService.getUsers();
    res.json(list_users)
}

exports.getById= (req,res)=>{
    const userid = req.params.id;
    const user = userService.getUserId(userid);
    res.json(user)
}

exports.createUser= (req,res)=>{
    const userdata = req.body;
    const user = userService.createUser(userdata)
    res.status(200).json(user)
}
exports.updateUser= (req,res)=>{
    const userdata = req.body;
    const userid = req.params.id;

    const user = userService.updateUser(userid, userdata)
    res.status(200).json(user)
}

exports.deleteUser= (req,res)=>{
    const userid = req.params.id;
    userService.deleteUser(userid);
    res.sendStatus(204)
}
