import { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Chatroom from './Screens/Chatroom';
import ChatroomsList from './Screens/ChatroomsList';
import RegisterUser from './Screens/RegisterUser';
import TopBar from './Components/TopBar';
import RequestManager from './Requests/RequestManager';

import './App.scss';

const App = () => {
    let history = useHistory();

    const [currentUser, setCurrentUser] = useState({});
    const [knownUsers, setKnownUsers] = useState({});

    const onRegisterSuccess = userDetails => {
        setCurrentUser(userDetails);
        history.push('/chatroomslist');
    }

    const onEnterRoom = id => {
        RequestManager.joinChatroom(
            {userId: currentUser.id, chatroomId: id},
            data => history.push(`/chatroom/${id}`)
        );
    }

    const onUnknownUser = () => {
        RequestManager.getUsers(data => {
            let users = {};
            data.forEach(({name, id}) => users[id] = name);
            setKnownUsers(users);
        });
    }

    const onLeaveRoom = id => {
        RequestManager.leaveChatroom(
            {userId: currentUser.id, chatroomId: id},
            data => history.push('/chatroomslist')
        );
    }

    //

    return (
        <Switch>
            <Route exact path='/'><Redirect to='/registeruser' /></Route>
            
            <Route path='/chatroom'>
                <Chatroom 
                    requestManager={RequestManager} 
                    TopBar={<TopBar currentUser={currentUser} />}
                    currentUser={currentUser}
                    knownUsers={knownUsers}
                    onUnknownUser={onUnknownUser}
                    onLeaveRoom={onLeaveRoom}
                />
            </Route>
            
            <Route exact path='/chatroomslist'>
                <ChatroomsList 
                    requestManager={RequestManager} 
                    TopBar={<TopBar currentUser={currentUser} />}
                    onEnterRoom={onEnterRoom}
                />
            </Route>

            <Route exact path='/registeruser'>
                <RegisterUser 
                    requestManager={RequestManager} 
                    onRegisterSuccess={onRegisterSuccess}
                />
            </Route>
        </Switch>
    );
}

export default App;
