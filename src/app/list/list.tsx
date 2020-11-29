import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { searchAlbum, Album, toggleFav } from '../shared/searchAlbum';
import { SessionContext } from '../shared/session';

import { AlbumView } from './components/albumView';
import SearchInput from './components/searchInput';

import './list.scss';

function List(): JSX.Element {
  const [albums, setAlbums] = useState<Album[]>();

  const [{ favAlbums }, dispatchSession] = useContext(SessionContext);

  const fetchAlbum = async (str = 'jackson') => {
    const response = await searchAlbum(str);

    setAlbums(response.results);
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  const addToFav = (album: Album) => {
    dispatchSession({ type: 'SET_FAV_ALBUM', favAlbums: toggleFav(album, favAlbums)});
  };

  return (
    <div>
      <div className="search-input-block">
        <SearchInput searchFn={fetchAlbum} />
        <Link to="/favourite">My Liked Albums</Link>
      </div>
      {albums && <div className="album-list">{albums.map(album => <AlbumView key={album.collectionId} album={album} addToFav={addToFav} />)}</div>}
    </div>
  );
}

export default List;
