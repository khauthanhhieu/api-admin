const AdminService = require('./admin')
const passport = require('passport')
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  login() {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return this.res.json({ isSuccess: false })
      }
      this.req.login(user, { session: false }, (err) => {
        if (err)
          this.res.send(err)
      })
      const token = jwt.sign({ _id: user._id }, 'doctor', { expiresIn: '2h' });
      this.res.cookie('access_token', token, {
        maxAge: 2 * 60 * 60 * 100,
      })
      return this.res.json({ isSuccess: true, token })
    })(this.req, this.res)
  }

  async getMe() {
    try {
      const verify = jwt.verify(this.req.headers['token'], 'doctor')
      const admin = await AdminService.findOneById(verify._id)
      this.res.json({
        isSuccess: true,
        admin,
      })
    } catch (err) {
      this.res.json(403).json({
        isSuccess: false,
        mess: err,
      })
    }
  }
}

module.exports = AuthService;