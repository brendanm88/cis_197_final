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
  position: 'relative',
  // top: '200px',
  left: '25%',
  padding: '1em',
  boxSizing: 'border-box',
  width: '60%',
  height: 'fit-content',
  zIndex: '9',
}
export const postStyle = {
  fontFamily: 'inherit',
  background: '#c1dcff',
  border: '2px solid #646464',
  borderRadius: '5px',
  boxShadow: '1px 2px 4px dimgray',
  padding: '1em',
  // boxSizing: 'border-box',
  width: '80vw',
  // height: 'fit-content',
  // float: 'left',
  margin: '1.66%',
  marginBottom: '3em',
  // position: 'relative',
}
// input form formatting
export const QuesInputWrap = s.textarea`
  margin: 0.5em;
  font-size: 1em;
  border: 2px solid pebble;
  border-radius: 5px;
  box-shadow: 1px 2px 3px pebble;
  position: relative;
  height: fit-content;
  padding: 0.5em;
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
  width: 60%;
  word-wrap: break-word;
`
// wraps buttons
export const Button = s.button`
  color: black;
  font-family: inherit;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
`
// wraps login buttons
export const LoginButton = s.button`
  color: black;
  font-family: inherit;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: -100px;
`
// wraps type buttons
export const TypeButton = s.button`
  color: black;
  font-family: inherit;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
`
// wraps google login buttons
export const GoogleLink = s.a`
  background: #efefef;
  text-decoration: none;
  color: black;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: -100px;
`
// wraps profile link
export const ProfileLink = s.a`
  float: right;
  background: #efefef;
  text-decoration: none;
  color: black;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: 100px;
`
// wraps misc buttons
export const BasicButton = s.button`
  color: black;
  font-family: inherit;
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
  font-family: inherit;
  color: black;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid gray;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  right: 100px;
  z-index: 9;
`
// wraps answer buttons
export const AnswerButton = s.button`
  float: right;
  color: black;
  font-family: inherit;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  right: 37%;
`
// wraps delete buttons
export const DeleteButton = s.button`
  float: right;
  color: black;
  font-family: inherit;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-shadow: 1px 2px 4px dimgray;
  position: relative;
  z-index: 9;
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
export const CButton = s.button`
  background: #c1dcff;
  font-size: 1.25em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
  word-wrap: break-word;
  font-family: inherit;
  float: left;
  width: 15vw;
  height: 15vw;
  margin: 1.66%;
`
export const BackButton = s.button`
  font-size: 1.25em;
  border: 2px solid pebble;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
  font-family: inherit;
  float: right;
  width: 15vw;
  height: 5vw;
  margin: 1.66%;
  margin-top: 2.5em;
  position: relative;
`
// wraps model buttons
export const MButton = s.button`
  font-family: inherit;
  color: black;
  font-size: 1.25em;
  margin: 0.5em;
  border: 2px solid pebble;
  border-radius: 3px;
  position: relative;
  box-sizing: border-box;
  left: 29px;
  width: 29%;
  height: 60px;
  text-align: center;
`
// title formatting
export const Title = s.h1`
  border: 2px solid gray;
  border-radius: 3px;
  margin: 0.5em;
  color: #474747;
  font-size: 3.5em;
  font-weight: 530;
  font-family: 'Monaco';
  text-align: center;
  box-shadow: 1px 3px 5px dimgray;
`
// title formatting
export const SubTitle = s.h1`
  border: 2px solid gray;
  border-radius: 3px;
  margin: 0.5em;
  color: #474747;
  font-size: 1.75em;
  font-weight: 330;
  font-family: 'Monaco';
  text-align: center;
  box-shadow: 1px 3px 5px dimgray;
  width: fit-content;
  height: fit-content;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  padding-left: 2em;
  padding-right: 2em;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
`

// title formatting
export const SmallTitle = s.h3`
  background: #c1dcff;
  border: 2px solid gray;
  border-radius: 3px;
  margin: 1.5em;
  color: black;
  font-size: 1em;
  font-weight: 200;
  font-family: 'Monaco';
  word-wrap: break-word;
  text-align: center;
  box-shadow: 1px 3px 5px dimgray;
  width: 60vw;
  height: fit-content;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  padding-left: 2em;
  padding-right: 2em;
  position: relative;
  left: 50%;
  transform: translate(-50%, -10%);
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
  right: '70px',
  top: '-8px',
}
