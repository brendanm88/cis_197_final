import React, { useState, useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'
import axios from 'axios'
import {
  Title,
  loginLinkStyle,
  SubTitle,
  CButton,
  LogoutButton,
  BackButton,
  modalStyle,
  ProfileLink,
} from '../styles/StyleComps'

import Post from './Post'
// import Profile from '../components/Profile'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [cat, setCat] = useState('')
  const [friends, setFriends] = useState('')

  // update posts on interval
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('/api/posts') // GET request
      setPosts(data)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // update categories on interval
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('/api/postTypes') // GET request
      setCategories(data)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  // update friends on interval
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.post('/account/friends', { username }) // GET request
      setFriends(data)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [username])

  // check if user logged in
  useEffect(async () => {
    try {
      const { data } = await axios.post('/account/isLoggedIn', { username, password })
      if (data !== 'Error: user is not authenticated') {
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

  if (username !== '') {
    if (cat === 'All') {
      return (
        <div>
          <Title>Penn-Gram</Title>
          <ProfileLink href="/profile">View Profile</ProfileLink>
          <LogoutButton type="submit" onClick={logoutUser}>
            Logout
          </LogoutButton>
          <h2 style={{
            float: 'left',
            margin: '1em',
            position: 'absolute',
            top: '140px',
            fontSize: '1.5em',
            color: '#474747',
            wordWrap: 'break-line',
          }}
          >
          &nbsp;&nbsp;Hello&nbsp;
            {username}
            !
            <br />
            Go to your profile to add a post!
          </h2>
          <br />
          <br />
          <br />
          <br />
          <br />
          <BackButton
            type="submit"
            onClick={() => {
              setCat('')
            }}
          >
            Back
          </BackButton>
          <SubTitle>
            {cat}
            &nbsp;Posts
          </SubTitle>
          <>
            {posts.map(p => (
              <div key={p._id}>
                <Post post={p} add deletable={username === p.author} />
              </div>
            ))}
          </>
        </div>
      )
    } if (cat === 'Following') {
      return (
        <div>
          <Title>Penn-Gram</Title>
          <ProfileLink href="/profile">View Profile</ProfileLink>
          <LogoutButton type="submit" onClick={logoutUser}>
            Logout
          </LogoutButton>
          <h2 style={{
            float: 'left',
            margin: '1em',
            position: 'absolute',
            top: '140px',
            fontSize: '1.5em',
            color: '#474747',
            wordWrap: 'break-line',
          }}
          >
          &nbsp;&nbsp;Hello&nbsp;
            {username}
            !
            <br />
            Go to your profile to add a post!
          </h2>
          <br />
          <br />
          <br />
          <br />
          <br />
          <BackButton
            type="submit"
            onClick={() => {
              setCat('')
            }}
          >
            Back
          </BackButton>
          <SubTitle>
            {/* {cat}
            &nbsp;Posts */}
            Posts from users you&apos;re following:
          </SubTitle>
          <>
            {posts.map(p => {
              if (friends.includes(p.author)) {
                return (
                  <div key={p._id}>
                    <Post post={p} add deletable={username === p.author} />
                  </div>
                )
              }
              return null
            })}
          </>
        </div>
      )
    } if (cat !== '') {
      return (
        <div>
          <Title>Penn-Gram</Title>
          <ProfileLink href="/profile">View Profile</ProfileLink>
          <LogoutButton type="submit" onClick={logoutUser}>
            Logout
          </LogoutButton>
          <h2 style={{
            float: 'left',
            margin: '1em',
            position: 'absolute',
            top: '140px',
            fontSize: '1.5em',
            color: '#474747',
            wordWrap: 'break-line',
          }}
          >
          &nbsp;&nbsp;Hello&nbsp;
            {username}
            !
            <br />
            Go to your profile to add a post!
          </h2>
          <br />
          <br />
          <br />
          <br />
          <br />
          <BackButton
            type="submit"
            onClick={() => {
              setCat('')
            }}
          >
            Back
          </BackButton>
          <SubTitle>
            {cat}
            &nbsp;Posts
          </SubTitle>
          <>
            {posts.map(p => {
              if (p.type !== undefined && (p.type.toLowerCase() === cat.toLowerCase())) {
                return (
                  <div key={p._id}>
                    <Post post={p} add deletable={username === p.author} />
                  </div>
                )
              }
              return null
            })}
          </>
        </div>
      )
    }
    return (
      <div>
        <Title>Penn-Gram</Title>
        <ProfileLink href="/profile">View Profile</ProfileLink>
        <LogoutButton type="submit" onClick={logoutUser}>
          Logout
        </LogoutButton>
        <h2 style={{
          float: 'left',
          margin: '1em',
          position: 'absolute',
          top: '140px',
          fontSize: '1.5em',
          color: '#474747',
          wordWrap: 'break-line',
        }}
        >
          &nbsp;&nbsp;Hello&nbsp;
          {username}
          !
          <br />
          Go to your profile to add a post!
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <SubTitle>
          Select a category to see posts!
        </SubTitle>
        <>
          {categories.map(c => (
            <div key={c}>
              <CButton
                type="submit"
                onClick={() => {
                  setCat(c)
                }}
              >
                {c}
              </CButton>
            </div>
          ))}
        </>
      </div>
    )
  }
  if (cat === 'All') {
    return (
      <div>
        <Title>Penn-Gram</Title>
        <Link to="/login" style={loginLinkStyle}>Login</Link>
        <h2 style={{
          float: 'right',
          margin: '1em',
          position: 'relative',
          top: '-17px',
          right: '90px',
          fontSize: '1.5em',
          color: '#474747',
          wordWrap: 'break-line',
        }}
        >
          Login to comment, go to your profile, or add a post!
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <BackButton
          type="submit"
          onClick={() => {
            setCat('')
          }}
        >
          Back
        </BackButton>
        <SubTitle>
          {cat}
          &nbsp;Posts
        </SubTitle>
        <>
          {posts.map(p => (
            <div key={p._id}>
              <Post post={p} add={false} deletable={false} />
            </div>
          ))}
        </>
      </div>
    )
  } if (cat !== '') {
    return (
      <div>
        <Title>Penn-Gram</Title>
        <Link to="/login" style={loginLinkStyle}>Login</Link>
        <h2 style={{
          float: 'right',
          margin: '1em',
          position: 'relative',
          top: '-17px',
          right: '90px',
          fontSize: '1.5em',
          color: '#474747',
          wordWrap: 'break-line',
        }}
        >
          Login to comment, go to your profile, or add a post!
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <BackButton
          type="submit"
          onClick={() => {
            setCat('')
          }}
        >
          Back
        </BackButton>
        <SubTitle>
          {cat}
          &nbsp;Posts
        </SubTitle>
        <>
          {posts.map(p => {
            if (p.type !== undefined && (p.type.toLowerCase() === cat.toLowerCase())) {
              return (
                <div key={p._id}>
                  <Post post={p} add={false} deletable={false} />
                </div>
              )
            }
            return null
          })}
        </>
      </div>
    )
  }
  return (
    <div>
      <Title>Penn-Gram</Title>
      <Link to="/login" style={loginLinkStyle}>Login</Link>
      <h2 style={{
        float: 'right',
        margin: '1em',
        position: 'relative',
        top: '-17px',
        right: '90px',
        fontSize: '1.5em',
        color: '#474747',
        wordWrap: 'break-line',
      }}
      >
        Login to comment, go to your profile, or add a post!
      </h2>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <SubTitle>
        Select a category to see posts!
      </SubTitle>
      <>
        {categories.map(c => {
          if (c === 'Following') {
            return null
          }
          return (
            <div key={c}>
              <CButton
                type="submit"
                onClick={() => {
                  setCat(c)
                }}
              >
                {c}
              </CButton>
            </div>
          )
        })}
      </>
    </div>
  )
}

export default Home
