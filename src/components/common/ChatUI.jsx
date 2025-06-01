import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { stringAvatar } from '../../utils/avatarUtils';
import { Dot, Send } from 'lucide-react';
import '../../assets/styles/common/Messaging.css';

// ChatUi Component
// This component represents a chat user interface with two main sections:
// - A list of users and their last messages on the left.
// - A conversation area on the right for the selected user.

export default function ChatUi() {
    // Function to truncate a message to a specified size and append "..." if it exceeds the size.
    function truncateMessage(text, size) {
        if (text.length > size) {
            return text.slice(0, size) + '...';
        }
        return text;
    }

    // State to track the currently selected user for the chat.
    const [selectedUser, setSelectedUser] = useState(null);

    // State to track the current message being typed in the input field.
    const [inputMessage, setInputMessage] = useState('');

    // State to track the search term used to filter the user list.
    const [searchTerm, setSearchTerm] = useState('');

    // State to store chat history for each user.
    const [messagesData, setMessagesData] = useState({
        'Kent Dodds': [
            { from: 'Kent Dodds', text: 'Hello! How are you?', time: '12:30 PM', read: true },
            { from: 'Me', text: 'I am fine, thanks! And you?', time: '12:32 PM', read: true },
            { from: 'Kent Dodds', text: 'Great! Working on some new projects', time: '12:35 PM', read: false },
            { from: 'Kent Dodds', text: 'Would you like to collaborate?', time: '12:36 PM', read: false },
        ],
        'Sarah Connor': [
            { from: 'Sarah Connor', text: "Don't forget our meeting at 2!", time: '11:00 AM', read: false },
            { from: 'Sarah Connor', text: "Also, bring the documents we discussed", time: '11:02 AM', read: false },
            { from: 'Sarah Connor', text: "See you then!", time: '11:03 AM', read: false },
        ],
        'John Doe': [
            { from: 'John Doe', text: 'Hey there!', time: '10:00 AM', read: false },
        ],
    });

    // State to store the online/offline status of each user.
    const [userStatus, setUserStatus] = useState({
        'Kent Dodds': 'online',
        'Sarah Connor': 'offline',
        'John Doe': 'online',
    });

    // Function to count unread messages for a user
    const getUnreadCount = (user) => {
        return messagesData[user].filter(msg => msg.from !== 'Me' && !msg.read).length;
    };

    // Function to mark messages as read when selecting a user
    const handleUserSelect = (user) => {
        setSelectedUser(user);
        
        // Mark all messages from this user as read
        setMessagesData(prev => ({
            ...prev,
            [user]: prev[user].map(msg => ({ ...msg, read: true }))
        }));
    };

    // Filtered list of users based on the search term.
    const users = Object.keys(messagesData).filter(user =>
        user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle sending a new message to the selected user.
    const handleSend = () => {
        if (!inputMessage.trim() || !selectedUser) return;

        const newMsg = {
            from: 'Me',
            text: inputMessage.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: true,
        };

        // Update the chat history with the new message.
        setMessagesData(prev => ({
            ...prev,
            [selectedUser]: [...prev[selectedUser], newMsg],
        }));

        // Clear the input field after sending the message.
        setInputMessage('');
    };

    // Function to render unread indicator
    const renderUnreadIndicator = (user) => {
        const unreadCount = getUnreadCount(user);
        
        if (unreadCount === 0) {
            return null;
        } else if (unreadCount === 1) {
            return (
                <div className="unread">
                    <Dot className='dot' size={20} strokeWidth={10} />
                </div>
            );
        } else {
            return (
                <div className="unread has-count">
                    <div className={`unread-count ${unreadCount > 99 ? 'large-count' : ''}`}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="chat-ui" style={{ display: 'flex' }}>
            {/* Left Section: List of users */}
            <div className="all-messages" style={{ width: '30%', borderRight: '1px solid #ccc' }}>
                {/* Search input for filtering users */}
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '90%',
                        padding: '10px',
                        boxSizing: 'border-box',
                        borderRadius: '8px ',
                        marginBottom: '10px',
                        zIndex: 133,
                        marginTop: '20px',
                        position: 'sticky',
                        border: '1px solid gray',
                        marginLeft: '5%',
                    }}
                />
                {/* List of users */}
                {users.map(user => {
                    const lastMessage = messagesData[user][messagesData[user].length - 1];
                    const isOnline = userStatus[user] === 'online';
                    return (
                        <div
                            className="message"
                            key={user}
                            onClick={() => handleUserSelect(user)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                cursor: 'pointer',
                                background: selectedUser === user ? 'hsl(210deg 40% 96.1% / 50%)' : '#fff',
                                borderBottom: '1px solid #ccc',
                                transition: 'background 0.3s',
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* User avatar with online/offline status */}
                            <div style={{ position: 'relative' }}>
                                <Avatar {...stringAvatar(user)} />
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: isOnline ? 'rgb(34 197 94)' : 'gray',
                                        border: '2px solid white',
                                    }}
                                ></span>
                            </div>
                            {/* User details: name, last message, and timestamp */}
                            <div className="content" style={{ marginLeft: 10, flexGrow: 1 }}>
                                <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="name" style={{ fontWeight: 600 }}>{user}</div>
                                    <div className="time" style={{ fontSize: '0.8em', color: '#666' }}>{lastMessage?.time}</div>
                                </div>
                                <div className="text" style={{ fontSize: '0.9em' }}>{truncateMessage(lastMessage?.text, 40)}</div>
                            </div>
                            {/* Unread message indicator */}
                            {renderUnreadIndicator(user)}
                        </div>
                    );
                })}
            </div>

            {/* Right Section: Conversation area */}
            <div className="chat-content" style={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
                {selectedUser ? (
                    <>
                        {/* Chat header: Selected user's name and status */}
                        <div className="chat-header" style={{ fontWeight: 600, fontSize: '1.2em', marginBottom: 10, borderBottom: '1px solid #ccc' }}>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Avatar {...stringAvatar(selectedUser)} style={{ marginRight: 10 }} />
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: 5,
                                        right: 5,
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: userStatus[selectedUser] === 'online' ? 'rgb(34 197 94)' : 'gray',
                                        border: '2px solid white',
                                    }}
                                ></span>
                            </div>
                            <div className="name">{selectedUser}</div>
                        </div>

                        {/* Chat messages */}
                        <div className="chat-messages" style={{ flexGrow: 1, overflowY: 'auto', marginBottom: 10 }}>
                            {messagesData[selectedUser].map((msg, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        textAlign: msg.from === 'Me' ? 'right' : 'left',
                                        marginBottom: 10,
                                    }}
                                >
                                    {/* Message bubble */}
                                    <div
                                        className="message-bubble"
                                        style={{
                                            display: 'inline-block',
                                            backgroundColor: msg.from === 'Me' ? 'hsl(6 100% 72%)' : 'white',
                                            padding: '10px 15px',
                                            borderRadius: msg.from === 'Me' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                            maxWidth: '70%',
                                            color: msg.from === 'Me' ? '#fff' : '#333',
                                            height: 'auto',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                    {/* Message timestamp */}
                                    <div className='time' style={{ fontSize: '0.7em', color: '#666', marginTop: 2 }}>{msg.time}</div>
                                </div>
                            ))}
                        </div>

                        {/* Message input and send button */}
                        <div className="chat-conversation" style={{ display: 'flex', gap: 10 }}>
                            <input
                                type="text"
                                placeholder="Entre ton message..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                style={{
                                    flexGrow: 1,
                                    padding: 10,
                                    border: '1px solid #ccc',
                                    borderRadius: 8,
                                }}
                            />
                            <button
                                type="submit"
                                onClick={handleSend}
                                style={{
                                    backgroundColor: inputMessage.trim() ? 'hsl(6 100% 72%)' : 'hsl(6 100% 72% / 50%)',
                                    color: '#fff',
                                    padding: '10px ',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                <Send />
                            </button>
                        </div>
                    </>
                ) : (
                    // Placeholder when no user is selected
                    <div style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
                        Select a user to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}