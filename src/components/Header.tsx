import { FunctionComponent, useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "../utils/classNames";

const Header: FunctionComponent = () => {
  const router = useRouter();

  const headers = useMemo(() => {
    return [
      {
        name: "Home",
        href: "/",
        isActive: router.pathname === "/",
      },
      {
        name: "About",
        href: "/about",
        isActive: router.pathname === "/about",
      },
    ];
  }, [router.pathname]);

  return (
    <header>
      {/* Create a  list of navigation items */}
      <nav className="flex items-center space-x-5 w-full h-20">
        {headers.map((header) => (
          <Link
            key={header.name}
            href={header.href}
            className="flex items-center space-x-2"
          >
            <h1
              className={classNames(
                "text-2xl font-poppins text-gray-900 hover:text-gray-500",
                header.isActive ? "font-medium" : ""
              )}
            >
              {header.name}
            </h1>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
