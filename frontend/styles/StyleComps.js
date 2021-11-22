import s from 'styled-components'

// global style for fonts
export const GlobalStyle = s.div`
  font-family: 'Monaco';
`
// wrap blur div
export const divBlur = {
  filter: 'blur(2px)',
}
// wraps modal
export const modalStyle = {
  background: '#f7f7f7',
  border: '2px solid #646464',
  borderRadius: '5px',
  boxShadow: '1px 2px 4px dimgray',
  position: 'absolute',
  top: '200px',
  left: '25%',
  padding: '1em',
  boxSizing: 'border-box',
  width: '40%',
  height: '40%',
  zIndex: '9',
}
// wraps modal
export const questionStyle = {
  background: '#ebebeb',
  border: '2px solid #646464',
  borderRadius: '5px',
  boxShadow: '1px 2px 4px dimgray',
  position: 'absolute',
  top: '250px',
  left: '45%',
  padding: '1em',
  boxSizing: 'border-box',
  width: '40%',
  height: 'fit-content',
}
// input form formatting
export const QuesInputWrap = s.textarea`
  margin: 0.5em;
  font-size: 1em;
  border: 2px solid pebble;
  border-radius: 5px;
  box-shadow: 1px 2px 3px pebble;
  position: relative;
  height: 40%;
  width: 90%;
  word-wrap: break-word;
`
// Answer form formatting
export const AnsInputWrap = s.textarea`
  margin: 0.5em;
  font-size: 1em;
  border: 2px solid pebble;
  border-radius: 5px;
  box-shadow: 1px 2px 3px pebble;
  position: relative;
  height: 100px;
  width: 90%;
  word-wrap: break-word;
`
// wraps buttons
export const Button = s.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
`
// wraps login buttons
export const LoginButton = s.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: -100px;
`
// wraps misc buttons
export const BasicButton = s.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: -20px;
`
// wraps logout buttons
export const LogoutButton = s.button`
  float: right;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: 100px;
`
// wraps answer buttons
export const AnswerButton = s.button`
  float: right;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: 37%;
`
// wraps question buttons
export const QButton = s.button`
  font-size: 1.25em;
  margin: 0.25em;
  border: 2px solid pebble;
  border-radius: 3px;
  position: relative;
  right: -30px;
  box-sizing: border-box;
  height: 60px;
  text-align: left;
  padding-left: 1em;
  width: 30%;
  word-wrap: break-word;
  padding-top: 1em;
  padding-bottom: 0.75em;
  height: fit-content;
  padding-right: 1em;
`
// wraps model buttons
export const MButton = s.button`
  font-size: 1.25em;
  margin: 0.5em;
  border: 2px solid pebble;
  border-radius: 3px;
  position: relative;
  left: 48px;
  box-sizing: border-box;
  width: 25%;
  height: 60px;
  text-align: center;
`
// title formatting
export const Title = s.h1`
  margin: 0.5em;
  color: #474747;
  font-size: 3.5em;
  font-weight: 530;
  font-family: 'Monaco';
  text-align: center;
  box-shadow: 1px 3px 5px dimgray;
`

// input form formatting
export const InputWrap = s.input`
  margin: 1em;
  font-size: 1em;
  border: 2px solid pebble;
  border-radius: 5px;
  box-shadow: 1px 2px 3px pebble;
`
// link wrapper
export const linkStyle = {
  margin: '1rem',
  textDecoration: 'none',
  color: '#578499',
  padding: '0.25em 1em',
  border: '2px solid #578499',
  borderRadius: '5px',
  position: 'relative',
}

// link wrapper
export const loginLinkStyle = {
  margin: '1rem',
  textDecoration: 'none',
  color: '#578499',
  padding: '0.25em 1em',
  border: '2px solid #578499',
  borderRadius: '5px',
  position: 'relative',
  float: 'right',
}
