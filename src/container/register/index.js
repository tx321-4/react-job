import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import Logo from '../../component/logo';
import jobForm from '../../component/job-form'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile';
const RadioItem = Radio.RadioItem;

@connect(
  state => state.user,
  { register }
)
@jobForm
class Register extends React.Component {
 
  componentDidMount(){
    this.props.handleChange('type','genius')
  }

  handleRegister = () => {
    // console.log(this.props.state);
    this.props.register(this.props.state)
  }
  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>

          <InputItem onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>

          <InputItem onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>

          <RadioItem checked={this.props.state.type == 'genius'} onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>

          <RadioItem checked={this.props.state.type == 'boss'} onChange={() => this.props.handleChange('type', 'boss')}>Boss</RadioItem>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>

    )
  }
}

export default Register;