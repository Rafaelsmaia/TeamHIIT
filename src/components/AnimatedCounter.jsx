import React from 'react';

function AnimatedCounter({ end, suffix = '' }) {
  return (
    <span>{end}{suffix}</span>
  );
}

export default AnimatedCounter;


