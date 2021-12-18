import React, { Component } from 'react';
import qs from 'qs';
    /* 구글 API 일련의 과정
    구글 로그인 버튼을 누른다
    => 클라이언트에서 인가url로 이동하여 확인을 하고, 확인이 되면 authorize_code를 받아서 클라서버에 axios 요청을 한다
    => 클라에서 받은 코드를 가지고 그 외 필요한 정보들(clientID, secret, grant_type 등등)을 포함해서 token 요청을 한다
    => 우리에게 필요한 게 들어있는건 id_token이기 때문에 jwt토큰화된 id_token을 decoding 해줘서 원하는 값을 추출해낸다
    => 추출해낸 값들을 DB에 저장하고, 클라이언트에 보낼 건 보내주고 과정을 마친다
    */

const CLIENT_ID = "240166666352-jrcs8avt11vl8dp0hgo60qgnhf2t9rnn.apps.googleusercontent.com";
const AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";

const queryStr = qs.stringify({
  client_id: CLIENT_ID,
  redirect_uri: 'http://localhost:3000',
  response_type: 'code',
  //scope은 사용자의 어떤 데이터와 어떤 작업에 대한 권한을 요청하는지를 나타내는데
  //여기서는 People API를 읽기 전용으로 호출이 필요하다고 설정함.
  //더 자세한 건 https://developers.google.com/identity/protocols/oauth2/scopes 이 레퍼런스를 참조해야한다
  scope: "openid profile email",
  //이걸 설정하면 수명이 있는 accessToken만이 아니라 refreshToken까지 발급받을 수 있다
  //근데 지금은 access_token이랑 refresh_token을 쓰는 api 호출을 안 해서 그런가? 잘 모르겠는데 Refreshtoken을 안 줌
  access_type: 'offline',
});


class Login extends Component {
  constructor(props) {
    super(props)

    this.socialLoginHandler = this.socialLoginHandler.bind(this)

    // TODO: Google로부터 사용자 인증을 위해 Google로 이동해야 합니다. 적절한 URL을 입력하세요.
    // OAuth 인증이 완료되면 authorization code와 함께 callback url로 리디렉션 합니다.

    this.GOOGLE_LOGIN_URL = AUTHORIZE_URI + "?" + queryStr;
  }

  socialLoginHandler() {//인가서버 url을 넣어주게 되면
    window.location.assign(this.GOOGLE_LOGIN_URL)
  }

  render() {
    return (
      <div className='loginContainer'>
        OAuth 2.0으로 소셜 로그인을 구현해보세요.
        <img id="logo" alt="logo" src="https://image.flaticon.com/icons/png/512/25/25231.png" />
        <button
          onClick={this.socialLoginHandler}
          className='socialloginBtn'
        >
          Google으로 로그인
          </button>
      </div>
    );
  }
}

export default Login;
