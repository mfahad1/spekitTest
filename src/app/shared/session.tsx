import React, { PropsWithChildren, createContext, useReducer } from 'react';

import localStorageService from './localStorageService';
import { Album } from './searchAlbum';

export type Session = {
  favAlbums?: Album[];
}

type ActionType = Session & {
  type: 'SET_FAV_ALBUM' | 'REMOVE_ALBUM';
}

const initialState = {
  favAlbums: localStorageService.get<Album[]>('favAlbums') || undefined,
};

type SessionContextType = [Session, React.Dispatch<ActionType>];

const SessionContext = createContext<SessionContextType>([
  initialState,
  (): null => null,
]);

const reducer = (state: Session, action: ActionType): Session => {
  const { type, ...payload } = action;

  switch (type) {
  case 'SET_FAV_ALBUM':
    localStorageService.set('favAlbums', payload.favAlbums);

    return { ...state, favAlbums: payload.favAlbums };

  default:
    throw new Error();
  }
};

const SessionContextProvider = (props: PropsWithChildren<any>): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SessionContext.Provider value={[state, dispatch]}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
export { SessionContext };
