export function getRedirectPath({type, avatar}){
  // 根据用户信息，返回跳转地址
  // 判断user.type: boss / genius
  // 判断user.avatar: bossinfo / geniusinfo
  let url = (type === 'boss') ? '/boss' : '/genius'
  if(!avatar){
    url +="info"
  }
  return url
}