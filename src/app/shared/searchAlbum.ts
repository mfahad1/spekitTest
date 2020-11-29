import Api, { ListResponse } from './api';
import localStorageService from './localStorageService';

export type Album = {
  amgArtistId: number;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  country: string;
  currency: string;
  description: string;
  previewUrl: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCount: number;
  wrapperType: string;
  trackId: string;
  liked?: boolean;
}

export function searchAlbum(searchParam: string): Promise<ListResponse<Album>> {
  return Api.get<ListResponse<Album>>(`search?term=${searchParam}&entity=album`);
}

export function removeFromFav(album: Album, albums: Album[] | null): Album[] | undefined {
  if (!albums) return undefined;
  const filtered = albums.filter(alb => alb.artistId !== album.artistId || alb.collectionId !== album.collectionId || alb.amgArtistId !== album.amgArtistId);

  return filtered;
}

export function toggleFav(album: Album, albums: Album[] | undefined): Album[] | undefined {
  if (!album.liked) {
    const likedAlbum = { ...album, liked: true };

    if (albums) {
      const foundIndex = albums.findIndex(alb => alb.artistId === album.artistId && alb.collectionId === album.collectionId && alb.amgArtistId === album.amgArtistId);

      if (foundIndex >= 0) {
        return removeFromFav(album, albums);
      }
      albums.push(likedAlbum);
    } else {
      albums = [likedAlbum];
    }

    return albums;
  }

  if (!albums) return undefined;

  return removeFromFav(album, albums);
}

export function getFavAlbums(): Album[] | undefined {
  return localStorageService.get<Album[]>('favAlbums') ?? undefined;
}
