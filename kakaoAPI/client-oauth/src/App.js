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
      profile: ''
    };
    this.getToken = this.getToken.bind(this);
  }

  async getToken(authorizationCode) {

    await axios.post('http://localhost:8080/callback', {
      authorizationCode
    }) 
    //body에 authorizationCode를 실어서 POST요청을 보낸다.
    .then(res => {
      console.log('프로필 사진 전달\n');
      console.log(res);
      this.setState({
        isLogin: true,
        profile: res.data.profile
      })
      console.log('받ㅇ은 프로필 사진은 이거다')
      console.log(this.state.profile);
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
    const { isLogin, profile} = this.state;
    return (
      <Router>
        <div className='App'>
          {isLogin ? (
            <Mypage profile={profile} />
          ) : (
              <Login />
            )}
        </div>
      </Router>
    );
  }
}

export default App;
