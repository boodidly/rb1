import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  initialOutput?: string;
  onCommand: (command: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ initialOutput = '', onCommand }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState(initialOutput);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      e.preventDefault();
      
      // Add command to output
      const newOutput = `${output}\n$ ${currentCommand}\n`;
      setOutput(newOutput);
      
      // Add to history
      setHistory(prev => [...prev, currentCommand]);
      setHistoryIndex(-1);
      
      // Execute command
      onCommand(currentCommand);
      
      // Clear current command
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="h-full flex flex-col bg-[#1A1A1A] font-mono text-sm"
      onClick={focusInput}
    >
      <pre 
        ref={outputRef}
        className="flex-1 p-4 overflow-auto whitespace-pre-wrap"
      >
        {output}
      </pre>
      <div className="p-4 border-t border-[#2A2A2A] flex items-center gap-2">
        <span className="text-[#B63163]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;