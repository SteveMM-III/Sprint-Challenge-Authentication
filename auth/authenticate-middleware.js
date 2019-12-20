const jwt = require( 'jsonwebtoken' );

module.exports = ( req, res, next ) => {
  const { token } = req.headers;

  if ( token ) {
    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

    jwt.verify( token, secret, ( error, decoded ) => {
      error ?
        res.status( 401 ).json( { message: "Invalid token" } )
        : ( req.token = decoded, next() )
    } ); }
  else {
    res.status( 400 ).json( { you: "shall not pass!" } ); }
};
