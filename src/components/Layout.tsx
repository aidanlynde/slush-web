import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title = 'Slush - Split Bills Easily',
  description = 'Slush helps you split bills and get paid back quickly and easily.'
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}