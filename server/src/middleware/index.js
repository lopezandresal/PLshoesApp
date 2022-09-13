const admin = require('../config/firebase-config');

class Middleware{
    async decodeToken(req, res, next){
        const token = req.headers.authorization;

        try{
            const decodeValue = await admin.auth().verifyIdToken(token);
            console.log(decodeValue);
            if(decodeValue){
                return next();
            }
            return res.json({message: "No autorizado"})
        }
        catch(e) {
            return res.json({message: "Error interno"})
        }
    }
}

module.exports = new Middleware();