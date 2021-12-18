import React, { Component } from 'react';
import qs from 'qs';
// import crypto from 'crypto-js';

const AUTHORIZE_URI = "https://nid.naver.com/oauth2.0/authorize";

const queryStr = qs.stringify({
  client_id: 'cwNXt0ItxMlOlF3gnPSl',
  //window.location.href를 통해 현재 url을 긁어올 수 있다. 이쪽으로 리다이렉트가 되는 거임.
  redirect_uri: 'http://localhost:3000',
  //token으로 설정하면 Oauth 인가 방식 중 가장 간단한 implicit grant 방식이 적용된다.
  response_type: 'code', // 보안상의 이슈로 code => 서버에서 구글 api를 통해 token
  state: 'hello'
});

class Login extends Component {
  constructor(props) {
    super(props)
    this.socialLoginHandler = this.socialLoginHandler.bind(this)
    this.NAVER_LOGIN_URL = AUTHORIZE_URI + "?" + queryStr;
  }

  socialLoginHandler() {//인가서버 url을 넣어주게 되면
    
    // const CLIENT_ID = process.env.NAVER_CLIENT_ID;
    // const AUTHORIZE_URI = "https://nid.naver.com/oauth2.0/authorize";
    // const queryStr = qs.stringify({
    //   client_id: CLIENT_ID,
    //   redirect_uri: 'http://localhost:3000',
    //   response_type: 'code',
    //   state: 'hello'
    // });
    // const loginURL = AUTHORIZE_URI + '?' + queryStr;
    
    // const client_id = CLIENT_ID;
    // const redirect_uri = 'http://localhost:3000';
    // const response_type = 'code';
    // const state = 'hello';

    // const loginURL = `${AUTHORIZE_URI}?response_type=${response_type}&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;

    window.location.assign(this.NAVER_LOGIN_URL);
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
          Naver로 로그인
          </button>
      </div>
    );
  }
}

export default Login;
