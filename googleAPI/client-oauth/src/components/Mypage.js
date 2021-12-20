import React, { Component } from "react";

//구글 openID로 받은 idToken이 jwt방식으로 된 거라 decode해주기 위해 import받는 모듈
import jwtDecode from "jwt-decode";

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // TODO: GitHub API 를 통해서 받아올 수 있는 정보들 중에서
      // 저희 유저 DB 만들 때 필요하다고 생각된 부분인데, 만약 더 필요한 게 있다 싶으면 말해주세요
      email: '',
      name: '',
      picture: ''
    }
  }

  async getGoogleUserInfo() {
    const id_token = this.props.idToken;
    console.log(`id_token은 ${id_token}`);

    const decode = jwtDecode(id_token);
    console.log(`decode의 값은 이러하다\n`);
    console.log(decode);
    const { email, name, picture } = decode;
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
