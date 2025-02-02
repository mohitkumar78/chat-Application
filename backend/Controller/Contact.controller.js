import userdata from "../Model/User.model.js"; // Ensure correct import path

export const Contact = async (req, res) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is missing" });
        }

        // Ensure req.user exists and has an ID
        const userId = req.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }

        // Sanitize search term
        const sanitizedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        const regex = new RegExp(sanitizedSearchTerm, "i");

        // Search for contacts, excluding the current user
        const contacts = await userdata.find({
            _id: { $ne: userId }, // Exclude the requesting user
            $or: [
                { firstname: regex },
                { lastname: regex },
                { email: regex }
            ]
        });

        // Check if contacts exist
        if (contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }

        return res.status(200).json({ contacts });

    } catch (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
