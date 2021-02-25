import React from 'react'
import {List, Badge} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

@withRouter
@connect(
  state => state
)
class Msg extends React.Component {

  componentDidMount () {

  }
  // 一个用户的消息自动排序，最后即最新
  getLast = (arr) => {
    return arr[arr.length - 1]
  }
  render () {
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users;
    // 按照聊天用户分组，根据chatid
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 
    const chatList = Object.values(msgGroup).sort((a,b) =>{
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last -a_last;
    })
   // console.log(chatList);

    return (
      <div>
        {chatList.map(v => {
  
          const lastItem = this.getLast(v)
          const targetId= v[0].from == userid ? v[0].to: v[0].from;
          const unreadNum = v.filter(v => !v.read && v.to == userid).length;
          return (
            <List  key={lastItem._id}>
              <Item
              
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${userinfo[targetId].avatar}.png`).default}
                arrow="horizontal"
                onClick= {() =>{
                  this.props.history.push(`/chat/${targetId}`)
                }}
                >
                  {lastItem.content}
                  <Brief>{userinfo[targetId].name}</Brief>
                </Item>
            </List>
          )
        })}
      </div>
    )
  }
}


export default Msg;