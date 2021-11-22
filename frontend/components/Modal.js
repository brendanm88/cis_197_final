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

  const addQuestion = async () => {
    if (content === '') {
      window.alert('empty question!')
    } else {
      try {
        const { data } = await axios.post('/api/questions/add', { questionText: content, author })
        if (data === 'question created') {
          // close modal
          onClose()
        }
      } catch (err) {
        // throw alert!
        window.alert('adding a question has problems')
      }
    }
  }

  if (!show) {
    return null
  }
  // display if showing
  return (
    <div style={style}>
      <h3>Post a question!</h3>
      <QuesInputWrap onChange={e => setContent(e.target.value)} />
      <br />
      <BasicButton
        type="submit"
        onClick={() => addQuestion()}
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
