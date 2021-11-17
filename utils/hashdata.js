const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const myPassword = password;
  const hash = await bcrypt.hash(myPassword, 10);
}

async function verifyPwd(pwd, userhash) {
  const myPassword = pwd;
  const hash = userhash;
  const isMatch = await bcrypt.compare(myPassword, hash);
  if(isMatch)
  {
    return true;
  }
  else
  {
    return false;
  }
}

module.export = { hashPassword, verifyPwd, };