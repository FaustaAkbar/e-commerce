import React from 'react';
import HeaderHP from '../components/homepage/HeaderHP';
import FooterHP from '../components/homepage/FooterHP';
import BodyHP from '../components/homepage/BodyHP';
import { BubbleChat } from 'flowise-embed-react'; // Import BubbleChat

const HomePage = () => {
  return (
    <div className="homepage">
      <HeaderHP />
      <BodyHP />
      <BubbleChat chatflowid="11bbde52-cf88-48bc-8cd8-4e6d3587d484" apiHost="http://localhost:3000" />
      <FooterHP />
    </div>
  );
};

export default HomePage;
