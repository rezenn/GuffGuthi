// import express from "express";
// import { getMessagesByRoom } from "../model/chatModel";

// const router = express.Router();

// router.get("/:room", async (req, res) => {
//   try {
//     const roomId = await findRoomByName(req.params.room);
//     if (!roomId) return res.status(404).json({ error: "Room not found" });

//     const messages = await getMessagesByRoom(roomId);
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;
