import { useState } from 'react';
import Home from './components/Home';
import Settings from './components/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start py-6">
      <div style={{ marginTop: '150px' }} className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-3 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex bg-gray-100 p-2">
          <button
            className={`px-4 py-2 w-full rounded-md ${
              activeTab === 'home' ? 'bg-blue-100' : ''
            }`}
            onClick={() => setActiveTab('home')}
          >
            🏠
          </button>
          <button
            className={`px-4 py-2 w-full rounded-md ${
              activeTab === 'settings' ? 'bg-blue-100' : ''
            }`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️
          </button>
        </div>
        {activeTab === 'home' ? <Home /> : <Settings />}
      </div>
    </div>
  );
}
