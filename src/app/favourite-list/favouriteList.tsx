import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AlbumView } from '../list/components/albumView';
import SearchInput from '../list/components/searchInput';
import { Album, toggleFav } from '../shared/searchAlbum';
import { SessionContext } from '../shared/session';

function FavouriteList(): JSX.Element{
  const [{ favAlbums }, dispatchSession] = useContext(SessionContext);

  const [searchedAlbums, setSearchedAlbums] = useState<Album[]>();

  const addToFav = (album: Album) => {
    dispatchSession({ type: 'SET_FAV_ALBUM', favAlbums: toggleFav(album, favAlbums)});
  };

  const fetchAlbum = async (str: string) => {
    const response = favAlbums?.filter(alb => alb.artistName.toLowerCase().includes(str.toLowerCase()));

    setSearchedAlbums(response);
  };

  const renderAlbums = (albums: Album[] | undefined) => {
    if (!albums) {
      return 'No Album added to favourite yet';
    }

    return <div className="album-list">{albums.map(album => <AlbumView key={album.collectionId} album={album} addToFav={addToFav} showFavHeart />)}</div>;
  };

  return (
    <div>
      <div className="search-input-block">
        <SearchInput searchFn={fetchAlbum} />
        <Link to="/">Back to search</Link>
      </div>
      {renderAlbums(searchedAlbums ? searchedAlbums : favAlbums)}
    </div>
  );
}

export default FavouriteList;
