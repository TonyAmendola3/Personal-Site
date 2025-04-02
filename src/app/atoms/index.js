import { atom } from 'jotai'

const marvelAtom = atom({
  total: 0,
  results: []
});

export {
    marvelAtom
}