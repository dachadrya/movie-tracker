import React, { FC, useEffect } from 'react';
import Header from './header/Header';
import { useFavorite } from '../../hooks/useFavorite';
import { useSession } from 'next-auth/react';
import Footer from './footer/Footer';

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { data: session } = useSession();

  const { getFavoriteList } = useFavorite();

  useEffect(() => {
    if (session?.user?.id) {
      getFavoriteList(session?.user?.id);
    }
  }, [session]);

  return (
    <div className={'layout'}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
