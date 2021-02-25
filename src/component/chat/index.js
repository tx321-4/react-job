import React from 'react'
import { NavBar, List, InputItem, Icon,Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../utils'
//import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', msg: [] }
  }
  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }

    // socket.on('recvmsg',(data) =>{
    //   // console.log(data)
    //   this.setState({
    //     msg:[...this.state.msg, data.text]
    //   })
    // })
  }
  // grid bug官方推荐解决方案： 手动发送一个事件
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  handleSubmit () {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    //socket.emit('sendmsg', {text:this.state.text}) //触发事件
    this.setState({ text: '', showEmoji: false })
  }
  render () {
    const emoji = '😁 😂 😃 😄 😅 😆 😇 😈 😉 😊 😋 😌 😍 😎 😏 😐 😒 😓 😔 😖 😘 😚 😜 😝 😞 😠 😡 😢 😣 😤 😥 😨 😩 😪 😫 😭 😰 😱 😲 😳 😵 😶 😷 😸 😹 😺 😻 😼 😽 😾 😿 🙀 🙅 🙆 🙇 🙈 🙉 🙊 🙋 🙌 🙍 🙎 🙏 🚀 🚃 🚄 🚅 🚇 🚉 🚌 🚏 🚑 🚒 🚓 🚕 🚗 🚙 🚚 🚢 🚤 🚥 🚧 🚨 🚩 🚪 🚫 🚬 🚭 🚲 🚶 🚹 🚺 🚻 🚼 🚽 🚾 🛀 '
      .split(" ")
      .filter(v => v)
      .map(v => ({ text: v }));
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)
    return (

      // <h2>{this.props.match.params.user}</h2>
      <div id="chat-page">
        <NavBar mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}>
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`).default
          return v.from == userid ? (
            <List key={v._id}>
              <Item
                thumb={avatar}>
                {v.content}
              </Item>
            </List>
          ) : (
              <List key={v._id}>
                <Item
                  extra={<img src={avatar} alt="头像" />} className='chat-me'>
                  {v.content}
                </Item>
              </List>

            )
        })}
        <div style={{ marginTop: 44 }}></div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({
                  text: v
                })
              }}
              extra={
                <div>
                  <span style={{marginRight: 15}}
                    onClick={()=>{
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >😃</span>
              <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
            }
            >信息</InputItem>
          </List>
          {this.state.showEmoji ? <Grid
            
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el =>{
              this.setState({
                text: this.state.text + el.text
              })
            }}
          />: null}
        </div>
      </div>
    )
  }
}

export default Chat;