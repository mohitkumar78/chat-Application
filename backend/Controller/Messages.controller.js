import Message from "../Model/Message.model.js";

export const getAllmessage = async (req, res) => {
    try {

        const sender = req.id;
        const { recipient } = req.body;

        if (!sender || !recipient) {
            return res.status(404).json({
                message: "sender and recipient is required",

            })
        }

        const messages = await Message.find({
            $or: [{ sender: sender, recipient: recipient }, { sender: recipient, recipient: sender }]
        }).sort({ timestamp: 1 })
        if (messages) {
            return res.status(200).json({
                message: "Ok",
                messages
            })
        }
    } catch (error) {
        console.log("error is occur in getAllmessage", error)
        res.status(404).json({
            message: "Internal server error",
            status: false
        })
    }
}