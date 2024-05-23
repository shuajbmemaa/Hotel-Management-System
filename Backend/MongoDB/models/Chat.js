// models/Chat.js
import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
