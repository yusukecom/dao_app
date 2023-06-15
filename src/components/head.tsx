import * as React from 'react';
import Head from 'next/head';

export default function HeadComponent(): JSX.Element {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>Create a DAO tool</title>
      <meta name="title" content="Create a DAO tool from scratch" />
      <meta name="description" content="TypeScript + React.js + NEXT.js + Thirdweb + Vercel" />

    </Head>
  ); 
}