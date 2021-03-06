import React, { Component } from "react";
// import axios from 'axios';

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // TODO: GitHub API 를 통해서 받아올 수 있는 정보들 중에서
      // 이름, login 아이디, repository 주소, public repositoty 개수를 포함한 다양한 정보들을 담아주세요.
      email: '',
      name: ''
    }
  }

  async getNaverUserInfo() {
    //userInfo를 얻으려면 엑세스 토큰을 받아와서 그걸로 get 요청을 해야 하는 것 같음 
    // console.log(this.props);
    const refreshToken = this.props.refreshToken;
    const accessToken = this.props.accessToken;
    console.log(`refresh_token은 ${refreshToken}`);
    console.log(`access_token은 ${accessToken}`);
    
    // const token = `Bearer ${accessToken}`;

    // axios.get('https://openapi.naver.com/v1/nid/me', {
    //   headers: {Authorization: token}
    // })
    // .then((res) => {
    //   console.log(res);
    // })

  }

  componentDidMount() {
    this.getNaverUserInfo()
  }

  render() {
    const { accessToken } = this.props

    if (!accessToken) {
      return <div>로그인이 필요합니다</div>
    }
    return (
      <>
        <dt>email: </dt>
        <dd>{`${this.state.email}\n`}</dd>
        <dt>name: </dt>
        <dd>{`${this.state.name}\n`}</dd>
        <dt>picture: </dt>
        {/* <dd>
          <img src={this.state.picture} />
        </dd> */}
      </>
    );
  };
}

export default Mypage;
