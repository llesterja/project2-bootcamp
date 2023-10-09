import React from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

const LoadingFullPageModal = () => {
  return (
    <div className="loading-modal">
      <CircularProgress
        color="primary"
        determinate={false}
        size="lg"
        value={26}
        variant="solid"
      />
    </div>
  );
};

export default LoadingFullPageModal;
