import React, { Component } from 'react';
import qs from 'qs';

const AUTHORIZE_URI = 'https://kauth.kakao.com/oauth/authorize';
// /oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code HTTP/1.1
// https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code

const queryStr = qs.stringify({
  client_id: 'dca677be4251f006b061960a3063b1f4',
  //window.location.href를 통해 현재 url을 긁어올 수 있다. 이쪽으로 리다이렉트가 되는 거임.
  redirect_uri: 'http://localhost:3000',
  //token으로 설정하면 Oauth 인가 방식 중 가장 간단한 implicit grant 방식이 적용된다.
  response_type: 'code'
});


class Login extends Component {
  constructor(props) {
    super(props)

    this.socialLoginHandler = this.socialLoginHandler.bind(this)

    // TODO: Google로부터 사용자 인증을 위해 Google로 이동해야 합니다. 적절한 URL을 입력하세요.
    // OAuth 인증이 완료되면 authorization code와 함께 callback url로 리디렉션 합니다.

    this.KAKAO_LOGIN_URL = AUTHORIZE_URI + "?" + queryStr;
  }


  // ‘https://kauth.kakao.com/oauth/authorize’ 요청은 redirect_uri로 리다이렉트 되야 하므로 
  // 비동기 통신 방식으로 호출하시면 안됩니다.
  socialLoginHandler() {//인가서버 url을 넣어주게 되면
    window.location.assign(this.KAKAO_LOGIN_URL)
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
          KaKao로 로그인
          </button>
      </div>
    );
  }
}

export default Login;
