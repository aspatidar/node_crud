const {Signup} = require('../model/auth/signup.model');

handleSignup = async(req, res) =>{
    try{    
        const body = req.body;
        const result = await Signup.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: body.password,
        })
        res.status(200).json({msg: 'User ragister successfully', user: result})
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: "Somthing went wrong", error: error });
    }
}

module.exports = {
    handleSignup,
}