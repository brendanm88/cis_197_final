import React, { useState, useEffect } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'
import axios from 'axios'
import {
  Title,
  LogoutButton,
  linkStyle,
  ProfileLink,
  InputWrap,
  TypeButton,
  SubTitle,
  MButton,
  modalStyle,
  QButton,
} from '../styles/StyleComps'
import Modal from './Modal'
import Post from './Post'

const Profile = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [friends, setFriends] = useState([])
  const [tempType, setTempType] = useState('')
  const [userType, setUserType] = useState('')
  const [tempFriend, setTempFriend] = useState('')
  const [modal, setModal] = useState(false)

  const showModal = () => {
    setModal(!modal)
  }

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

  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.post('/account/posts', { username }) // GET request
      setPosts(data)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [username])

  // get user
  useEffect(async () => {
    try {
      const { data } = await axios.post('/account/user', { username })
      if (data !== 'getting user has problems') {
        // console.log(data)
        setUserType(data.type)
        if (data.friends) {
          setFriends(data.friends)
        }
      } else {
        setUserType('')
        setFriends([])
        // setPosts([])
      }
    } catch (err) {
      setUserType('')
      setFriends([])
      // setPosts([])
    }
  }, [username, userType])

  // logout post request
  const logoutUser = async () => {
    try {
      const { data } = await axios.post('/account/logout', { username, password })
      if (data === 'user is logged out') {
        // reroute back to home page!
        navigate('/', { replace: true })
      } else {
        window.alert(data)
      }
    } catch (err) {
      // throw alert!
      window.alert('user logout has problems')
    }
  }

  // change type
  const updateType = async () => {
    try {
      const { data } = await axios.post('/account/type', { type: tempType })
      if (data === 'user type success') {
        setUserType(tempType)
      } else {
        window.alert(data)
      }
    } catch (err) {
      // throw alert!
      window.alert('user type update has problems')
    }
  }

  // change type
  const addFriend = async () => {
    try {
      const { data } = await axios.post('/account/friend', { friendUser: tempFriend })
      if (data === 'friend added successfully') {
        setFriends([...friends, tempFriend])
      } else {
        window.alert(data)
      }
    } catch (err) {
      // throw alert!
      window.alert('user friend add has problems')
    }
  }

  return (
    <div>
      <Title>
        Hello&nbsp;
        {username}
        !
      </Title>
      <LogoutButton type="submit" onClick={logoutUser}>
        Logout
      </LogoutButton>
      <ProfileLink href="/">Back to Home</ProfileLink>
      <br />
      <br />
      <br />
      <br />
      <SubTitle>
        Posts:
      </SubTitle>
      <MButton style={{ background: '#efefef' }} type="submit" onClick={() => setModal(true)}>
        Add new post +
      </MButton>
      <Modal style={modalStyle} show={modal} author={username} onClose={showModal} />
      <br />
      {posts.map(p => (
        <div key={p._id}>
          <Post post={p} add={false} />
        </div>
      ))}
      <br />
      <br />
      <br />
      <SubTitle>
        {username}
        &apos;s favorite activity is&nbsp;
        {userType}
        !
      </SubTitle>
      <br />
      <div>
        Want to set or update your favorite activity?
        <InputWrap onChange={e => setTempType(e.target.value)} />
        <TypeButton type="submit" onClick={updateType}>
          Submit
        </TypeButton>
      </div>
      <br />
      <br />
      <SubTitle>
        Friends List:
      </SubTitle>
      <p>
        Enter a username to add a friend!
        <InputWrap onChange={e => setTempFriend(e.target.value)} />
        <TypeButton type="submit" onClick={addFriend}>
          Add Friend
        </TypeButton>
        {friends.map(f => (
          <li key={f}>
            {f}
          </li>
        ))}
      </p>
    </div>
  )
}

export default Profile
