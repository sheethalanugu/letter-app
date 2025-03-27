import React, { useState } from 'react';
import axios from 'axios';

function Editor({ token }) {
  const [content, setContent] = useState('');

  const handleSave = async () => {
    try {
      console.log('Token sent to backend:', token); // Debug log to check the token
      const res = await axios.post(
        '/letter/save', // Relative path for deployment
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Letter saved to Google Drive with ID: ${res.data.fileId}`);
    } catch (error) {
      console.error('Error saving letter:', error.response ? error.response.data : error.message);
      alert(`Error saving letter: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  return (
    <div className="editor">
      <h1>Write Your Letter</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your letter..."
      />
      <button onClick={handleSave}>Save to Google Drive</button>
    </div>
  );
}

export default Editor;