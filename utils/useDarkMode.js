import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            Cookies.set('theme', 'dark')
            setTheme('dark')
        } else {
            Cookies.set('theme', 'light')
            setTheme('light')
        }
    };

    useEffect(() => {
        const localTheme = Cookies.get('theme');
        localTheme && setTheme(localTheme);
    }, []);

    return [theme, toggleTheme]
};