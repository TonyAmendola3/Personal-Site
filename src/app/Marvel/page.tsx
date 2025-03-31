'use client';

import useSWR from 'swr';
import { useAtomValue, useSetAtom } from 'jotai';
import { md5 } from 'js-md5';

import { marvelAtom } from '../atoms';
import { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from '../constants';
import { fetcher } from './helpers';

export default function Marvel() {
  const marvelCharacters = useAtomValue(marvelAtom);
  const setMarvel = useSetAtom(marvelAtom);

  const url = `https://gateway.marvel.com/v1/public/characters?apikey=${MARVEL_PUBLIC_KEY}`;
  const { data, error } = useSWR(url, fetcher);
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  if (data) setMarvel(data.data.results);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
        Marvel lookup
        </div>
        <div>
          Found {marvelCharacters.length} Characters
        </div>
      </main>
    </div>
  );
}
  