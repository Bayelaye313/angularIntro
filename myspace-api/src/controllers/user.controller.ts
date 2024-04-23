
import  {userServices} from '../services/user.service';
import {Request, Response} from 'express'

export const userController = {

getUsers (req:Request, res:Response){
    const list_users = userServices.getUsers();
    res.json(list_users)
},

getById(req:Request,res:Response){
    const userid = req.params.id;
    const user = userServices.getUserId(userid);
    res.json(user)
},

createUser(req:Request,res:Response){
    const userdata = req.body;
    if (!userServices.notExist(userdata.login)) {
        const user = userServices.createUser(userdata)
        res.status(200).json(user)    
    }else{
        res.status(400).json({ message: "user already exist with same login" });
    }
},
updateUser(req:Request,res:Response){
    const userdata = req.body;
    const userid = req.params.id;

    const user = userServices.updateUser(userdata, userid)
    res.status(200).json(user)
},

deleteUser(req:Request,res:Response){
    const userid = req.params.id;
    userServices.deleteUser(userid);
    res.sendStatus(204)
}
}
