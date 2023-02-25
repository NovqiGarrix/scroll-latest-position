import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Fragment, useEffect } from "react";

import { Router } from "next/router";
import NextProgress from "next-progress";

import useStore from "../hooks/useStore";

// This way we can make sure the data is only loaded once
let dataIsLoaded = false;

function MyApp({ Component, pageProps }: AppProps) {
  // Load the initial data from getServerSideProps to Zustand when the page is loaded
  if (pageProps.data && !dataIsLoaded) {
    useStore.setState({ photos: pageProps.data });
    dataIsLoaded = true;
  }

  useEffect(() => {
    // Listen to route changes when the app start loading the page
    const handleRouteChange = (nextUrl: string) => {
      // We don't want to reset the scroll position when the user is navigating to the home page
      if (nextUrl === "/") return;

      console.log("Save scroll position", window.scrollY);
      useStore.getState().setScrollPosition(window.scrollY);
    };

    // Subscribe to route changes
    Router.events.on("routeChangeStart", handleRouteChange);

    // Unsubscribe from route changes
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    // Listen to route changes when the page is loaded
    const handleRouteChange = (nextURL: string) => {
      const scrollPosition = useStore.getState().scrollPosition;
      if (nextURL !== "/" || !scrollPosition) return;

      console.log("Scrolling...");
      setTimeout(() => {
        window.scrollTo({
          behavior: "smooth",
          top: useStore.getState().scrollPosition,
        });
        useStore.getState().setScrollPosition(0);

        // You can customize this delay based on your needs
      }, 200);
    };

    // Subscribe to route changes
    Router.events.on("routeChangeComplete", handleRouteChange);

    // Unsubscribe from route changes
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <Fragment>
      <NextProgress color="#000" />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
