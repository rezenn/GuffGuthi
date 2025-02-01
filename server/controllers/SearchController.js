import Search from "../model/SearchModel.js";

const searchController = {
    async search(req, res) {
        const { q } = req.query;  // Extract query parameter from the request

        if (!q || q.trim().length === 0) {
            return res.status(400).json({ message: "Search query is required." });
        }

        try {
            // Call the model to fetch search results
            const results = await Search.searchPosts(q);

            // Return the search results as a response
            res.status(200).json(results);
        } catch (err) {
            console.error("Error in search controller:", err.message);
            res.status(500).json({ error: "Failed to fetch search results." });
        }
    }
};

export default searchController;