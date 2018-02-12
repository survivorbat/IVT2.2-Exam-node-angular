//Moment is used for functions concerning time function with the authentication code.
const moment = require('moment');
//JWT is used for making
const jwt = require('jwt-simple');
require('dotenv').config();

//Coming in studentNumber encrypting (encode) to a token.
function encryptAuthToken()
{
	//Filling the payload with information about the token.
	const payload = {
		//Giving 2 hours for now as expired date.
		exp: moment().add(2, 'hours').unix(),
		iat: moment().unix()
	};
	//Encrypting (encoding) the payload with the secreykey and returning it.
	return jwt.encode(payload, process.env.SECRET_KEY);
}

//Coming in token decryipting the payload, and sending back (returning the payload) to the caller with the callback.
function decryptAuthToken(token, callback)
{
	try {
		//Getting payload out of the token using the secretkey.
		const payload = jwt.decode(token, process.env.SECRET_KEY);
		//Getting time of now to compate with the expired date.
		const now = moment().unix;

		// Look if the token isn't expired.
		if(now > payload.exp)
		{
			console.log('This token has expired.');
		}

		//send the payload back as result.
		callback(null, payload);
	}
	catch(error)
	{
		//sending the error back.
		callback(error, null);
	}
}

//MODULES
module.exports = {
	encryptAuthToken,
	decryptAuthToken
}
