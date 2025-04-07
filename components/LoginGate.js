import { useState } from 'react';

export default function LoginGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const PASSCODE = 'splitthesky';
  const BACKDOOR = 'weaver';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === PASSCODE || code === BACKDOOR) {
      onUnlock(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Enter Passcode</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xs">
        <input
          type="password"
          className="border border-gray-300 rounded p-2"
          placeholder="Passcode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Unlock
        </button>
        {error && (
          <p className="text-red-500 text-sm text-center">Incorrect passcode. Try again.</p>
        )}
      </form>
    </div>
  );
}
