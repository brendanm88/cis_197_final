import React, { useState } from 'react'
import axios from 'axios'
import { AnswerButton, postStyle, AnsInputWrap } from '../styles/StyleComps'

const Post = ({
  post,
  add,
  // shown,
  // loggedIn,
}) => {
  const [content, setContent] = useState('')
  const {
    _id,
    author,
    type,
    postText,
    postTitle,
    imageURL,
    comments,
  } = post

  // post request for answering question
  const addReply = async id => {
    if (content === '') {
      window.alert('empty reply!')
    } else {
      try {
        const { data } = await axios.post('/api/posts/comment', { id, comment: content })
        if (data === 'post comments updated') {
          // continue
        }
      } catch (err) {
        // throw alert!
        window.alert('answering the question has problems')
      }
    }
  }
  if (add) {
    if (imageURL && imageURL !== '') {
      return (
        <div style={postStyle}>
          <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
            {postTitle}
          </h2>
          <img
            src={imageURL}
            alt=" "
            onError={e => {
              e.target.style.display = null
            }}
            style={{
              maxWidth: '70vw',
              maxHeight: '70vw',
              width: 'auto',
              height: 'auto',
              border: '2px solid darkgrey',
              borderRadius: '2px',
            }}
          />
          <p style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
            {postText}
            &nbsp;-
            {author}
          </p>
          <h3>
            Comments:
          </h3>
          <p style={{ height: 'fit-content', wordWrap: 'break-word' }}>
            {comments.map(c => (
              <li key={c._id}>
                {c.comment}
              &nbsp;-
                {c.author}
              </li>
            ))}
          </p>
          <h4>
            Add a comment:
          </h4>
          <AnsInputWrap onChange={e => setContent(e.target.value)} />
          <AnswerButton type="submit" onClick={() => addReply({ id: _id })}>
            Submit Comment
          </AnswerButton>
        </div>
      )
    }
    return (
      <div style={postStyle}>
        <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
          {postTitle}
        </h2>
        <p style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
          {postText}
          &nbsp;-
          {author}
        </p>
        <h3>
          Comments:
        </h3>
        <p style={{ height: 'fit-content', wordWrap: 'break-word' }}>
          {comments.map(c => (
            <li key={c._id}>
              {c.comment}
              &nbsp;-
              {c.author}
            </li>
          ))}
        </p>
        <h4>
          Add a comment:
        </h4>
        <AnsInputWrap onChange={e => setContent(e.target.value)} />
        <AnswerButton type="submit" onClick={() => addReply({ id: _id })}>
          Submit Comment
        </AnswerButton>
      </div>
    )
  }
  if (imageURL && imageURL !== '') {
    return (
      <div style={postStyle}>
        <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
          {postTitle}
        </h2>
        <img
          src={imageURL}
          alt=" "
          onError={e => {
            e.target.style.display = null
          }}
          style={{
            maxWidth: '70vw',
            maxHeight: '70vw',
            width: 'auto',
            height: 'auto',
            border: '2px solid darkgrey',
            borderRadius: '2px',
          }}
        />
        <p style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
          {postText}
          &nbsp;-
          {author}
        </p>
        <h3>
          Comments:
        </h3>
        <p style={{ height: 'fit-content', wordWrap: 'break-word' }}>
          {comments.map(c => (
            <li key={c._id}>
              {c.comment}
            &nbsp;-
              {c.author}
            </li>
          ))}
        </p>
      </div>
    )
  }
  return (
    <div style={postStyle}>
      <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
        {postTitle}
      </h2>
      <p style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
        {postText}
        &nbsp;-
        {author}
      </p>
      <h3>
        Comments:
      </h3>
      <p style={{ height: 'fit-content', wordWrap: 'break-word' }}>
        {comments.map(c => (
          <li key={c._id}>
            {c.comment}
            &nbsp;-
            {c.author}
          </li>
        ))}
      </p>
    </div>
  )

  // only show question if clicked, if logged in show answer option
  // if (shown) {
  //   if (loggedIn) {
  //     return (
  //       <div style={postStyle}>
  //         <h2 style={{ height: 'fit-content', 'word-wrap': 'break-word', 'text-align': 'center' }}>
  //           {questionText}
  //         </h2>
  //         <h3>
  //           Author:
  //         </h3>
  //         <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
  //           {author}
  //         </p>
  //         <h3>
  //           Answer:
  //         </h3>
  //         <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
  //           {answer}
  //         </p>
  //         <h3>
  //           Answer this question:
  //         </h3>
  //         <AnsInputWrap onChange={e => setContent(e.target.value)} />
  //         <br />
  //         <AnswerButton type="submit" onClick={() => addAnswer(_id)}>
  //           Submit answer
  //         </AnswerButton>
  //       </div>
  //     )
  //   }
  //   return (
  //     <div style={postStyle}>
  //       <h2 style={{ height: 'fit-content', 'word-wrap': 'break-word', 'text-align': 'center' }}>
  //         {questionText}
  //       </h2>
  //       <h3>
  //         Author:
  //       </h3>
  //       <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
  //         {author}
  //       </p>
  //       <h3>
  //         Answer:
  //       </h3>
  //       <p style={{ height: 'fit-content', 'word-wrap': 'break-word' }}>
  //         {answer}
  //       </p>
  //     </div>
  //   )
  // }
  // return null
}

export default Post
