'use client';
import styles from './searchBarNavBar.module.css';
import Link from 'next/link';
import { useSearchController } from './searchController.js';
import { useState, useEffect, useRef } from 'react';
import { roboto } from '@/config/fonts/fonts';

export const SearchInputBar = () => {
    const publicUrl = process.env.NEXT_PUBLIC_API_URL;
    const { query, filteredResults = [], isLoading, handleInputChange, clearSearch } = useSearchController();
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null); 

    const handleFocusInput = () => {
        setIsFocused(true);
    };

    const handleBlurInput = (e) => {
        
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setIsFocused(false);
            clearSearch(); 
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleBlurInput);
        return () => {
            document.removeEventListener('mousedown', handleBlurInput);
        };
    }, []);

    return (
        <div className={styles.containerSearchBar} ref={containerRef}>
            <form className={styles.formSearchBar}>
                <input
                    type="search"
                    placeholder="Buscar"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocusInput}
                    className={isFocused ? styles.focusedInput : styles.inputSearch}
                    ref={inputRef}
                />
                <button className={styles.button}>Buscar</button>
            </form>

            {isLoading && <div className={styles.loading}>Cargando...</div>}

            {isFocused && filteredResults?.length > 0 && (
                <ul className={styles.resultsList}>
                    {filteredResults.map((result, index) => (
                        <li key={index} className={styles.resultItem}>
                            <Link href={`/shop/product/${result._id}`} passHref className={`${roboto.className} ${styles.linkText} `}>
                                <img src={`/images/${result.img[0].path}`} alt="" className={styles.resultImage} />
                                <span onClick={clearSearch} className={styles.resultText}>{result.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
