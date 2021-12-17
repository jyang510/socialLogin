import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Mypage from './components/Mypage';
import axios from 'axios';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      // TODO:
      accessToken: '',
      idToken: ''
    };
    this.getToken = this.getToken.bind(this);
  }

  async getToken(authorizationCode) {
    // 받아온 authorization code로 다시 OAuth App에 요청해서 access token을 받을 수 있습니다.
    // access token은 보안 유지가 필요하기 때문에 클라이언트에서 직접 OAuth App에 요청을 하는 방법은 보안에 취약할 수 있습니다.
    // authorization code를 서버로 보내주고 서버에서 access token 요청을 하는 것이 적절합니다.

    // TODO: 서버의 /callback 엔드포인트로 authorization code를 보내주고 access token을 받아옵니다.

    await axios.post('http://localhost:8080/callback', {
      authorizationCode
    }) 
    //body에 authorizationCode를 실어서 POST요청을 보낸다.
    .then(res => { 
      this.setState({
        isLogin: true,
        accessToken: res.data.accessToken,
        idToken: res.data.idToken
      });
    })
    .catch(err => {
      console.log(err);
    })

  }

  componentDidMount() {
    const url = new URL(window.location.href) //url을 긁어오는 건가?
    console.log(`url의 값은 ${url}`);
    const authorizationCode = url.searchParams.get('code')
    console.log(`authorization의 값은 ${authorizationCode}`);
    if (authorizationCode) {
      this.getToken(authorizationCode)
    }
  }

  render() {
    const { isLogin, accessToken, idToken } = this.state;
    return (
      <Router>
        <div className='App'>
          {isLogin ? (
            <Mypage accessToken={accessToken} idToken={idToken} />
          ) : (
              <Login />
            )}
        </div>
      </Router>
    );
  }
}

export default App;
