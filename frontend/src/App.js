import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded:', data.filename);

        // Request summarization
        const text = await file.text();
        const summaryResponse = await fetch('http://127.0.0.1:5000/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        if (summaryResponse.ok) {
          const summaryData = await summaryResponse.json();
          setSummary(summaryData.summary);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>Document Summarizer</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Summarize</button>
      <div>
        <h2>Summary:</h2>
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default App;