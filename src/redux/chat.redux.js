import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')


// action type

const MSG_LIST = 'MSG_LIST' // 获取聊天列表
const MSG_RECV = 'MSG_RECV' // 读取信息
const initState = {
  chatmsg: [],
  unread:0 // 实时维护未读消息的数量
}

//reducer

export function chat (state = initState, action){
  switch(action.type){
    case MSG_LIST:
    return {...state, chatmsg: action.payload, unread: action.payload.filter(v=>!v.read).length}
    case MSG_RECV:
      return {...state, chatmsg: [...state.chatmsg,action.payload], unread:state.unread+1}
    default:
      return state
  }
}

// action creator
function msgList(msgs){
  return {type: 'MSG_LIST',payload: msgs}
}

function msgRecv(msg){
    return {type:MSG_RECV, payload:msg}
}






//操作数据的方法
export function getMsgList(){
  return dispatch=>{
    axios.get('/user/getmsglist')
    .then(res => {
      if(res.status == 200 && res.data.code == 0){
        dispatch(msgList(res.data.msgs))
      }
    })
  }
}

// 发送给后端消息
export function sendMsg({from, to, msg}){
  return dispatch =>{
    socket.emit('sendmsg',{from, to, msg})
  }
}

//接受后端返回的消息

export function recvMsg(){
  return dispatch=>{
    socket.on('recvmsg', function(data){
      console.log('recvmsg',data)
      dispatch(msgRecv(data))
    })
  }
}