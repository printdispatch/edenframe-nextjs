import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

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
      setTags
