import mongoose from "mongoose";

const ChannelScema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    member: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        required: true
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }

})

ChannelScema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})
ChannelScema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() })
    next()
})

const Channel = mongoose.Model("Channels", ChannelScema);
export default Channel;