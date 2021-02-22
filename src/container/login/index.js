import React from 'react';

import Logo from '../../component/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

export default class Login extends React.Component {
  register =() =>{
    this.props.history.push('/register')
  }
  render () {
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户
            </InputItem>
            <WhiteSpace/>
            <InputItem type="password">密码
            </InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary">登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>

    )
  }
}