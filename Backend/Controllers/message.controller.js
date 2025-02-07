import Message from "../Models/Message.models.js"
import {getConnectedUsers, getIO} from "../socket/socket.server.js"

export const sendMessage = async (req, res) => {
    try {
        const {content,receiverId} = req.body;

        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content,
        })

        const io = getIO();
        const connectedUsers = getConnectedUsers();
        const receiverSocketId = connectedUsers.get(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", {
                message: newMessage,
            });
        }

        res.status(201).json({ message: newMessage, success: true });
    } catch (error) {
        console.log("sendMessageController error::", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const getConversation = async (req, res) => {
    const {userId} = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id },
            ],
        }).sort("createdAt");

        res.status(200).json({ messages, success: true });
    } catch (error) {
        console.log("getConversationController error::", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}