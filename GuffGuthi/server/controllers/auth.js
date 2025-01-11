// const db = require('../db/databaseConnect')
// const { hash } = require('bcrypt')

// exports.getUsers = async (req, res) => {
//     try {
//         const { rows } = await db.query('select * from users')
//         console.log(rows);
//         return res.status(200).json({ success: true, data: rows });

//     }
//     catch (error) {
//         console.log(error.message);
//         return res.status(500).json({ success: false, error: error.message });

//     }
// }
// exports.register = async (req, res) => {
//     // Validate the incoming request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         // Hash the password
//         const hashedPassword = await hash(password, 12);

//         // Insert user into the database
//         await db.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

//         return res.status(201).json({
//             success: true,
//             message: 'Registration successful',
//         });
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// };