import React, { useState, useRef, useEffect } from 'react';

import type { GenreType } from 'src/types';

import Item from './Item';
import SelectDropBox from './SelectDropBox';

import StyledSelect from './SelectFilterBox.styles';

interface IProps {
  title: string;
  typeSelect?: boolean;
  items: GenreType[] | [];
  filter: string[] | string;
  setState: (newFilter: string) => void;
}

const SelectFilterBox: React.FC<IProps> = ({
  items,
  setState,
  filter,
  title,
  typeSelect,
}) => {
  const [dropSelect, setDropSelect] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useOutsideDrop(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: unknown }) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropSelect(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideDrop(wrapperRef);

  const handleDropSelect = () => {
    if (dropSelect) {
      setDropSelect(false);
    }
    if (!dropSelect) {
      setDropSelect(true);
    }
  };

  return (
    <StyledSelect drop={dropSelect} typeSelect={typeSelect} ref={wrapperRef}>
      <SelectDropBox handler={handleDropSelect} title={title} />
      <div className="select-box__items">
        {items.map((item) => (
          <Item
            title={title}
            filter={filter}
            setState={setState}
            key={item.id}
            name={item.name}
            id={item.id}
          />
        ))}
      </div>
    </StyledSelect>
  );
};

export default SelectFilterBox;