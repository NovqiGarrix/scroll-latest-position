import { NextPage } from "next";
import Link from "next/link";

import { Header } from "../components";

const AboutPage: NextPage = () => {
  return (
    <div className="px-28 font-poppins">
      <Header />

      <div className="mt-10 flex items-center justify-center flex-col max-w-2xl mx-auto">
        <h1 className="text-5xl font-medium font-poppins text-gray-900 mb-6">
          About Page
        </h1>

        <div className="space-y-5 text-lg">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
            ratione voluptas eum molestias asperiores, laudantium molestiae
            quaerat autem aut. Asperiores!
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque quia
            aperiam exercitationem consequatur cumque obcaecati architecto ipsa.
            Distinctio corporis quibusdam reiciendis doloremque eligendi, natus
            beatae? Soluta voluptatem veritatis magni corporis.
          </p>

          <p className="flex items-center space-x-1 text-lg">
            <span>Visit the article</span>
            <Link
              href="https://www.pexels.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              https://www.pexels.com/
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
