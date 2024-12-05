
const AuthService = require('../middlewares/authentification.js');
const Client = require('../models/Client');
const Agent = require('../models/Agent');


function getLoginPageAgent(req, res) {
    res.render('loginAgent');  
}


async function loginAgent(req, res) {
    try {
      const agent = await Agent.findOne({ username: req.body.username });
  
      if (!agent || agent.password !== req.body.password) {
        return res.render('loginAgent', { error: 'Wrong credentials' });
      }
  
      const token = AuthService.generateAccessToken({ username: agent.username, password: agent.password, role: 'AGENT' });
  
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
  
      res.render('dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
  function logoutAgent(req, res) {
    try {
      res.clearCookie('jwt');
  
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
async function signup(req, res)  {
    try {
        const { firstName, lastName, NIC, phone, dateOfBirth, username, password } = req.body;

        const newClient = new Client({
            firstName,
            lastName,
            NIC,
            phone,
            dateOfBirth,
            username,
            password,
        });

        await newClient.save();

        res.status(201).json({ message: 'Client added successfully', client: newClient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding client', error: error.message });
    }
    
}

async function login(req, res) {
    try {
      const client = await Client.findOne({ username: req.body.username });
  
      if (!client || client.password !== req.body.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = AuthService.generateAccessToken({ username: client.username, password: client.password, role: client.role });
  
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
  
      res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

function logout(req, res)  {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    getLoginPageAgent,
    loginAgent,
    logoutAgent,
    login,
    signup,
    logout
  };