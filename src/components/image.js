import React from 'react';

const image = () => {
  return (
    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('/images/bangzek.png')" }}>
      <div className="h-full w-full bg-black/30 flex items-center justify-center"></div>
    </div>
  );
};

export default image;
