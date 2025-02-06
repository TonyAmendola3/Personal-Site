import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { md5 } from 'js-md5';

import { marvelAtom } from '../atoms';
import { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from '../constants';
import { sha256 } from './helpers';

const timestamp = Date.now();

export default async function Marvel() {
  const urlHash = md5(`${timestamp}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);
  
  try {
    const url = `http://gateway.marvel.com/v1/public/comics?apikey=${MARVEL_PUBLIC_KEY}&ts=${timestamp}&hash=${urlHash}`;
              
    const marvelResponse = await fetch(url);
    const marvelData = await marvelResponse.json();
    console.log(marvelData);
  } catch (e) {
    console.error(e);
  }

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
         <div>
          Marvel lookup
          </div>
        </main>
      </div>
    );
  }
  