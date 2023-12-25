const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");

const client = jwksClient({
    jwksUri: "https://appleid.apple.com/auth/keys",
  });

const getAppleKeys = async (kid) => {
  return new Promise((resolve) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) console.log(err);
      const signingKey = key.getPublicKey();
      resolve(signingKey);
    });
  });
};

const validateApple =  async (req, res, next) => {
  const identityToken = req.headers.authorization;

  if (!identityToken) {
    return res.status(404).json("Identity Token is required");
  }

  try {
    // Verify the identity token with Apple's public key
    const decodedToken = jwt.decode(identityToken, { complete: true });
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    if (decodedToken.payload.exp <= currentTime) {
      return res.status(401).json("Identity Token expired, refresh required");
    }
    
    const kid = decodedToken.header.kid;
    const appleKey = await getAppleKeys(kid);

    const verified = jwt.verify(identityToken, appleKey, {});
    
    if(!verified){
        return res.status(400).json("Invalid Identity Token");
    }
    // if(verified.aud !== 'com.example.AstroAppSwift'){
    //     return res.status(400).json("Invalid Audience");
    // }
    req.appleUser = verified;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json("validating Identity Token failed");
  }
}

module.exports = validateApple;
