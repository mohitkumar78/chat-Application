import userdata from "../Model/User.model.js";
import Channel from "../Model/CreateChannel.model.js";
export const createChannel = async (req, res) => {


    try {
        const { name, members } = req.body;
        const userId = req.id;

        const admin = await userdata.findById({ userId });

        if (!admin) {
            return res.status(404).send("Admin user not Found")
        }

        const validmembers = await userdata.find({ _id: { $in: members } });

        if (validmembers.length !== members.length) {
            return res.status(404).send("some user is not a valid user")
        }

        const newChannel = new Channel({
            name,
            members,
            admin
        })
        await newChannel.save()
        return res.status(201).json({
            Channel: newChannel
        })
    } catch (error) {
        console.log("Error is Occur in create Channel controller", error)
        return res.status(501).json({
            message: "Internal server error"
        })
    }

}