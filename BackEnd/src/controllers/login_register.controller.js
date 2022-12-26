const register = async (req, res) => {
    const {nombre, usuario, email, foto, password} = req.body;
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
    register
}