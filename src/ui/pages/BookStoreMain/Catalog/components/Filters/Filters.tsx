import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SelectBox from 'src/ui/components/Filters/SelectFilterBox';

import type { GenreType } from 'src/types/bookStoreTypes';

import StyledFilters from './Filters.styles';

type PropsType = {
  genres: GenreType[];
};

export const sort = [
  { id: 1, name: 'Price' },
  { id: 2, name: 'Name' },
  { id: 3, name: 'Author name' },
  { id: 4, name: 'Rating' },
  { id: 5, name: 'Date of issue' },
];

const Filters: React.FC<PropsType> = ({ genres }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const minStartPrice = 0;
  const maxStartPrice = 100;

  const [filterSorting, setFilterSorting] = useState<string>('Price');
  const [filterGenres, setFilterGenres] = useState<string[]>([]);

  const [valuePrice, setValuePrice] = useState(() => {
    const minValue = Number(searchParams.get('minPrice') || minStartPrice);
    const maxValue = Number(searchParams.get('maxPrice') || maxStartPrice);
    return [minValue, maxValue];
  });

  useEffect(() => {
    const genre = searchParams.get('genres');
    if (genre) {
      const filter = genre?.split(',');
      setFilterGenres(filter);
    }
  }, [searchParams]);

  useEffect(() => {
    searchParams.set('genres', filterGenres.join());
    if (!filterGenres.length) {
      searchParams.delete('genres');
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterGenres, setSearchParams]);

  useEffect(() => {
    searchParams.set('select', filterSorting as string);
    if (!filterSorting) {
      searchParams.delete('select');
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSorting, setSearchParams]);

  const handlerChangeFilterGenre = (newFilter: string) => {
    setFilterGenres((prevFilter) => {
      if (prevFilter.includes(newFilter)) {
        return prevFilter.filter((searchFilter) => searchFilter !== newFilter);
      }

      return [...prevFilter, newFilter];
    });
  };

  const handlerSelectionPrice = (value: number[]) => {
    searchParams.set('minPrice', value[0].toString());
    searchParams.set('maxPrice', value[1].toString());
    if (value[0] === minStartPrice && value[1] === maxStartPrice) {
      searchParams.delete('minPrice');
      searchParams.delete('maxPrice');
    }
    setSearchParams(searchParams);
  };

  const handlerChangeSort = (name: string) => {
    setFilterSorting(name);
  };

  const handlerChangePrice = (value: number[]) => {
    setValuePrice(value);
  };

  return (
    <StyledFilters>
      <h2 className="filters__title">Catalog</h2>
      <div className="filters__book-filter">
        <SelectBox
          title="Genre"
          filter={filterGenres}
          items={genres}
          handlerChange={handlerChangeFilterGenre}
        />

        <SelectBox
          title="Price"
          value={valuePrice}
          minStartPrice={minStartPrice}
          maxStartPrice={maxStartPrice}
          onChange={handlerChangePrice}
          onAfterChange={handlerSelectionPrice}
        />

        <SelectBox
          typeSelect
          title={`Sort by ${filterSorting.toLowerCase()}`}
          filter={filterSorting}
          items={sort}
          handlerChange={handlerChangeSort}
        />
      </div>
    </StyledFilters>
  );
};

export default Filters;
