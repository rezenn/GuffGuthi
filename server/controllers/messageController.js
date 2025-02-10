import {
    findConversation,
    createConversation,
    createMessage,
    updateConversation,
    getMessagesByConversationId,
    getUsersForSidebar
} from '../model/message.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
       
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.userInfo; // This should not be undefined

        if (!senderId) {
            return res.status(400).json({ error: "Sender ID is missing. Authentication failed." });
        }

        let conversation = await findConversation(senderId, receiverId);

        if (!conversation) {
            conversation = await createConversation(senderId, receiverId);
        }

        const newMessage = await createMessage(senderId, message, conversation.id);

        if (newMessage) {
            await updateConversation(conversation.id, newMessage.message_id);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error1" });
    }
};


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.userInfo;

        const conversation = await findConversation(senderId, userToChatId);

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = await getMessagesByConversationId(conversation.id);
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal server error2" });
    }
};

export const getUsersForSidebarController = async (req, res) => {
    try {
        const authUserId = req.userInfo;
        const users = await getUsersForSidebar(authUserId);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error3" });
    }
};
