const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.HashedPw = async rawPw => {
	const hashedPw = await bcrypt.hash(rawPw, saltRounds);
	return hashedPw;
};

exports.isEqualPw = async (rawPw, hashedPw) => {
	const isEqual = await bcrypt.compare(rawPw, hashedPw);
	return isEqual;
};