require('dotenv').config();
const axios = require('axios');
const request = require('request-promise');

const clientID = 'dca677be4251f006b061960a3063b1f4';
const clientSecret = 'WPXSZeHmisgqHZQ9VgfBiPdyg3CSw8oe';

module.exports = async (req, res) => {
  console.log('req.body의 값은\n');
  console.log(req.body);

  const options = {
    uri: "https://kauth.kakao.com/oauth/token",
    method: "POST",
    form:{
        grant_type : 'authorization_code',
        client_id :clientID,
        client_secret: clientSecret,
        redirect_uri: 'http://localhost:3000',
        code: req.body.authorizationCode
    },
    headers: {
        "content-type" : "application/x-www-form-urlencoded"
    },
    json: true
  }
  const token = await request(options, function (error, res, body) {
    return res;
  })
  console.log(token);

  const accessToken = token.access_token;
  const refreshToken = token.refresh_token;
  console.log(`토큰의 값\n access\n${accessToken}\n refresh\n${refreshToken}\n`);

  const userinfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
  }
   });
  console.log(userinfo);
  console.log(userinfo.data.kakao_account.profile);
  const profile = userinfo.data.kakao_account.profile.profile_image_url;
  
  res.json({ profile });
  // res.status(200).json({ accessToken: token.access_token, refreshToken: token.refresh_token });
}