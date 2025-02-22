const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'senderType', 
        required: true },
    senderType: { 
        type: String, 
        enum: ['User', 'Admin'], 
        required: true },
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'receiverType', 
        required: true },
    receiverType: { 
        type: String, 
        enum: ['User', 'Admin'], 
        required: true },
    content: { 
        type: String, 
        required: true },
    createdAt: { 
        type: Date, 
        default: Date.now },
  });

const Message = mongoose.model('Message', messageSchema)
module.exports = Message