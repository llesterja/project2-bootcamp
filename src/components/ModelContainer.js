import React, { forwardRef } from 'react';
import withClickOutside from './withClickOutside';

const ModelContainer = forwardRef(({ open, setOpen }, ref) => {
  return (
    <section ref={ref}>
      <h1> demonstration </h1>
      <button onClick={() => setOpen(!open)}>dropdown toggle</button>

      {open && (
        <ul>
          <li>one</li>
          <li>two</li>
        </ul>
      )}
    </section>
  );
});

export default withClickOutside(ModelContainer);
