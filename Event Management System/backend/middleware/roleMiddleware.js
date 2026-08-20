const authorize = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Login required"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You are not authorized for this operation"
            });
        }

        next();
    };
};

module.exports = authorize;