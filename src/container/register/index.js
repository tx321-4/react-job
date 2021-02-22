import React from 'react';

import Logo from '../../component/logo';
import { List, InputItem,Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius' // 或者boss
    }
  }
  handleChange(key, val){
    this.setState({
      [key]: val
 })
  }
  handleRegister = ()=>{
    console.log(this.state);
  }
  render () {
    return (
      <div>
        <Logo />
        <WingBlank>
         
            <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.type == 'genius'} onChange={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.type == 'boss'} onChange={() => this.handleChange('type', 'boss')}>Boss</RadioItem>

          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>

    )
  }
}