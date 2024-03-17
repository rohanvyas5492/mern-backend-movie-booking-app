const { validateToken } = require("../lib/auth");

function checkForAuth() {
  return function (req, res, next) {
    console.log(req.user);
    const authHeader =
      req.headers["Authorization"] ?? req.headers["authorization"];
    if (authHeader) {
      const headerSplit = authHeader.split("Bearer ");
      if (headerSplit.length === 2) {
        const token = headerSplit[1];
        const validatedTokenResult = validateToken(token);
        if (validatedTokenResult) req.user = validatedTokenResult;
        console.log(validatedTokenResult);
      }
    }
    next();
  };
}

function ensureAuthenticated(allowedRoles = null) {
  return function (req, res, next) {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ status: "error", error: "unauthenticated" });

    if (!allowedRoles) return next();

    if (!allowedRoles.includes(user.role))
      return res.status(401).json({ status: "error", error: "access denied" });

    return next();
  };
}

module.exports = {
  checkForAuth,
  ensureAuthenticated,
};
