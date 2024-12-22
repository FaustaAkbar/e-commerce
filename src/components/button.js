import React from 'react';

const button = ({ platform, iconSrc, onClick }) => {
  const bgColor = platform === 'Google' ? 'bg-gray-200 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-500';

  return (
    <button className={`flex items-center justify-center w-full py-3 text-black rounded-md shadow-md ${bgColor}`} onClick={onClick}>
      <img src={iconSrc} alt={`${platform} Icon`} className="h-5 w-5 mr-3" />
      Login with {platform}
    </button>
  );
};

export default button;
