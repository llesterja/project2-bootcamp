// ModelContainer.js
import React, { forwardRef, useContext } from 'react';
import withClickOutside from '../../utils/withClickOutside';
import NestedForm from '../Molecules/DropDown';
import searchContext from '../../utils/SearchContext';

const ModelContainer = forwardRef(({ open, setOpen }, ref) => {
  const [passengerInfoState] = useContext(searchContext);

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
            {passengerInfoState.adultCounterValue} Adult,{' '}
            {passengerInfoState.selectedOption}
          </span>
        </button>
        {open && <NestedForm className="passenger-type-accordian" />}
      </div>
    </section>
  );
});

export default withClickOutside(ModelContainer);
