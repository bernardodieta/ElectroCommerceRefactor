import Image from 'next/image'
import styles from './navBar.module.css'
import logoNavBar from '/public/imagenes/logoNavBar.png'
import "../../../../styles/reset.css";
import { LoginNavbar } from './login/LoginNavBar';
import Link from 'next/link'
import { roboto } from '@/config/fonts/fonts';
import { CartIconNavBar } from './cart/CartIconNavBar';
import { FavoritesMenu } from './favorites/FavoritesMenu';
import { SearchInputBar } from './search/SearchInputBar';
import NotificationBell from './notifications/NotificationBell';


export const NavBar = () => {

    return (
        <div className={styles.navModule}>
            <div className={`${styles['navBar-container']}`}>
                <div className={styles.logoContainer}>
                    <Link href={'/'}>
                        <Image
                            src={logoNavBar}
                            alt='imagen logo'
                            className={styles.imgLogoNavBar} />
                    </Link>
                </div>
                <div className={styles.SearchBarNavBar}>
                    <SearchInputBar />
                </div>
                <div className={`${roboto.className} ${styles.FavoritesMenu}`} >
                    <FavoritesMenu />
                </div>
                <div className={`${roboto.className} ${styles.FavoritesMenu}`} >
                    <NotificationBell />
                </div>
                <div className={`${roboto.className} `}>
                    <LoginNavbar />
                </div>
                <div className={styles.LoginNavbar}>
                    <CartIconNavBar />
                </div>

            </div>
        </div>
    )
}
