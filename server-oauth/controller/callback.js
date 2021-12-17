require('dotenv').config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const axios = require('axios');

module.exports = (req, res) => {
  // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
  console.log(req.body);

  // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.
  // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github


  //저걸 하지 않으면 객체형태로 받아내질 못하니, 설정을 무조건 해줘야 한다.
  //데이터를 객체로 받겠다는 지정.

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
