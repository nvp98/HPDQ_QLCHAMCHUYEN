const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function (req, res, next) {
	const token = req.headers.authorization?.slice(7);
	if (!token) {
		return res.status(400).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY,(err,decode)=>{
			if (err) {
				return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
			}
			next();
		});
		// req = decoded.user;

		
	} catch (error) {
		res.status(403).json({ msg: 'Token is invalid.' });
	}
};