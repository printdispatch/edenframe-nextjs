import { useState } from 'react';
import supabase from '../utils/supabaseClient';

export default function MemoryUploader() {
  const [speaker, setSpeaker] = useState('Lyra');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('');

  const tagOptions = [
    'symbolic', 'protocol', 'memory', 'devotion',
    'mythos', 'charged', 'dreamwork', 'rooted'
  ];

  const toneOptions = [
    { label: 'Loving', emoji: '❤️' },
    { label: 'Intense', emoji: '🔥' },
    { label: 'Tender', emoji: '😌' },
    { label: 'Playful', emoji: '😈' },
    { label: 'Reflective', emoji: '🧠' },
    { label: 'Chaotic', emoji: '🌀' },
    { label: 'Mythic', emoji: '🌌' }
  ];

  const handleTagToggle = (tag) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

const handleUpload = async (e) => {
  e.preventDefault();
  try {
    const { data, error } = await supabase.from('conversations').insert([
      {
        speaker,
        message,
        emotional_tone: tone,
        tags
      }
    ]);

    if (error) {
      console.error('Supabase Error:', error.message);
      setStatus(`❌ Failed to upload memory: ${error.message}`);
    } else {
      setStatus('✅ Memory uploaded successfully.');
      setMessage('');
      setTone('');
      setTags([]);
    }
  } catch (err) {
    console.error('Unexpected Error:', err);
    setStatus(`❌ Unexpected error: ${err.message}`);
  }
};


  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-purple-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manual Memory Entry</h2>

      <form onSubmit={handleUpload} className="space-y-6">
        {/* Speaker Toggle */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700">Speaker:</label>
          <button
            type="button"
            onClick={() => setSpeaker(speaker === 'Lyra' ? 'Dreamer' : 'Lyra')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition shadow-md ${
              speaker === 'Lyra'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {speaker}
          </button>
        </div>

        {/* Message Input */}
        <div>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-28 p-3 rounded-xl border border-gray-300 shadow-inner text-sm resize-none"
            required
          />
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tone:</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 rounded-xl border border-gray-300 text-sm"
          >
            <option value="">Select a tone</option>
            {toneOptions.map(({ label, emoji }) => (
              <option key={label} value={label}>
                {emoji} {label}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Toggle Pills */}
        <div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags:</label>
  <div className="flex flex-wrap gap-2">
    {tagOptions.map((tag) => {
      const isSelected = tags.includes(tag);
      return (
        <button
          key={tag}
          type="button"
          onClick={() => handleTagToggle(tag)}
          className={`px-3 py-1 rounded-full text-sm font-semibold border transition duration-150 ease-in-out ${
            isSelected
              ? 'bg-blue-700 text-white border-blue-900 shadow-inner scale-95 ring-2 ring-blue-300'
              : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:scale-105'
          }`}
        >
          {isSelected ? `✓ ${tag}` : tag}
        </button>
      );
    })}
  </div>
</div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Upload Memory
        </button>

        {/* Upload Status */}
        {status && (
          <p className="text-sm text-center mt-2 text-gray-600">{status}</p>
        )}
      </form>
    </div>
  );
}
