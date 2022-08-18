import React, { useState } from 'react'
import './App.css'
import 'stream-chat-react/dist/css/index.css'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChanelContainer} from './components'
import { ChanelListContainer, Auth } from './components'

const cookies = new Cookies();

const apiKey = 'gvyg8nd5eecm'

const client = StreamChat.getInstance(apiKey)

const authToken = cookies.get("token")

if(authToken){
  client.connectUser({
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    id: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken)
}

const App = () => {
  const [ createType, setCreateType ] = useState('')
  const [ isCreating, setIsCreating ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  if(!authToken) return <Auth />
  return (
    <div className='app__wrapper'>
        <Chat client={client} theme="team light">
            <ChanelListContainer
               isCreating={isCreating}
               setIsCreating={setIsCreating}
               setIsEditing={setIsEditing}
               setCreateType={setCreateType}
             />
            <ChanelContainer 
               isCreating={isCreating}
               setIsCreating={setIsCreating}
               setIsEditing={setIsEditing}
               isEditing={isEditing}
               createType={createType}
            />
        </Chat>
    </div>
  )
}

export default App