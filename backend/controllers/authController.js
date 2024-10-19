// authController.js

const googleCallback = (req, res) => {
  res.redirect('http://localhost:5173/');
};

const githubCallback = (req, res) => {
  res.redirect('http://localhost:5173/');
};

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('http://localhost:5173');
    });
  });
};


const getUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Usuario no autenticado'
    });
  }
};

export default {
  googleCallback,
  githubCallback,
  logout,
  getUser
};
