// import express from "express";
// import { createRoom, findRoomByName } from "../model/roomModel.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name } = req.body;
//   try {
//     let roomId = await findRoomByName(name);
//     if (!roomId) {
//       roomId = await createRoom(name);
//     }
//     res.json({ id: roomId });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;
