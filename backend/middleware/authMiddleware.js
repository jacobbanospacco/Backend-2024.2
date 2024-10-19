exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ message: 'Necesitas iniciar sesión para acceder a esta página' });
    }
  };
  