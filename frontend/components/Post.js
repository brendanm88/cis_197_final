import React, { useState } from 'react'
import axios from 'axios'
import {
  AnswerButton,
  postStyle,
  AnsInputWrap,
  DeleteButton,
} from '../styles/StyleComps'

const Post = ({
  post,
  add,
  deletable,
}) => {
  const [content, setContent] = useState('')
  const {
    _id,
    author,
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

  // post request for answering question
  const deletePost = async id => {
    try {
      const { data } = await axios.post('/api/posts/delete', { id })
      if (data === 'post deleted') {
        // continue
      }
    } catch (err) {
      // throw alert!
      window.alert('deleting the post has problems')
    }
  }

  // if able to add reply
  if (add) {
    if (deletable) {
      // if we have an image
      if (imageURL && imageURL !== '') {
        return (
          <div style={postStyle}>
            <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
              {postTitle}
            </h2>
            <img
              src={imageURL}
              alt=""
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
            <DeleteButton type="submit" onClick={() => deletePost({ id: _id })}>
              Delete Post
            </DeleteButton>
          </div>
        )
      }
      // else no image but can still reply
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
          <DeleteButton type="submit" onClick={() => deletePost({ id: _id })}>
            Delete Post
          </DeleteButton>
        </div>
      )
    }
    // not deletable
    if (imageURL && imageURL !== '') {
      return (
        <div style={postStyle}>
          <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
            {postTitle}
          </h2>
          <img
            src={imageURL}
            alt=""
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
    // else no image but can still reply
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

  // if image but no replying
  if (imageURL && imageURL !== '') {
    if (deletable) {
      return (
        <div style={postStyle}>
          <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
            {postTitle}
          </h2>
          <img
            src={imageURL}
            alt=""
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
          <DeleteButton type="submit" onClick={() => deletePost({ id: _id })}>
            Delete Post
          </DeleteButton>
        </div>
      )
    }
    return (
      <div style={postStyle}>
        <h2 style={{ height: 'fit-content', wordWrap: 'break-word', textAlign: 'center' }}>
          {postTitle}
        </h2>
        <img
          src={imageURL}
          alt=""
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
  // else no image and no replying
  if (deletable) {
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
        <DeleteButton type="submit" onClick={() => deletePost({ id: _id })}>
          Delete Post
        </DeleteButton>
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
}

export default Post
