import React, { Component } from "react";
import axios from 'axios';

//구글 openID로 받은 idToken이 jwt방식으로 된 거라 decode해주기 위해 import받는 모듈
import jwtDecode from "jwt-decode";

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // TODO: GitHub API 를 통해서 받아올 수 있는 정보들 중에서
      // 이름, login 아이디, repository 주소, public repositoty 개수를 포함한 다양한 정보들을 담아주세요.
      email: '',
      name: '',
      picture: ''
    }
  }

  async getGoogleUserInfo() {
    // TODO: GitHub API를 통해 사용자 정보를 받아오세요.
    // https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user

    //userInfo를 얻으려면 엑세스 토큰을 받아와서 그걸로 get 요청을 해야 하는 것 같음 
    // console.log(this.props);
    const id_token = this.props.idToken;
    console.log(`id_token은 ${id_token}`);

    const { email, name, picture } = jwtDecode(id_token);
    console.log(`email은 ${email}`);
    console.log(`name은 ${name}`);
    console.log(`picture은 ${picture}`);
    this.setState({
      email,
      name,
      picture
    })

    // console.log(userInfo.data);
    // console.log(this.state.name);
  }

  componentDidMount() {
    this.getGoogleUserInfo()
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
        <dd>
          <img src={this.state.picture} />
        </dd>
      </>
    );
  };
}

export default Mypage;
