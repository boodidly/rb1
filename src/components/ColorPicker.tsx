import React from 'react';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  onColorChange,
  label
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-400">{label}</label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-8 h-8 rounded overflow-hidden cursor-pointer bg-transparent"
        />
        <input
          type="text"
          value={currentColor}
          onChange={(e) => {
            const val = e.target.value;
            if (val.match(/^#[0-9A-Fa-f]{0,6}$/)) {
              if (val.length === 7) {
                onColorChange(val);
              }
            }
          }}
          className="flex-1 px-2 py-1.5 bg-[#2A2A2A] rounded text-sm font-mono border border-[#3A3A3A] focus:border-[#B63163] focus:outline-none"
          placeholder="#RRGGBB"
          maxLength={7}
        />
      </div>
    </div>
  );
};

export default ColorPicker;