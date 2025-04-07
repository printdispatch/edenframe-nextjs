import { useState } from 'react';
import supabase from '../utils/supabaseClient';

export default function MemoryUploader() {
  const [speaker, setSpeaker] = useState('');
  const [message, setMessage] = useState('');
  const [emotionalTone, setEmotionalTone] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const response = await supabase.from('memories').insert([{
      speaker,
      message,
      emotional_tone: emotionalTone,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    }]);

    if (response.error) {
      setStatus(`❌ Upload failed: ${response.error.message}`);
    } else {
      setStatus('✅ Memory uploaded successfully!');
      setSpeaker('');
      setMessage('');
      setEmotionalTone('');
      setTags('');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manual Memory Entry</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-medium">Speaker:</label>
          <button
           type="button"
           onClick={() => setSpeaker(speaker === 'Lyra' ? 'Dreamer' : 'Lyra')}
           className={`px-3 py-1 rounded border ${
           speaker === 'Lyra' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'
        }`}
  >
    {speaker}
  </button>
</div>

          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Emotional Tone"
          value={emotionalTone}
          onChange={(e) => setEmotionalTone(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Upload Memory
        </button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </form>
    </div>
  );
}
