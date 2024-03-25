import  { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
  }, []); 

  const speechToText = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.voice = voices[selectedVoiceIndex];
    window.speechSynthesis.speak(speech);
  };

  const handleVoiceChange = (e) => {
    setSelectedVoiceIndex(e.target.value);
  };

  return (
    <div className="App">
      <h1>Text to Speech Converter</h1>
      <textarea
        placeholder='Write anything here ....'
        value={text}
        onChange={handleChange}
      ></textarea>
      <div className='row'>
        <select value={selectedVoiceIndex} onChange={handleVoiceChange}>
          {voices.map((voice, index) => (
            <option key={index} value={index}>{voice.name}</option>
          ))}
        </select>
        <button onClick={speechToText}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMEeqcFVDar68_1pZVWNLkO_R0lPvuvek1S08UNck0Q&s" alt="play" />
          Listen
        </button>
      </div>
    </div>
  );
}

export default App;
