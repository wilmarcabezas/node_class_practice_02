const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../../config/config');
const UserService = require('../user/user.services');
const urlrecovery = config.url;

class AuthService {

  async getUser(email, password) 
  {
    const user = await UserService.findUserByEmail(email);
    if (!user) 
    {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
    {
      throw boom.unauthorized();;
    }
    return user;
  }

  signToken(user) 
  {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await UserService.findUserByEmail(email);
    if (!user) 
    {
      throw boom.unauthorized();
    }
    const payload = { id: user._id, role: user.role };
    console.log(user.id);

    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '45min'});
    console.log(payload);
    const link = `http://${urlrecovery}?token=${token}`;
    await UserService.updateUser(user._id, {recoverytoken: token});

    const mail = 
    {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;

  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      
      const user = await UserService.findOne(payload.id);

      if (user.recoverytoken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      console.log(hash);
      await UserService.updateUser(user.id, {recoverytoken: null, password: hash});
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();      
    }
  }

  async sendMail(infoMail) 
  {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent.' };
  }
}

module.exports = AuthService;