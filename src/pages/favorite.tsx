import React, { FC } from 'react';
import Head from 'next/head';
import FavoritePageContainer from '../components/containers/FavoritePageContainer';

const Favorite: FC = () => {
  return (
    <div>
      <Head>
        <title>Movie Tracker | Избранное</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FavoritePageContainer />
    </div>
  );
};

export default Favorite;
