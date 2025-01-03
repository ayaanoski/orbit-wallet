import React, { useState } from 'react';

interface AvatarPickerProps {
  onSelect: (avatar: string | File) => void;
}

const avatars = [
  "/avatars/1.png",
  "/avatars/2.png",
  "/avatars/3.png",
  "/avatars/4.png",
];

const AvatarPicker: React.FC<AvatarPickerProps> = ({ onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | File | null>(null);
  const [customAvatarURL, setCustomAvatarURL] = useState<string | null>(null);

  const handleSelect = (avatar: string | File) => {
    setSelectedAvatar(avatar);
    if (typeof avatar === "string") {
      setCustomAvatarURL(null);
    }
    onSelect(avatar);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      const fileURL = URL.createObjectURL(file);
      setCustomAvatarURL(fileURL);
      onSelect(file);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md mt-6">
      <h2 className="text-white text-center font-press-start mb-4">Select Your Avatar</h2>

      {selectedAvatar && (
        <div className="text-center mb-4">
          <h3 className="text-white mb-2">Selected Avatar</h3>
          <img
            src={customAvatarURL || (typeof selectedAvatar === "string" ? selectedAvatar : "")}
            alt="Selected Avatar"
            className="w-16 h-16 mx-auto rounded-full"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {avatars.map((avatar, index) => (
          <button
            key={index}
            onClick={() => handleSelect(avatar)}
            className="p-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-16 h-16 mx-auto rounded-full"
            />
          </button>
        ))}
      </div>

      <div className="mt-4 text-center">
        <label className="block text-white mb-2">
          Or Upload Your Own Avatar
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-700 file:text-white
            hover:file:bg-gray-600"
        />
      </div>
    </div>
  );
};

export default AvatarPicker;
