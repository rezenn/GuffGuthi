import { getAllRequests, getRequestById, createRequest } from "../model/communityServiceModel.js";

// Get all requests
export const fetchAllRequests = async (req, res) => {
    try {
        const requests = await getAllRequests();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve community requests" });
    }
};

// Get a request by ID
export const fetchRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await getRequestById(id);
        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: "Error fetching request" });
    }
};

// Create a new request
export const createNewRequest = async (req, res) => {
    try {
        const { title, start_date, end_date, location, description } = req.body;
        if (!title || !start_date || !end_date || !location || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newRequest = await createRequest({ title, start_date, end_date, location, description });
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: "Error creating community request" });
    }
};
