let data = [];

//fetch users
exports.getUsers=()=>{
    return data
}

//find user id
exports.getUserId = (id)=>{
    return data.find(user => user.id == id)
}

//create user
exports.createUser = (x)=>{
    const newUser = {...x, id:Date.now().toString()};
    data.push(newUser);
    return newUser
}
//delete User
exports.deleteUser = (id)=>{
    data = data.filter(user => user.id != id)
}

//update user
exports.updateUser = (x,id)=>{
    const UserUpdated = {...x, id:id};
    const userIndex = data.findIndex(i=> i.id == id)
    if (userIndex != -1) {
        data[userIndex] = UserUpdated
    }
    return UserUpdated
}
