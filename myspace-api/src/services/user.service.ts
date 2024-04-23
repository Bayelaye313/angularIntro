let data:any = [];

export const userServices = {
//fetch users
getUsers(){
    return data
},

//find user id
getUserId(id:string){
    return data.find((user:any) => user.id == id)
},

//not exist methode
notExist(login: string){
    const user =data.find((user:any)=> user.login == login);
    return user !==undefined
},

//create user
createUser(user:any){
    const newUser = {...user, id:Date.now().toString()};
    data.push(newUser);
    return newUser
},
//delete User
deleteUser(id:string){
    data = data.filter((user:any)=> user.id != id)
},

//update user
updateUser(x:any, id:string){
    const UserUpdated = {...x, id:id};
    const userIndex = data.findIndex((i:any)=> i.id == id)
    if (userIndex != -1) {
        data[userIndex] = UserUpdated
    }
    return UserUpdated
}
}