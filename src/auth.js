const Auth = {

  isAuthenticated: localStorage.getItem('userAccessToken') ? true : false,


  authenticate(userToken, username, callback) {
    localStorage.setItem('userAccessToken', userToken);
    localStorage.setItem('username', username);


    this.isAuthenticated = true;
    if (typeof callback == "function")
      callback();
  },

  signout(callback) {
    this.isAuthenticated = false;
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('username');

    if (typeof callback == "function")
      callback();
  }
}


export default Auth;