import Group from "../model/groupModel.js"; // Ensure .js is included

const groupController = {
    async getGroup(req, res) {
        try {
            const { group_id } = req.params;
            const group = await Group.getGroup({ group_id });

            if (!group) {
                return res.status(404).json({ error: "Group not found." });
            }
            res.status(200).json(group);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to retrieve group info." });
        }
    },

    async updateGroup(req, res) {
        try {
            const { group_id } = req.params;
            const { topic, group_desc } = req.body;

            const group_logo = req.files?.group_logo ? `uploads/group/${req.files.group_logo[0].filename}` : null;
            const group_cover = req.files?.group_cover ? `uploads/group/${req.files.group_cover[0].filename}` : null;

            const updatedGroup = await Group.UpdateGroup(group_logo, group_cover, topic, group_desc, group_id);

            if (!updatedGroup) {
                return res.status(404).json({ error: "Group not found." });
            }

            res.status(200).json({
                message: "Group updated successfully",
                group: updatedGroup,
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to update group info." });
        }
    },

    async getAllGroups(req, res) {
        try {
            const groups = await Group.getAllGroups();
            res.status(200).json(groups);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to retrieve groups." });
        }
    },

    async createGroup(req, res) {
        try {
            const { group_name, topic, group_desc } = req.body;
    
            // Handle file uploads if provided
            const group_logo = req.files?.group_logo ? `uploads/group/${req.files.group_logo[0].filename}` : null;
            const group_cover = req.files?.group_cover ? `uploads/group/${req.files.group_cover[0].filename}` : null;
    
            if (!group_name || !topic || !group_desc) {
                return res.status(400).json({ error: "All fields are required." });
            }
    
            const newGroup = await Group.createGroup(group_name, group_logo, group_cover, topic, group_desc);
            res.status(201).json({ message: "Group created successfully", group: newGroup });
        } catch (error) {
            console.error("Error creating group:", error);
            res.status(500).json({ error: "Failed to create group.", details: error.message });
        }
    }
};

export default groupController;
