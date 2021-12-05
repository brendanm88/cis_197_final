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

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activity, setAct] = useState('')
  const [url, setURL] = useState('')
  const [desc, setDesc] = useState('')
  const navigate = useNavigate()

  // signup a new user, post request
  const signupUser = async () => {
    if (username === '' || password === '') {
      window.alert('please enter a username and password')
    } else {
      try {
        const { data } = await axios.post('/account/signup', {
          username, password, image: url, desc, type: activity,
        })
        if (data === 'user created') {
          // log in and reroute back to home page!
          await axios.post('/account/login', { username, password })
          navigate('/', { replace: true })
        } else {
          window.alert('user already exists!')
        }
      } catch (err) {
        // throw alert!
        window.alert('user creation has problems')
      }
    }
  }

  // return component, input and text as usual
  return (
    <div>
      <Title>Signup!</Title>
      Create a new user! Username must not already exist, fields marked with a * are required.
      <br />
      Username*:
      <InputWrap onChange={e => setUsername(e.target.value)} />
      <br />
      Password*:
      <InputWrap onChange={e => setPassword(e.target.value)} />
      <br />
      Image URL:
      <InputWrap onChange={e => setURL(e.target.value)} />
      <br />
      Description:
      <InputWrap onChange={e => setDesc(e.target.value)} />
      <br />
      Favorite Activity:
      <InputWrap onChange={e => setAct(e.target.value)} />
      <br />
      <LoginButton type="submit" onClick={signupUser}>
        Signup
      </LoginButton>
      <p>
        Already have an account?
        <Link to="/login" style={linkStyle}>Login</Link>
      </p>
    </div>
  )
}

export default Signup
