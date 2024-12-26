import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    firstname: {
        type: "String",
        required: false
    },
    image: {
        type: "String",
        required: false
    },
    color: {
        type: "String",
        required: false
    }

})

const userdata = mongoose.model("userdata", UserSchema);
export default userdata;