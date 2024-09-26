'use client'
import { useCartStore } from "@/store/cartStore";
import { useUsersStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import styles from './cartStyles.module.css';
import { roboto } from "@/config/fonts/fonts";
//import { BankPromo } from "../bankpromo/BankPromo";


export const CartShop = () => {
    const router = useRouter();
    const user = useUsersStore((state) => state.user);
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const handleAdd = async (product, quantity) => {
        await addToCart(product, quantity);
    };

    const handleRemove = async (productId) => {
        await removeFromCart(productId);
    };

    const handleprePurchase = async () => {
        try {
            router.push('/auth/checkout/');
        } catch (error) {
            console.log(error);
        }
    };

 
    const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const shippingCost = 5; 

    return (
        <div className={`${styles.cartMain} ${roboto.className}`}>
            <div className={`${styles.cartContainerMain} ${roboto.className}`}>
                <h2>Productos</h2>
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <div className={styles.cartProductBox} key={item._id}>
                            {item.product.img && item.product.img.length > 0 && (
                                <img
                                    src={`/images/${item.product.img[0].path}`}
                                    alt={item.product.title.substring(0, 30)}
                                    className={styles.imgCart}
                                />
                            )}
                            <div className={styles.productDetail}>
                                <div>
                                    <h3 key={item.product?.id} className="text-lg font-semibold">
                                        {item.product?.title.substring(0, 30) || 'Product Title Missing'}
                                    </h3>
                                    <div className={styles.btnsEdit}>
                                        <button onClick={() => handleRemove(item.product?._id)}>Eliminar</button>
                                        <button>Guardar</button>
                                    </div>
                                </div>
                                <div className={`${styles.quantityBox} ${roboto.className}`}>
                                    <div className={styles.btnsQuantity}>
                                        <button onClick={() => handleAdd(item.product, -1)}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => handleAdd(item.product, 1)}>+</button>
                                    </div>
                                    <p>Stock: {item.product.stock}</p>
                                </div>
                                <div className={`${styles.priceContent} ${roboto.className}`}>
                                    <div className={styles.priceContentText}>
                                        <p className={styles.descuentoCart}>30%</p>
                                        <p>$ {item.product?.price}</p>
                                    </div>

                                    <div className={styles.totalprice}>
                                        $ {item.product?.price * item.quantity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={`${styles.emptyCartContainer} ${roboto.className}`}>
                        <img src="../../../imagenes/icono-emptyCart.png" alt="" />
                        <h2>Tu carrito de compras esta vacio</h2>
                        <p>Aprovecha todas las ofertas diarias </p>
                        <button>Encuentra Ofertas</button>
                    </div>
                )}
            </div>

            <div className={`${styles.priceTotalBox} `}>
                <h2>Resumen de compra</h2>
                <p className={`${styles.FontMedium} `}>Productos: {totalProducts}</p>
                <p className={`${styles.FontMedium} `}>Subtotal: $ {totalPrice.toFixed(2)} </p>
                <p className={`${styles.FontMedium} `}>Envío: $ {shippingCost.toFixed(2)} </p>
                <h3>Total: $ {(totalPrice + shippingCost).toFixed(2)} </h3>
                <button onClick={handleprePurchase}>Continuar Compra</button>

                <p className={`${styles.Fontsmall} `}>Protección al comprador</p>
                <p className={`${styles.Fontsmall} `}>Devoluciones dentro de los 30 días</p>
                {/* <BankPromo /> */}
            </div>
        </div>
    );
};
