import { IoCartOutline } from 'react-icons/io5'
import styles from '../../cart/cartStyles.module.css'
import Link from 'next/link'
import { roboto } from '@/config/fonts/fonts'
export const CartIconNavBar = () => {
    return (
        <div className={`${styles.cartContainerNavBar} ${roboto.className}`}>
            <Link href={'/shop/cart'} className={styles.linkCart}>
                <p> Mi Carrito </p>
                <IoCartOutline size={24} className="w-t h-7" />
            </Link>
        </div>
    )
}
