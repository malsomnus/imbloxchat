import React, { useState, useEffect } from 'react';
import Button from './../Components/Button';
import './ChatroomsList.scss';

const ChatroomsList = props => {
    const {requestManager, TopBar, onEnterRoom} = props;

    const [chatrooms, setChatrooms] = useState([]);
    
    useEffect(() => {
        requestManager.getChatrooms(setChatrooms);
    }, [requestManager]);

    //

    const Chatroom = room => (
        <li className='chatroom' key={room.id}>
            <Button onClick={() => onEnterRoom(room.id)}>{room.name}</Button>
        </li>
    );

    //

    return (
        <section className='chatrooms-list'>
            {TopBar}
            <div className='title'>Join a chatroom:</div>
            <ul className='chatrooms'>
                {chatrooms.map(Chatroom)}
            </ul>
        </section>
    );
}

export default ChatroomsList;
