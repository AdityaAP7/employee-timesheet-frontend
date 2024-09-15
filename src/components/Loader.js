import React from 'react';
import { styled } from '@mui/system';

const LoaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Background overlay
  zIndex: 9999,
});

const LoaderCircle = styled('div')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '5px solid #fff', // White background
  borderTop: '5px solid #1d1e42', // Navy blue color
  animation: 'spin 1s linear infinite',

  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderCircle />
    </LoaderWrapper>
  );
};

export default Loader;
