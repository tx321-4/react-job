import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector'
import { update } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      desc: ''
    }
  }
  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  save = () => {
    this.props.update(this.state)
  }
  render () {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname
            })
          }}>
        </AvatarSelector>
        <InputItem onChange={(v) => this.onChange('title', v)}>求职职位</InputItem>
        <TextareaItem
          rows={3}
          title="个人简历"
          autoHeight
          onChange={(v) => this.onChange('desc', v)}
        ></TextareaItem>
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default GeniusInfo