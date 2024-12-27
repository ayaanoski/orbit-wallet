// import React from 'react';

// interface AvatarPickerProps {
//   onSelect: (avatar: string) => void;
// }

// const avatars = [
//   "1.png",  // Modify the file names based on your actual images
//   "2.png",
//   "3.png",
//   "4.png",
// ];

// const AvatarPicker: React.FC<AvatarPickerProps> = ({ onSelect }) => {
//   return (
//     <div className="bg-gray-800 p-4 rounded shadow-md mt-6">
//       <h2 className="text-white text-center font-press-start mb-4">Select Your Avatar</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {avatars.map((avatar, index) => (
//           <button
//             key={index}
//             onClick={() => onSelect(avatar)}
//             className="p-2 bg-gray-700 rounded hover:bg-gray-600"
//           >
//             <img
//               src={`/src/assets/avatars/${avatar}`}  // Adjust path based on your folder structure
//               alt={`Avatar ${index + 1}`}
//               className="w-16 h-16 mx-auto rounded-full"  // Makes the image circular
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvatarPicker
import React, { useState } from 'react';

interface AvatarPickerProps {
  onSelect: (avatar: string) => void;
}

const avatars = [
  "1.png",  // Modify the file names based on your actual images
  "2.png",
  "3.png",
  "4.png",
];

const AvatarPicker: React.FC<AvatarPickerProps> = ({ onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);  // Call the parent onSelect function
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md mt-6">
      <h2 className="text-white text-center font-press-start mb-4">Select Your Avatar</h2>
      
      {/* Display selected avatar */}
      {selectedAvatar && (
        <div className="text-center mb-4">
          <h3 className="text-white mb-2">Selected Avatar</h3>
          <img
            src={`/src/assets/avatars/${selectedAvatar}`}  // Adjust path based on your folder structure
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
              src={`/src/assets/avatars/${avatar}`}  // Adjust path based on your folder structure
              alt={`Avatar ${index + 1}`}
              className="w-16 h-16 mx-auto rounded-full"  // Makes the image circular
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarPicker;
