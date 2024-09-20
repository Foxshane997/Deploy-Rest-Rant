const router = require('express').Router();
const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = db;

router.post('/', async (req, res) => {
    try {
        // Find the user by email
        let user = await User.findOne({
            where: { email: req.body.email }
        });
        console.log("user", user);

        // Check if user exists and password matches
        if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
            return res.status(404).json({
                message: 'Could not find a user with the provided username and password'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Respond with user data and token
        res.json({ user, token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred, please try again later' });
    }
});

router.get('/profile', async (req, res) => {
    try {
        // Ensure the authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        // Split the authorization header into [ "Bearer", "TOKEN" ]:
        const [authenticationMethod, token] = req.headers.authorization.split(' ');

        // Check for Bearer token
        if (authenticationMethod === 'Bearer') {

            // Verify and decode the JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get the logged-in user's id from the payload
            const { id } = decoded;

            // Find the user object using their id
            let user = await User.findOne({
                where: { userId: id }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Respond with user data
            res.json(user);

        } else {
            res.status(401).json({ message: 'Invalid authentication method' });
        }
    } catch (error) {
        console.error('Error during profile retrieval:', error);
        res.status(500).json({ message: 'An error occurred, please try again later' });
    }
});

module.exports = router;
