// @flow strict
import React from "react";
import Helmet from "react-helmet";
import type { Node as ReactNode } from "react";
import { useSiteMetadata } from "../../hooks";
import styles from "./Layout.module.scss";

import {
  ThemeContext,
  ThemeProvider,
  ThemedLayout,
  ToggleSwitch,
} from "../ThemeContext";
import Search from "../Search";
const searchIndices = [{ name: `Pages`, title: `Pages` }];

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  socialImage?: string,
};

const Layout = ({ children, title, description, socialImage = "" }: Props) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage || author.photo;
  const metaImageUrl = url + metaImage;

  return (
    <div style={{ marginLeft: -50 }}>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(theme) => (
            <ThemedLayout theme={theme}>
              <div className={styles.layout}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    float: "right",
                  }}
                >
                  <Search indices={searchIndices} />
                  <ToggleSwitch theme={theme} />
                </div>
                <Helmet>
                  <html lang="en" />
                  <title>{title}</title>
                  <meta name="description" content={description} />
                  <meta property="og:site_name" content={title} />
                  <meta property="og:image" content={metaImageUrl} />
                  <meta name="twitter:card" content="summary" />
                  <meta name="twitter:title" content={title} />
                  <meta name="twitter:description" content={description} />
                  <meta name="twitter:image" content={metaImageUrl} />
                </Helmet>
                {children}
              </div>
            </ThemedLayout>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
