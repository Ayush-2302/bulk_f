import React from 'react'
import Whatsbulkui from './Whatsbulkui'
// import Emoji from './Emoji'

function Home(props) {
  return (
   <>
   <Whatsbulkui showAlert={props.showAlert}  />
   </>

  )
}

export default Home