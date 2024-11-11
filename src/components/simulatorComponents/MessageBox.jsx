import React from 'react';

const MessageBox = ({ message }) => (
  <div className="neumorphic-container h-24 rounded-lg shadow-inner bg-gray-100 p-4 ">
    <p>{message}</p>
  </div>
);

export default MessageBox;
