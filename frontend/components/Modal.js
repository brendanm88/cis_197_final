import React, { useState } from 'react'
import axios from 'axios'
import { QuesInputWrap, BasicButton } from '../styles/StyleComps'

const Modal = ({
  show,
  author,
  onClose,
  style,
}) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const addPost = async () => {
    if (content === '' || title === '') {
      window.alert('empty title or content!')
    } else {
      try {
        const { data } = await axios.post('/api/posts/add', {
          imageURL: image,
          postTitle: title,
          postText: content,
          author,
        })
        if (data === 'post created') {
          // close modal
          onClose()
        }
      } catch (err) {
        // throw alert!
        window.alert('adding a post has problems')
      }
    }
  }

  if (!show) {
    return null
  }
  // display if showing
  return (
    <div style={style}>
      <h3>Make a new post!</h3>
      Title:
      <QuesInputWrap onChange={e => setTitle(e.target.value)} />
      <br />
      Post text:
      <QuesInputWrap onChange={e => setContent(e.target.value)} />
      <br />
      Image URL:
      <QuesInputWrap onChange={e => setImage(e.target.value)} />
      <br />
      <BasicButton
        type="submit"
        onClick={() => addPost()}
      >
        Submit
      </BasicButton>
      <BasicButton
        type="submit"
        onClick={() => onClose()}
      >
        Cancel
      </BasicButton>
    </div>
  )
}

export default Modal
