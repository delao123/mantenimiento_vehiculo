const jwt = require("jsonwebtoken");

exports.getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin: user.isAdmin,
    }, 'secretword', {
        expiresIn: '48h'
    })
}


