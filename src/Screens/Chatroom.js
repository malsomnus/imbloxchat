import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './../Components/Button';
import Input from './../Components/Input';
import './Chatroom.scss';

const Chatroom = props => {
    const {requestManager, TopBar, knownUsers, onUnknownUser, onLeaveRoom, currentUser} = props;

    let location = useLocation();
    const chatroomId = location.pathname.match(/\/([^/])$/)[1];

    const [chatroomName, setChatroomName] = useState('');
    const [users, setusers] = useState([]);
    const [texts, settexts] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [chatIsAtBottom, setChatIsAtBottom] = useState(true);

    // When this component mounts,
    // 1. Get the chatroom's details
    useEffect(() => {
        requestManager.getChatroomDetails(
            {chatroomId: chatroomId},
            data => setChatroomName(data.name)
        );
        
    }, []);

    // 2. Start a timer to check for new texts and users every 1 sec
    useEffect(() => {
        const interval = setInterval(() => {
            requestManager.getChatroomUsers(
                {chatroomId: chatroomId},
                data => setusers(Array.from(data.users))
            );
            requestManager.getChatroomTexts(
                {chatroomId: chatroomId},
                data => settexts(data.text)
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // 3. Add a listener for the scroll event, so the chat can know when it's scrolled to the bottom
    const refScrollableChat = useRef();
    const refEndOfChat = useRef();
    useEffect(() => {
        const onScroll = e => {
            const t = e.target;
            setChatIsAtBottom(Math.abs(t.scrollHeight - t.scrollTop - t.clientHeight) <= 10);
        }
        window.addEventListener('scroll', onScroll, true);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    useEffect(() => {
        if (chatIsAtBottom) {
            refEndOfChat.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }, [texts]);

    // Make sure to leave the chatroom when the user leaves or closes the tab or whatever
    useEffect(() => {
        const onLeave = () => {
            onLeaveRoom(chatroomId);
        }
        window.addEventListener('beforeunload', onLeave);

        return () => {
            onLeave();
            window.removeEventListener('beforeunload', onLeave);
        }
    }, [])

    // If there are unknown users in the chatroom, let the app know about it
    for (let i = 0 ; i < users.length ; i++) {
        if (!knownUsers[users[i]]) {
            onUnknownUser();
            break;
        }
    }

    const onSendMessage = e => {
        e.preventDefault();
        requestManager.addChatroomText(
            {chatroomId: chatroomId, userId: currentUser.id, text: messageText}, 
            () => setMessageText('')
        );
    }

    return (
        <section className='chatroom'>
            {TopBar}
            <div className='main-container'>
                <div className='left-bar'>
                    <div className='title'>{`#${chatroomName} (${users.length} user${users.length === 1 ? '' : 's'})`}</div>
                    <ul className='users'>
                        {users.map(userId => (
                            <li className='user' key={userId}>{knownUsers[userId]}</li>
                        ))}
                    </ul>
                    <div className='leave'>
                        <Button onClick={() => onLeaveRoom(chatroomId)}>Leave</Button>
                    </div>
                </div>
                <div className='chat' ref={refScrollableChat}>
                    <div className='texts'>
                        {texts.reverse().map((text, idx) => <div className='text' key={idx}>{`${knownUsers[text.userId]}: ${text.text}`}</div>)}
                        <div ref={refEndOfChat}></div>
                    </div>
                    <form className='input' onSubmit={onSendMessage}>
                        Send a message:<Input value={messageText} onChange={e => setMessageText(e.target.value)} />
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Chatroom;
