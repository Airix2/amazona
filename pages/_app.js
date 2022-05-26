import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utils/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import darkTheme from '../styles/theme/darkTheme';
import '../styles/globals.css';
import { useDarkMode } from '../utils/useDarkMode';
import { StateProvider } from '../utils/cart/stateContext'

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(()=> {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <StateProvider>
          <Component {...pageProps} themeObj={{theme: theme, toggleTheme: toggleTheme}} />
        </StateProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};