import { useEffect, useRef, useState } from "react";

import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import InfiniteScroll from "react-infinite-scroll-component";

import { Header } from "../components";
import useStore from "../hooks/useStore";

import getPhotos from "../api/getPhotos";
import getNextPage from "../api/getNextPage";

const Home: NextPage = () => {
  const { photos, setPhotos } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const getMoreData = async () => {
    setIsLoading(true);

    try {
      const resp = await getNextPage(photos.next_page);
      setPhotos(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-28">
      <Head>
        <title>Photo Collections</title>
        <meta
          name="description"
          content="Photo Collections with Infinite Scroll features"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="mt-10 flex items-center justify-center flex-col space-y-2">
        <h1 className="text-5xl font-medium font-poppins text-gray-900">
          Photo Collections
        </h1>
        <p className="flex items-center space-x-1 text-lg">
          <span>Images From</span>
          <Link
            href="https://www.pexels.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:font-medium"
          >
            Pexels
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-between w-full mt-6 mb-1">
        <InfiniteScroll
          dataLength={photos.photos.length * photos.total_results}
          hasMore={photos.photos.length <= photos.total_results}
          next={getMoreData}
          loader={<></>}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "hidden",
          }}
        >
          <div className="grid h-full grid-cols-3 items-center gap-7">
            {photos.photos.map((photo, index) => (
              <Link
                passHref
                href={`/${photo.id}`}
                key={photo.id + index}
                className="w-full"
              >
                <Image
                  src={photo.src.medium}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center w-full h-20">
          <div className="w-10 h-10 border-t-4 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: await getPhotos(),
    },
  };
};
