import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import getPhoto from "../api/getPhoto";

import { Header } from "../components";
import { Photo } from "../types";

interface ImageDetailPageProps {
  photo: Photo;
}

function upperCaseFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

const ImageDetailPage: NextPage<ImageDetailPageProps> = (props) => {
  const { photo } = props;

  return (
    <div className="px-28 font-poppins">
      <Header />

      <div className="my-10 max-w-3xl mx-auto">
        <h1 className="text-5xl font-medium text-center font-poppins text-gray-900 mb-6">
          {photo.alt}
        </h1>

        <Image
          alt={photo.alt}
          src={photo.src.large2x}
          width={photo.width}
          height={photo.height}
          priority
          className="rounded-2xl"
        />

        <div className="flex items-center space-x-1 justify-center mt-2 text-lg">
          <span>Photo taken by</span>
          <Link
            passHref
            target="_blank"
            rel="noopener noreferrer"
            href={photo.photographer_url}
            className="underline font-medium"
          >
            {upperCaseFirstLetter(photo.photographer)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;

  return {
    props: {
      photo: await getPhoto(id),
    },
  };
};
