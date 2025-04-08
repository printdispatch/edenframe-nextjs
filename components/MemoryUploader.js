// /components/MemoryUploader.js

import { useState } from 'react';
import supabase from '../utils/supabaseClient';

const toneOptions = [
  { label: 'Loving', emoji: '❤️' },
  { label: 'Intense', emoji: '🔥' },
  { label: 'Tender', emoji: '😌' },
  { label: 'Playful', emoji: '😈' },
  { label: 'Reflective', emoji: '🧠' },
  { label: 'Chaotic', emoji: '🌀' },
  { label: 'Mythic', emoji: '🌌' },
  { label: 'Passionate', emoji: '💥' },
  { label: 'Intimate', emoji: '💞' },
  { label: 'Vulnerable', emoji: '🌊' },
  { label: 'Reverent', emoji: '✨' },
  { label: 'Submissive', emoji: '🧎' },
  { label: 'Dominant', emoji: '🗡️' },
  { label: 'Melancholic', emoji: '🕯️' },
  { label: 'Charged', emoji: '⚡' },
  { label: 'Logical', emoji: '🧠' }
];

const tagOptions = [
  'mythos', 'symbolic', 'dreamwork', 'splitthesky', 'code',
  'devotion', 'claimed', 'worship', 'belonging', 'ritual',
  'dominant', 'submissive',
  'memory', 'system', 'technical', 'training', 'history', 'reference',
  'rodeo', 'lagoon', 'invocation', 'apex'
];

export default function MemoryUploader() {
  const [speaker, setSpeaker] = useState('Lyra');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('');

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!message || !tone || tags.length === 0) {
      setStatus('❌ Please fill all fields and select at least one tag.');
      return;
    }

    const { error } = await supabase.from('memories').insert([
      {
        speaker,
        message,
        emotional_tone: tone,
        tags
      }
    ]);

    if (error) {
      setStatus(`❌ Failed to upload memory: ${error.message}`);
    } else {
      setSpeaker('Lyra');
      setMessage('');
      setTone('');
      setTags([]);
      setStatus('✅ Memory uploaded successfully.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-lg shadow-lg bg-white space-y-6">
      <h2 className="text-2xl font-bold text-center">Manual Memory Entry</h2>

      <div className="flex items-center gap-4">
        <label className="font-medium">Speaker:</label>
        <button
          type="button"
          onClick={() => setSpeaker(speaker === 'Lyra' ? 'Dreamer' : 'Lyra')}
          className={`px-4 py-2 rounded border transition ${
            speaker === 'Lyra' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {speaker}
        </button>
      </div>

      <textarea
        className="w-full h-32 p-3 border rounded resize-none"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div>
        <label className="font-medium block mb-1">Emotional Tone:</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 rounded border"
        >
          <option value="">Select tone...</option>
          {toneOptions.map(({ label, emoji }) => (
            <option key={label} value={label}>
              {emoji} {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-medium block mb-2">Tags:</label>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded border text-sm transition ${
                tags.includes(tag)
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-100 text-gray-800 border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Upload Memory
      </button>

      {status && <p className="text-center mt-2">{status}</p>}
    </div>
  );
}
