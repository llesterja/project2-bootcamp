// ModelContainer.js
import React, { forwardRef, useState } from 'react';
import withClickOutside from './withClickOutside';
import NestedForm from './DropDown';

const ModelContainer = forwardRef(({ open, setOpen }, ref) => {
  const [adultCounterValue, setAdultCounterValue] = useState(0);
  const [childCounterValue, setChildCounterValue] = useState(0);

  return (
    <section ref={ref}>
      <div className="toggle-menu">
        <button
          onClick={(event) => {
            event.preventDefault();
            setOpen(!open);
          }}
        >
          <span className="placeholder-text"> Travellers and cabin Class</span>
          <span className="option text">
            {adultCounterValue} Adult, First Class
          </span>
        </button>
        {open && (
          <NestedForm
            className="passenger-type-accordian"
            // Pass the handler function
            adultCounterValue={adultCounterValue}
            setAdultCounterValue={setAdultCounterValue}
            childCounterValue={childCounterValue}
            setChildCounterValue={setChildCounterValue}
          />
        )}
      </div>
    </section>
  );
});

export default withClickOutside(ModelContainer);
