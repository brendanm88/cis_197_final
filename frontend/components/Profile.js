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
  SmallTitle,
  DeleteButton,
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
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [tempDesc, setTempDesc] = useState('')
  const [tempImg, setTempImg] = useState('')

  const showModal = async () => {
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

  // add friend
  const addFriend = async () => {
    try {
      const { data } = await axios.post('/account/friend', { friendUser: tempFriend })
      if (data === 'friend added successfully') {
        // continue
      } else {
        window.alert(data)
      }
    } catch (err) {
      // throw alert!
      window.alert('user friend add has problems')
    }
  }

  // get user
  useEffect(async () => {
    try {
      const { data } = await axios.post('/account/user', { username })
      if (data !== 'getting user has problems') {
        setUserType(data.type)
        if (data.image) {
          setImg(data.image)
        }
        if (data.desc) {
          setDesc(data.desc)
        }
      } else {
        setUserType('')
        setImg('')
        setDesc('no user description entered')
        // setPosts([])
      }
    } catch (err) {
      setUserType('')
      setImg('')
      setDesc('no user description entered')
      // setPosts([])
    }
  }, [username, userType])

  // get user friends
  useEffect(async () => {
    try {
      let { data } = await axios.post('/account/user', { username })
      if (data !== 'getting user has problems') {
        if (data.friends) {
          data.friends.forEach(async f => {
            const friend = {}
            friend.username = f
            try {
              data = await axios.post('/account/user', { username: f })
              if (data !== 'getting user has problems') {
                if (data.data.image) {
                  friend.image = data.data.image
                }
                if (data.data.desc) {
                  friend.desc = data.data.desc
                }
                if (data.data.type) {
                  friend.type = data.data.type
                }
              } else {
                friend.image = ''
                friend.desc = ''
                friend.type = ''
              }
            } catch (err) {
              window.alert(err)
            }
            if (!friends.includes(friend)) {
              setFriends(fr => [...fr, friend])
            }
          })
        }
      } else {
        setFriends([])
      }
    } catch (err) {
      setFriends([])
    }
  }, [username])

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
  const updateImg = async () => {
    try {
      const { data } = await axios.post('/account/describe', { image: tempImg })
      if (data === 'user description updated') {
        setImg(tempImg)
      } else {
        window.alert(data)
      }
    } catch (err) {
      // throw alert!
      window.alert('user image update has problems')
    }
  }

  // change type
  const updateDesc = async () => {
    try {
      const { data } = await axios.post('/account/describe', { desc: tempDesc })
      if (data === 'user description updated') {
        setDesc(tempDesc)
      } else {
        window.alert(data)
      }
    } catch (err) {
      // throw alert!
      window.alert('user description update has problems')
    }
  }

  const removeFriend = async e => {
    console.log(e)
    try {
      const { data } = await axios.post('/account/removeFriend', { username: e.u, friendUser: e.fu })
      if (data === 'friend removed successfully') {
        // continue
      } else {
        window.alert(data)
      }
    } catch (err) {
      window.alert('removing followed user has problems')
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
        Your user description:
      </SubTitle>
      <br />
      <SmallTitle>
        <img
          src={img}
          alt=""
          onError={e => {
            e.target.style.display = null
          }}
          style={{
            maxWidth: '30vw',
            maxHeight: '30vw',
            width: 'auto',
            height: 'auto',
            border: '2px solid darkgrey',
            borderRadius: '2px',
            margin: '0.4em',
          }}
        />
        <br />
        {desc}
        <br />
        <br />
        <div>
          Enter a new image url to update your image!
          <InputWrap onChange={e => setTempImg(e.target.value)} />
          <TypeButton type="submit" onClick={updateImg}>
            Submit
          </TypeButton>
        </div>
        <div>
          Enter a new description!
          <InputWrap onChange={e => setTempDesc(e.target.value)} />
          <TypeButton type="submit" onClick={updateDesc}>
            Submit
          </TypeButton>
        </div>
      </SmallTitle>
      <SubTitle>
        Posts:
      </SubTitle>
      <MButton style={{ background: '#efefef' }} type="submit" onClick={showModal}>
        Add new post +
      </MButton>
      <Modal style={modalStyle} show={modal} author={username} onClose={showModal} />
      <br />
      <div>
        {posts.map(p => (
          <div key={p._id}>
            <Post post={p} add={false} deletable />
          </div>
        ))}
      </div>
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
        Users you are following:
      </SubTitle>
      <div>
        Enter a username to follow a new user!
        <InputWrap onChange={e => setTempFriend(e.target.value)} />
        <TypeButton
          type="submit"
          onClick={() => {
            addFriend()
            window.location.reload(false)
          }}
        >
          Follow new user
        </TypeButton>
        <br />
        <br />
        <br />
        {/* console.log(friends) */ }
        {friends.map(f => (
          <div key={f.username}>
            <SmallTitle>
              Username:&nbsp;
              {f.username}
              <br />
              <img
                src={f.image}
                alt=""
                onError={e => {
                  e.target.style.display = null
                }}
                style={{
                  maxWidth: '20vw',
                  maxHeight: '20vw',
                  width: 'auto',
                  height: 'auto',
                  border: '2px solid darkgrey',
                  borderRadius: '2px',
                  margin: '0.4em',
                }}
              />
              <br />
              Description:&nbsp;
              {f.desc}
              <br />
              {f.username}
              &apos;s favorite activity is&nbsp;
              {f.type}
              !
              <br />
              <DeleteButton type="submit" onClick={() => removeFriend({ u: username, fu: f.username })}>
                Remove
              </DeleteButton>
              <br />
            </SmallTitle>
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
