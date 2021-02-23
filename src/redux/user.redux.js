import axios from 'axios';
import {getRedirectPath} from '../utils'
// action type

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user:'',
  pwd:'',
  type: ''
}

//reducer
export function user(state = initState, action){
  switch(action.type){
    case REGISTER_SUCCESS:
      return {...state, msg:'', redirectTo: getRedirectPath(action.payload),isAuth: true,...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg: action.msg}
    case LOGIN_SUCCESS: 
      return {...state, msg:'', redirectTo: getRedirectPath(action.payload),isAuth: true,...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case LOGOUT:
      return {...initState, redirectTo:'/login'}
    default: 
      return state
  }
  // return state
}

// action 
function registerSuccess(data){
  return {type: REGISTER_SUCCESS, payload: data}
}
function errorMsg(msg){
  return {msg, type: ERROR_MSG}
}
function loginSuccess(data){
  return {type: LOGIN_SUCCESS, payload: data}
}

export function loadData(userinfo){
  return {type: LOAD_DATA, payload: userinfo}
}
export function logoutSumbit(){
  return { type: LOGOUT}
}


export function register({user, pwd, repeatpwd, type}){
  if(!user|| !pwd|| !type){
    return errorMsg('用户名密码必须输入')
  }
  if(pwd!== repeatpwd){
    return errorMsg('密码和确认密码不同')
  }


  //redux 异步操作数据
  return dispatch =>{
    axios.post('/user/register', {user,pwd,type})
    .then(res =>{
      if(res.status == 200 && res.data.code ==0){
        dispatch(registerSuccess({user,pwd,type}))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 登录 异步action
export function login({user,pwd}){
  if(!user|| !pwd){
    return errorMsg('用户名密码必须输入')
  }
  
  // redux异步操作数据
  return dispatch =>{
    axios.post('/user/login',{user,pwd})
    .then(res=>{
      if(res.status==200 && res.data.code ==0){
        
        dispatch(loginSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
