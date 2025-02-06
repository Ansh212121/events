const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); 
const PORT = 5000;

// Serve events.json file
app.get('/events', (req, res) => {
  const eventsFilePath = path.join(__dirname, '/my-event-website/events.json');

  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading events.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const events = JSON.parse(data);
      res.json(events);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
