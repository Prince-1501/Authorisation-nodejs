const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) return res.status(500).send({ auth: false, message: 'token is empty' });

    jwt.verify(token, "randomString", (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    req.token = token;
    next();
  });

}
module.exports = auth


/*
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth

*/
