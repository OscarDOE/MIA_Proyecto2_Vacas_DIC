const usuarios = {
    u1:"u1",
    u2:"u2",
    u3:"u3",
    u4:"u4",
    u5:"OSCAR OLIVA",
    u6:"u6",
    u7:"u7",
    u8:"u8",
    u9:"u9",
    u10:"u10",
    u11:"u11",
    u12:"u12"
}

const getUser = async (req, res) => {
    const {id} = req.body;
    const user = usuarios[id];
    if(user){
        res.json({status:"GUT",
        msg:'USUARIO ENCONTRADO',
        user});
    }else{
        res.json({status:"NAI",
        msg:'USUARIO NO ENCONTRADO',
        user});
    }
}

module.exports = {
    getUser
}