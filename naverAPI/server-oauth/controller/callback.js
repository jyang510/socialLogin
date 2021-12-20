require('dotenv').config();

const clientID = process.env.NAVER_CLIENT_ID;
const clientSecret = process.env.NAVER_CLIENT_SECRET;
const axios = require('axios');

module.exports = (req, res) => {
  console.log(req.body);
  // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.

  //네이버는 발급인지, 갱신인지, 삭제 요청인지에 따라 달라지는 옵션 값들이 있음
  //필수 client_id, client_secret, grant_type

  //발급
  //변경 grant_type:'authorization_code'
  //생성 code:'req.body.authorizationCode'
  //생성 state: 'req.body.state'

  //갱신
  //변경 grant_type: 'refresh_token'
  //생성 refresh_token: 네이버 이용자 인증에 성공해 발급받을 때 받은 갱신 토큰

  //삭제
  //변경 grant_type: 'delete'
  //생성 access_token: '발급받은 접근 토큰으로 URL인코딩 적용된 값을 전달해줘야한다'
  //생성 service_provider: 'NAVER'

  //토큰 발급시 호출 함수만 작성이 되어있음. 갱신, 삭제에 대해서는 아직 구현이 안 됨.
  const redirectURI = encodeURI('https://d1839m99iakp36.cloudfront.net');
  const code = req.body.authorizationCode;
  const state = req.body.state; 

  const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + clientID + '&client_secret=' + clientSecret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
  axios.post(api_url)
  .then((resp) => {
    console.log(resp.data);
    accessToken = resp.data.access_token;
    refreshToken = resp.data.refresh_token;

    const token = 'Bearer ' + accessToken;
    axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {Authorization: token}
    })
    .then((res) => {
      console.log(res.data);
      /*
      res.data.response 객체로 들어오는 정보
      id 네이버에서 사용자를 식별하는 값
      profile_image 사용자 프로필 사진
      email 사용자 이메일
      name 사용자 이름
      */

    })

    res.status(200).json({
      accessToken,
      refreshToken
    });
  })
  .catch(err => {
    return err;
  })

}
