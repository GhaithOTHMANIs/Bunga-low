const jwt = require('jsonwebtoken');

function generateAccessToken(username,role) {
    TOKEN_SECRET=process.env.TOKEN_SECRET;
    const payload = {
        username: username,
        role: role  
      };
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}

module.exports = { generateAccessToken,
                    authenticateToken
 
                };