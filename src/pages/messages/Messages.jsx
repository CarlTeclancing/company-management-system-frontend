import React from 'react'
import Layout from '../../components/layout/Layout'
import Chat from '../../components/chats/Chat'
import ChatApp from '../../components/chats/chatApp'

function Messages() {
  return (
    <Layout>
        <h1>Messges</h1>
        <ChatApp />
    </Layout>
  )
}

export default Messages