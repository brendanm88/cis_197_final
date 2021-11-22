import React, { useState, useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'
import axios from 'axios'
import {
  Title,
  loginLinkStyle,
  QButton,
  LogoutButton,
  MButton,
  modalStyle,
} from '../styles/StyleComps'

import Modal from './Modal'
import Question from './Question'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [modal, setModal] = useState(false)
  const [questions, setQuestions] = useState([])
  const [shownID, setShownID] = useState('')

  const showModal = () => {
    setModal(!modal)
  }

  // update questions on internval
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('/api/questions') // GET request
      setQuestions(data)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // check if user logged in
  useEffect(async () => {
    try {
      const { data } = await axios.post('/account/isLoggedIn', { username, password })
      if (data !== 'Error: user not authenticated') {
        setUsername(data)
      } else {
        setUsername('')
      }
    } catch (err) {
      setUsername('')
    }
  }, [])

  // logout post request
  const logoutUser = async () => {
    try {
      const { data } = await axios.post('/account/logout', { username, password })
      if (data === 'user is logged out') {
        setUsername('')
      }
    } catch (err) {
      // throw alert!
      window.alert('user logout has problems')
    }
  }

  // if someone logged in
  if (username !== '') {
    return (
      <div>
        <Title>Ask Questions, Get Answers</Title>
        <LogoutButton type="submit" onClick={logoutUser}>
          Logout
        </LogoutButton>
        <h2 style={{
          float: 'right',
          margin: '1em',
          position: 'relative',
          top: '-17px',
          right: '90px',
          fontSize: '1.5em',
          color: '#474747',
        }}
        >
          &nbsp;&nbsp;Hello&nbsp;
          {username}
          !
        </h2>
        <br />
        <br />
        <br />
        <MButton style={{ background: '#c4ecff' }} type="submit" onClick={() => setModal(true)}>
          Add new question +
        </MButton>
        <Modal style={modalStyle} show={modal} author={username} onClose={showModal} />
        <>
          {questions.map(q => (
            <div key={q._id}>
              <br />
              <QButton
                style={{
                  background: (q._id === shownID) ? '#c4ecff' : '#ebebeb',
                }}
                type="submit"
                onClick={() => ((q._id === shownID) ? setShownID('') : setShownID(q._id))}
              >
                {q.questionText}
              </QButton>
              <Question question={q} shown={q._id === shownID} loggedIn={username !== null && username !== ''} />
            </div>
          ))}
        </>
      </div>
    )
  }
  // if not logged in, cannot add a question yet
  return (
    <div>
      <Title>Ask questions, get answers!</Title>
      <Link to="/login" style={loginLinkStyle}>Login to submit or answer a question!</Link>
      <br />
      <>
        {questions.map(q => (
          <div key={q._id}>
            <br />
            <QButton
              style={{
                background: (q._id === shownID) ? '#c4ecff' : '#ebebeb',
              }}
              type="submit"
              onClick={() => ((q._id === shownID) ? setShownID('') : setShownID(q._id))}
            >
              {q.questionText}
            </QButton>
            <Question question={q} shown={q._id === shownID} loggedIn={username !== null && username !== ''} />
          </div>
        ))}
      </>
    </div>
  )
}

export default Home
