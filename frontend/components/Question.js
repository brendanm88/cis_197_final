import React, { useState } from 'react'
import axios from 'axios'
import { AnswerButton, questionStyle, AnsInputWrap } from '../styles/StyleComps'

const Question = ({
  question,
  shown,
  loggedIn,
}) => {
  const [content, setContent] = useState('')
  // const [answering, setAnswering] = useState(false)
  const {
    _id,
    author,
    answer,
    questionText,
  } = question

  // post request for answering question
  const addAnswer = async id => {
    if (content === '') {
      window.alert('empty answer!')
    } else {
      try {
        const { data } = await axios.post('/api/questions/answer', { id, answer: content })
        if (data === 'question answer updated') {
          // continue
          // setAnswering(false)
        }
      } catch (err) {
        // throw alert!
        window.alert('answering the question has problems')
      }
    }
  }

  // only show question if clicked, if logged in show answer option
  if (shown) {
    if (loggedIn) {
      return (
        <div style={questionStyle}>
          <h2 style={{ height: 'fit-content', 'word-wrap': 'break-word', 'text-align': 'center' }}>
            {questionText}
          </h2>
          <h3>
            Author:
          </h3>
          <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
            {author}
          </p>
          <h3>
            Answer:
          </h3>
          <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
            {answer}
          </p>
          <h3>
            Answer this question:
          </h3>
          <AnsInputWrap onChange={e => setContent(e.target.value)} />
          <br />
          <AnswerButton type="submit" onClick={() => addAnswer(_id)}>
            Submit answer
          </AnswerButton>
        </div>
      )
    }
    return (
      <div style={questionStyle}>
        <h2 style={{ height: 'fit-content', 'word-wrap': 'break-word', 'text-align': 'center' }}>
          {questionText}
        </h2>
        <h3>
          Author:
        </h3>
        <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
          {author}
        </p>
        <h3>
          Answer:
        </h3>
        <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
          {answer}
        </p>
      </div>
    )
  }
  return null
}

export default Question
