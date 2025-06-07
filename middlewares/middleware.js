export function ensureSubscribed(req, res, next) {
  if (req.session && req.session.subscribed) return next();
  res.redirect("/register"); // Or a subscription page if applicable
}

export function ensureAdmin(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.redirect("/admin/login");
}
