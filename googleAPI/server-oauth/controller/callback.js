require('dotenv').config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const axios = require('axios');

module.exports = (req, res) => {
  // req의 body로 authorization code가 들어옵니다.
  console.log(req.body);


  axios.post('https://oauth2.googleapis.com/token', {
      client_id: clientID,
      client_secret: clientSecret,
      code: req.body.authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000'
    }
  )
  .then((resp) => {
    console.log(resp.data);
    access_token = resp.data.access_token;
    id_token = resp.data.id_token;
    res.status(200).json({
      accessToken: access_token,
      idToken: id_token
    });
  })
  .catch(err => {
    return err;
  })

}
