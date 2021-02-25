import React from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button,Modal } from 'antd-mobile';

import Logo from '../../component/logo';
import {login} from '../../redux/user.redux'
import jobForm from '../../component/job-form'

@connect(
  state => state.user,
  {login}
)
@jobForm
 class Login extends React.Component {

  register =() =>{
    this.props.history.push('/register')
    
  }
  handleLogin = ()=>{
    this.props.login(this.props.state)
    
  }
  render () {
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!=="/login" ? <Redirect to={this.props.redirectTo}/> :null}
        <Logo />
        <WingBlank>
        
          <List>
            <InputItem onChange={v =>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem type="password" onChange={v =>this.props.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>

    )
  }
}

export default Login