let checkUser = function(loginParam) {
  // Mock check user data, you can import database to query user data
  if (
    loginParam.username === 'Sroot' &&
    loginParam.password === 'sr33%1' &&
    loginParam.mobile === '19999999999' &&
    loginParam.verifyCode === 'e5f6'
  ) {
    return true
  } else {
    return false
  }
}
let checkUserState = function(cookiesParam) {
  // Mock check user data, you can import database to query user data
  return cookiesParam.username === 'Sroot' && cookiesParam.mobile === '19999999999'
}

module.exports = {
  checkUser,
  checkUserState,
}
