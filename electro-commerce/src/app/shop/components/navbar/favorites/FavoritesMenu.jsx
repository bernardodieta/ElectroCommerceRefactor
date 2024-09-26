'use client';
import { MdFavorite } from 'react-icons/md';
import styles from './favoriteMenu.module.css';
import { useEffect, useState, useRef } from 'react';
import { useUsersStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { roboto } from '@/config/fonts/fonts';

export const FavoritesMenu = () => {
    const dataFavorites = useUsersStore((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();

    const handleDropMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false); 
        }
    };

    const handleClickProduct = (id) => {
        router.push(`/shop/product/${id}`);
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={`${styles.favoriteMenuContainer} ${roboto.className}`}>
            <div className={styles.btnOpenFavorite} onClick={handleDropMenu}>
                <p className={`${styles.btnFavorites} ${roboto.className}`}>Favoritos</p>
                <MdFavorite size={24} className={styles.favoriteIcon} />
            </div>

            <div ref={menuRef} className={isOpen ? styles.dropFavoriteContainer : styles.closed}>
                {dataFavorites?.favProducts && dataFavorites.favProducts.length > 0 ? (
                    dataFavorites.favProducts.map((product) => (
                        <div
                            key={product.productId}
                            onClick={() => handleClickProduct(product.productId)}
                            className={styles.cardFavorite}
                        >
                            <div className={styles.imgContainer}>
                                {product.img && product.img.length > 0 && (
                                    <img
                                        src={`/images/${product.img[0].path}`}
                                        alt={product.title.substring(0, 30)}
                                        className={styles.imgFavoriteProduct}
                                    />
                                )}
                            </div>
                            <div className={styles.favoriteText}>
                                <p className={styles.regularFont}>
                                    {product.title.substring(0, 30) + '...'}
                                </p>
                                <p className={styles.boldFont}>${product.price}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No hay productos en favoritos.</div>
                )}
            </div>
        </div>
    );
};
