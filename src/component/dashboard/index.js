import React from 'react';
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../../component/navlink'
import Boss from '../../component/boss';
import Genius from '../../component/genius'
import User from '../../component/user'
import Msg from '../../component/msg';
import { connect } from 'react-redux'

import { Switch, Route } from 'react-router-dom';

@connect(
  state => state,
)

class DashBoard extends React.Component {

  render () {
    const { pathname } = this.props.location;
    const user = this.props.user;
   //console.log(this.props)
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type == 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type == 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar mode="dard" className="fixed-header">{
          navList.find(v => v.path == pathname) ? navList.find(v => v.path == pathname).title : null}</NavBar>
        <div>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}
export default DashBoard