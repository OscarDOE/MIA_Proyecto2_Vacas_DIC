let list_users = [
  //  {
    // Name:"O",
    // User:"OLIVA",
    // Photo:"IMAGE",
    // Email:"xxx@gmail.com",
    // Password:"123",
    // Type:"R"
//}
]
let list_travel = [{}]

let list_cars = [{}]

let list_dates = [{}]

function getUserByUser(user){
    console.log("DENTRO DE USER BY USER")
    const encontrado = list_users.find((item) =>item.User === user)
    // console.log(item)
    // console.log(item.User)
    // console.log(user)
    //console.log(user)
    //console.log(encontrado)
    if(!encontrado){
        const seguro = list_users.find((item) => item.Email == user)
        console.log(seguro)
        if(!seguro){
            console.log("TERMINO USER BY USER")
            return null
        }
        console.log("TERMINO USER BY USER")
        return seguro
    }
    console.log("TERMINO USER BY USER")
    return encontrado
}

function getUser(id){
    const encontrado = list_users.find((item) => item.id == id)
    if(!encontrado){
        return(null)
    }
    return encontrado;
}
function getTravel(id){
    const encontrado = list_travel.find((item) => item.id == id)
    if(!encontrado){
        return(null)
    }
    return encontrado;
}
function getCar(id){
    const encontrado = list_cars.find((item) => item.id == id)
    if(!encontrado){
        return(null)
    }
    return encontrado;
}
function getDate(id){
    const encontrado = list_dates.find((item) => item.id == id)
    if(!encontrado){
        return(null)
    }
    return encontrado;
}

module.exports = {list_users,list_cars,list_travel,list_dates,getUser,getUserByUser,getTravel,getCar,getDate};