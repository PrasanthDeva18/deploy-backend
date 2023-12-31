const SendToken = (user,statusCode,res)=>{
    const token = user.getJwtToken();
    console.log(token)
    const options = {
        expires:new Date(Date.now() + process.env.cookie_exp_time * 24 * 60 * 60 * 1000),
        httpOnly:true
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token,
        user
    })
}

module.exports = SendToken