import React, { useState, useEffect } from "react";
import ModeToggle from "./ModeToggle"; // Asegúrate de que esta ruta sea correcta.
import { Image, Link, Skeleton } from "@nextui-org/react";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-zinc-950 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link color="foreground" href="/">
            <Image alt="logo" src="/brand.svg" width={100} />
          </Link>
        </div>

        {/* Desktop Links Centered */}
        <div className="hidden md:flex space-x-4 items-center justify-center flex-grow">
          {isLoading ? (
            <>
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
            </>
          ) : (
            <>
              <Link href="/live">
                <a className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  Live
                </a>
              </Link>
              <Link href="/watch">
                <a className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  Watch
                </a>
              </Link>
              <Link href="/chao2024">
                <a className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                  Chao 2024
                </a>
              </Link>
            </>
          )}
        </div>

        {/* Mode Toggle on Right */}
        <div className="hidden md:flex items-center">
          <ModeToggle />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 shadow-lg">
          <div className="flex flex-col space-y-2 px-4 py-2">
            {isLoading ? (
              <>
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </>
            ) : (
              <>
                <Link href="/live">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    Live
                  </a>
                </Link>
                <Link href="/watch">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    Watch
                  </a>
                </Link>
                <Link href="/chao2024">
                  <a className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    Chao 2024
                  </a>
                </Link>
                <div className="pt-2">
                  <ModeToggle />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
