import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';

function Chat() {
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: 'nina',
        name: 'Nina',
        email: 'nina@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      }),
    []
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation('new_group_chat');

    const frank = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
      welcomeMessage: 'Hey, how can I help?',
    });

    const juliana = new Talk.User({
      id: 'juliana',
      name: 'Juliana',
      email: 'juliana@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-1.jpg',
      welcomeMessage: 'Hey, how can I help?',
    });

    conversation.setParticipant(session.me);
    conversation.setParticipant(frank);
    conversation.setParticipant(juliana);

    return conversation;
  }, []);

  return (
    <Session appId="two8HH2v" syncUser={syncUser}>
      <Chatbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: '500px' }}
      ></Chatbox>
    </Session>
  );
}

export default Chat;