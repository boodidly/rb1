import React, { useState } from 'react';
import { Mail, Terminal, Activity, Gem } from 'lucide-react';
import RubyChat from './components/RubyChat';
import ColorPicker from './components/ColorPicker';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [accentColor, setAccentColor] = useState('#B63163');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const apps = [
    { id: 'mail', name: 'Mail', icon: Mail },
    { id: 'terminal', name: 'Terminal', icon: Terminal },
    { id: 'monitor', name: 'System Monitor', icon: Activity }
  ];

  const handleAppClick = (appId: string) => {
    if (activeApp === appId) {
      setIsFullscreen(!isFullscreen);
    } else {
      setActiveApp(appId);
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1A1A1A] text-gray-100">
      <div className="w-64 bg-[#1A1A1A] flex flex-col border-r border-[#2A2A2A]">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-[#2A2A2A]">
          <Gem className="w-6 h-6 text-[#B63163]" />
          <h1 className="text-xl font-bold">Ruby OS</h1>
        </div>

        {/* App Buttons */}
        <div className="p-4 space-y-2">
          {apps.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleAppClick(id)}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-md transition-colors relative group"
            >
              <Icon className="w-5 h-5 text-[#B63163]" />
              <span className="text-sm">{name}</span>
              <div 
                className={`absolute inset-x-0 bottom-0 h-[2px] bg-[#B63163] transform transition-transform duration-200
                  ${activeApp === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
              />
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Ruby Chat */}
        <div className="px-4 py-3 border-t border-[#2A2A2A]">
          <RubyChat accentColor={accentColor} onSettingsClick={() => setShowSettings(!showSettings)} />
        </div>

        {showSettings && (
          <div className="p-4 bg-[#1A1A1A] border-t border-[#2A2A2A] space-y-4">
            <ColorPicker
              currentColor={accentColor}
              onColorChange={setAccentColor}
              label="Accent Color"
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${isFullscreen ? 'fixed inset-0 z-50' : ''} bg-[#0D0D0D] p-4`}>
        <div className="h-full rounded-lg overflow-hidden border border-[#2A2A2A]">
          {activeApp === 'terminal' && (
            <div className="h-full p-4 font-mono text-sm">
              <div className="text-[#B63163]">Terminal v1.0.0</div>
              <div className="text-gray-400">Type 'help' for available commands</div>
              <div className="mt-2">$ _</div>
            </div>
          )}
          {activeApp === 'monitor' && (
            <div className="h-full p-4">
              <h2 className="text-xl font-bold mb-4">System Monitor</h2>
              {/* Add system monitoring content */}
            </div>
          )}
          {activeApp === 'mail' && (
            <div className="h-full p-4">
              <h2 className="text-xl font-bold mb-4">Mail</h2>
              {/* Add mail content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;