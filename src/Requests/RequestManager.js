import Axios from 'axios';

const baseUrl = 'http://localhost:3001';
const headers = {headers: {'Content-Type': 'application/json'}};
const componentName = 'RequestManager';

const RequestManager = {

    registerUser: async (params, onSuccess) => {
        const {username} = params;
        onSuccess = onSuccess || (() => {});

        if ((username || '').trim().length === 0) {
            return;
        }

        try {
            const response = await Axios.post(
                `${baseUrl}/users`, 
                {name: username}, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.registerUser:`, e);
        }
    },

    getChatrooms: async (onSuccess) => {
        try {
            const response = await Axios.get(
                `${baseUrl}/rooms`, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.getChatrooms:`, e);
        }
    },

    getUsers: async (onSuccess) => {
        try {
            const response = await Axios.get(
                `${baseUrl}/users`, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.getUsers:`, e);
        }
    },

    getChatroomUsers: async (params, onSuccess) => {
        const {chatroomId} = params;

        try {
            const response = await Axios.get(
                `${baseUrl}/rooms/${chatroomId}/users`, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.getChatroomUsers:`, e);
        }
    },

    getChatroomDetails: async (params, onSuccess) => {
        const {chatroomId} = params;

        try {
            const response = await Axios.get(
                `${baseUrl}/rooms/${chatroomId}`, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.getChatroomDetails:`, e);
        }
    },

    getChatroomTexts: async (params, onSuccess, ) => {
        const {chatroomId} = params;

        try {
            const response = await Axios.get(
                `${baseUrl}/rooms/${chatroomId}/text`, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.getChatroomTexts:`, e);
        }
    },

    addChatroomText: async (params, onSuccess, ) => {
        const {chatroomId, userId, text} = params;

        try {
            const response = await Axios.post(
                `${baseUrl}/rooms/${chatroomId}/text`, 
                {userId: userId, text: text},
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.addChatroomText:`, e);
        }
    },

    joinChatroom: async (params, onSuccess) => {
        const {userId, chatroomId} = params;

        if (typeof userId === 'undefined' || typeof chatroomId === 'undefined') {
            return;
        }

        try {
            const response = await Axios.post(
                `${baseUrl}/rooms/${chatroomId}/users`, 
                {userId: userId}, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.joinChatroom:`, e);
        }
    },

    leaveChatroom: async (params, onSuccess) => {
        const {userId, chatroomId} = params;

        if (typeof userId === 'undefined' || typeof chatroomId === 'undefined') {
            return;
        }

        try {
            const response = await Axios.delete(
                `${baseUrl}/rooms/${chatroomId}/users/${userId}`, 
                headers,
            );
            onSuccess(response.data);
        }
        catch (e) {
            console.error(`${componentName}.leaveChatroom:`, e);
        }
    },
};

export default RequestManager;