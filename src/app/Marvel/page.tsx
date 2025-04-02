'use client';

import { ChangeEvent, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import useSWR, {SWRResponse} from 'swr';

import { marvelAtom } from '../atoms';
import { MARVEL_PUBLIC_KEY } from '../constants';
import { fetchMarvel } from './helpers';

interface marvelCharType {
  id: Number,
  name: String,
  thumbnail: {
    path: String,
    extension: String
  }
}

export default function Marvel() {
  const marvelCharacters = useAtomValue(marvelAtom);
  const setMarvel = useSetAtom(marvelAtom);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMarvelCharacter = (searchStr?: string):any => {
    const url = `https://gateway.marvel.com/v1/public/characters?apikey=${MARVEL_PUBLIC_KEY}&nameStartsWith=${searchStr}`;
    const fetchMarvelResponse = fetchMarvel(url);
  
    return fetchMarvelResponse;
  }

  const characterSearch = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setIsLoading(true);
    const searchStr:string = e.target.value;
    const { data, error } = await getMarvelCharacter(searchStr);
  
    if (error) setHasError(true); 
    if (data) {
      setMarvel({
        total: data.total,
        results: data.results,
      });
      setIsLoading(false);
    }
  }

  const renderCharacters = () => {
    return marvelCharacters.results.map((character: marvelCharType) => {
      return (
        <div key={character.id}>
          <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
          <span>{character.name}</span>
        </div>
      )
    })
  }

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div>
          Marvel Characters
          </div>
          <div>
            <label>Character Search: </label>
            <input onChange={characterSearch} placeholder='example: Spider-Man' />
          </div>
          {hasError && 
            <div>Failed to load</div>
          }
          {isLoading &&
            <div>Loading...</div>
          }
          {!hasError && !isLoading && (
            <>
              <div>
                Found {marvelCharacters.total} Characters found
              </div>
              {renderCharacters()}
            </>
          )}
        </main>
      </div>
    </>
  );
}
  