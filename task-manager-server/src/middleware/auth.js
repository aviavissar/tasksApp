const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    console.log('aa auth');
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
   //     console.log('auth middlewaredecoded:',decoded);
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })
       
        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token;
       console.log('in')
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate" })
        console.log('out')
    }

}
module.exports = auth;