import React from 'react'
import styles from './categoryOffers.module.css'
import Link from 'next/link'
export const CategoryOffers = () => {
    return (
        <div className={styles.containerCategoryOffers}>
            <div className={styles.titleCategoryOffers}>
                <p>CATEGORIAS</p>
            </div>
            <div className={styles.contentCategoryOffers}>
                <Link href={'/shop/category/laptops'} passHref>
                    <div className={styles.boxCategoryOffers}>
                        <h2>Laptops</h2>
                        <div className={styles.barritaSeparadora}></div>
                        <img src="/imagenes/image11.jpg" alt="Laptops" />
                    </div>
                </Link>

                <Link href={'/shop/category/laptops'} passHref>
                    <div className={styles.boxCategoryOffers}>
                        <h2>Tablets</h2>
                        <div className={styles.barritaSeparadora}></div>
                        <img src="/imagenes/image12.jpg" alt="Laptops" />
                    </div>
                </Link>

                <Link href={'/shop/category/laptops'} passHref>
                    <div className={styles.boxCategoryOffers}>
                        <h2>Celulares</h2>
                        <div className={styles.barritaSeparadora}></div>
                        <img src="/imagenes/image13.jpg" alt="Laptops" />
                    </div>
                </Link>

            </div>

        </div>
    )
}
