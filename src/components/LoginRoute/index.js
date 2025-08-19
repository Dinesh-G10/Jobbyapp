import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const validUser = {
  username: 'Dinesh',
  password: 'Dinesh@2025',
}

const dummyToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJ1c2VybmFtZSI6ImRpbmVzaCIsImlhdCI6MTY5MjAwMDAwMH0.' +
  'abc123xyzFakeSignature'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isTrue: false,
    showSubmiterror: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errormsg => {
    console.log(errormsg)

    this.setState({isTrue: true, showSubmiterror: errormsg})
  }

  submitButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const fetchData = await fetch(url, options)
    const response = await fetchData.json()
    if (fetchData.ok === true) {
      this.onSubmitSuccess(response.jwt_token)
    } else {
      this.onSubmitFailure(response.error_msg)
    }
  }

  render() {
    const {username, password, isTrue, showSubmiterror} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-inner-container">
          <img
            className="website-login-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form className="submit-form" onSubmit={this.submitButton}>
            <label className="input-label" htmlFor="name">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              type="text"
              className="input-search"
              id="name"
              placeholder="Username"
            />
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onChangePassword}
              type="text"
              className="input-search"
              id="password"
              placeholder="Password"
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {isTrue && <p className="error-msg">* {showSubmiterror}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
