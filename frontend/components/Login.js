import React, { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'
import axios from 'axios'
import {
  Title,
  LoginButton,
  InputWrap,
  linkStyle,
} from '../styles/StyleComps'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // post request for login
  const loginUser = async () => {
    if (username === '' || password === '') {
      window.alert('please enter a username and password')
    } else {
      try {
        const { data } = await axios.post('/account/login', { username, password })
        if (data === 'user logged in successfully') {
          // reroute back to home page!
          navigate('/', { replace: true })
        } else {
          window.alert(data)
        }
      } catch (err) {
        // throw alert!
        window.alert('user login has problems')
      }
    }
  }

  // return component, show inputs and text
  return (
    <div>
      <Title>Login!</Title>
      Enter your username and password!
      <br />
      Username:
      <InputWrap onChange={e => setUsername(e.target.value)} />
      <br />
      Password:
      <InputWrap onChange={e => setPassword(e.target.value)} />
      <br />
      <LoginButton type="submit" onClick={loginUser}>
        Login
      </LoginButton>
      <p>
        Don&apos;t have an account?
        <Link to="/signup" style={linkStyle}>Signup</Link>
      </p>
    </div>
  )
}

export default Login
