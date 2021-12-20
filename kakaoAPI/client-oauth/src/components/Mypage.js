import React, { Component } from "react";
import axios from 'axios';

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

  async getKakaoUserInfo() {
    this.setState({
      picture: this.props.profile
    })
  }

  componentDidMount() {
    this.getKakaoUserInfo()
  }

  render() {
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
