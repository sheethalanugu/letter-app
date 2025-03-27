const express = require('express');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Received token:', token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('JWT verification error:', err.message);
        return res.sendStatus(403);
      }
      req.user = user;
      console.log('Decoded user:', req.user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post('/save', authenticateJWT, async (req, res) => {
  const { content } = req.body;
  console.log('User:', req.user);
console.log('Access Token:', req.user.accessToken);
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: req.user.accessToken });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const fileMetadata = {
    name: 'My Letter',
    mimeType: 'application/vnd.google-apps.document',
  };
  const media = {
    mimeType: 'text/plain',
    body: content,
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });
    res.json({ fileId: file.data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;