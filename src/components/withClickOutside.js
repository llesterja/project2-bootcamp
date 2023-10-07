import React, { useState, useRef, useEffect } from 'react';

export default function withClickOutside(WrappedComponent) {
  const Component = (props) => {
    const [open, setOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          !ref.current.contains(event.target) &&
          !event.target.classList.contains('MuiSelect-root') &&
          !event.target.classList.contains('MuiListItem-button')
        ) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
    }, [ref]);

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />;
  };

  return Component;
}
