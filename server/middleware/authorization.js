const jwt = require("jsonwebtoken")


const authorization = async (req,res,next) => {
    try {
        const jwtToken = req.header("token");

        if (!jwtToken){
            return res.status(403).json(`Not Authorized`)
        }
        const verify = jwt.verify(jwtToken,process.env['jwtSecret']);
        req.user = verify.user;
        next();
        
    } catch (err) {
        console.log(err.message);
        return res.status(403).json(`Not Authorized`)
    }
}

module.exports = authorization;