import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './chatApp.css';
import { useAuth } from '../../contexts/AuthContext';

const socket = io('http://localhost:8000'); // No auth yet

export default function ChatApp() {
    const [channels, setChannels] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useAuth();
    const [visibleUserCount, setVisibleUserCount] = useState(5); // show 5 users initially

    const loadMoreUsers = () => {
        setVisibleUserCount(prev => prev + 5);
    };

    // Fetch channels and users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [channelRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/channels'),
                    //axios.get('http://localhost:8000/api/users')
                ]);
                setChannels(channelRes.data);
                //setUsers(userRes.data);
            } catch (err) {
                console.error('Error loading channels or users', err);
                toast.error('Failed to load chat data.');
            }
        };

        fetchData();
    }, []);

    // Handle incoming socket messages
    useEffect(() => {
        const handleNewMessage = (msg) => {
            if (msg.channel_id === currentChannel) {
                setMessages((prev) => [...prev, msg]);
            }
            toast.info(`New message in #${msg.channel_id}`);
            new Audio('/notification.mp3').play();
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [currentChannel]);

    // Join channel and fetch messages
    const joinChannel = async (channelId) => {
        socket.emit('joinChannel', channelId);
        setCurrentChannel(channelId);

        try {
            const { data } = await axios.get(`http://localhost:8000/api/channels/${channelId}/messages`);
            setMessages(data);
        } catch (err) {
            console.error('Error loading messages', err);
            toast.error('Failed to load messages.');
        }
    };

    // Send a message to the channel
    const sendMessage = () => {
        if (newMessage.trim() && currentChannel) {
            socket.emit('sendMessage', {
                channelId: currentChannel,
                userId: user?.id,
                content: newMessage
            });
            setNewMessage('');
        }
    };

    return (
        <div className="chat-app">
            <div className="channel-list">
                <h2 className="channel-title">Channels</h2>
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        onClick={() => joinChannel(channel.id)}
                        className={`channel-item ${currentChannel === channel.id ? 'active' : ''}`}
                    >
                        #{channel.name}
                    </div>
                    
                ))}
                <h3>Message Users</h3>
                {users.slice(0, visibleUserCount).map((user) => (
                    <div key={user.id} className='channel-item'>
                        {user.full_name}
                    </div>
                ))}
                {visibleUserCount < users.length && (
                    <button onClick={loadMoreUsers} className="load-more-users">Load More</button>
                )}

            </div>

            <div className="chat-window">
                <div className="message-list">
                    {messages.length === 0 ? (
                        <p className="no-messages">No messages yet. Start chatting!</p>
                    ) : (
                        messages.map((msg) => {
                            const sender = users.find((u) => u.id === msg.sender_id);
                            return (
                                <div key={msg.id} className="message">
                                    <span className="message-sender">
                                        {sender ? sender.full_name : `User ${msg.sender_id}`}:
                                    </span> {msg.content}
                                </div>
                            );
                        })
                    )}
                </div>

                {currentChannel && (
                    <div className="message-input-container">
                        <input
                            className="message-input"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="send-button">Send</button>
                    </div>
                )}
            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}
