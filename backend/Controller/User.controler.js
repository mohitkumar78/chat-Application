import userdata from "../Model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    try {
        console.log("req is come")
        const { email, password } = req.body;
        console.log(email, password)
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        // Check if the user already exists
        const existingUser = await userdata.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userdata.create({ email, password: hashPassword });
        console.log("new user", newUser)
        // Respond with success message
        return res.status(201).json({
            message: "User registered successfully.",
            newUser
        });
    } catch (error) {
        // Handle server errors
        console.error("Error in register function:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        const user = await userdata.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "User is not registered with this email"
            });
        }

        // Verify password (if hashed)
        const isPasswordValid = await bcrypt.compare(password, user.password); // Assuming you store hashed passwords
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Generate token
        const token = jwt.sign(
            { userid: user._id }, // Payload
            process.env.SECRET_KEY, // Secret Key
            { expiresIn: '15d' } // Optional token expiration
        );

        return res.status(200).json({
            message: "User login successfully",
            token,
            user,
            prfilesetup: user.prfilesetup
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getInfo = async (req, res) => {

    const { firstname, lastname, image, prfilesetup, color } = req.body

    const userid = req.id;
    if (!firstname || !lastname || !image || !profilesetup) {
        return res.status(400).json({
            message: "All field are required"
        })
    }
    const user = await userdata.findByIdAndUpdate(userid, {
        $set: {
            firstname: firstname,
            lastname: lastname,
            image: image,
            prfilesetup: prfilesetup,
            color: color

        },

    }, {
        new: true
    })

    console.log(user)
    return res.status(200).json({
        message: "user setup sucessfully",
        user
    })

}