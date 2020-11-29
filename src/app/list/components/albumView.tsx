import React, { useEffect, useState } from 'react';

import {ReactComponent as HeartLogoOutlined} from '../../../resources/heart-outline.svg';
import {ReactComponent as HeartLogo} from '../../../resources/heart.svg';
import { Album } from '../../shared/searchAlbum';

import './albumView.scss';

type AlbumViewType = {
  album: Album;
  addToFav: (album: Album) => void;
  showFavHeart?: boolean;
}

export function AlbumView({ album, addToFav, showFavHeart = false }: AlbumViewType): JSX.Element {
  // const toggleFav = (album: Album) => {
  //   if (album.liked){
  //     removeFromFav(album);

  //     return;
  //   }

  //   addToFav(album);
  // };

  return (
    <div className="album-view">
      {showFavHeart && <div className="heart-logo" onClick={() => addToFav(album)}>{album.liked ? <HeartLogo width="20" /> : <HeartLogoOutlined width="20" />}</div>}
      <div className="name">
        <img src={album.artworkUrl100} />
      </div>
      {!showFavHeart && <div className="heart-logo flex-center" onClick={() => addToFav(album)}><HeartLogo width="20" /></div> }
      <h5>{album.collectionName}</h5>
      <div className='info'>
        <div className="flex-space-between"><b>By:</b> {album.artistName}</div>
        <div className="flex-space-between"><b>Genre:</b> {album.primaryGenreName}</div>
        <div className="flex-space-between"><b>Released:</b> {new Date(album.releaseDate).toLocaleDateString()}</div>
        <div className="flex-space-between"><b>Price:</b> ${album.collectionPrice}</div>
      </div>
      <div>{album.description}</div>
    </div>
  );
}
