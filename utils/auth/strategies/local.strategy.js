const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const userService = require('../../../services/user/user.services');

const LocalStrategy = new Strategy({
    usernameField: 'user',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try
     {
        const user = await userService.findUser(username);
        if (!user) 
        {
            done(boom.unauthorized(), false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
        {
            done(boom.unauthorized(), false);
        }      
        done(null, user);
    } 
    catch (error) 
    {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;