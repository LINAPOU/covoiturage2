export const isAdmin = (req, res, next) => {

    if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    return res.status(403).json({ msg: "Accès refusé, vous n'êtes pas admin" });
  }
};
