'use client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { IoStarOutline, IoStarSharp } from 'react-icons/io5';
import styles from './css/productById.module.css'
import { roboto } from '@/config/fonts/fonts';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { ProductCategory } from './ProductCategory';


const ProductPage = () => {
  const { id } = useParams();
  console.log('id', id);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 5;
  const [categoryProducts, setcategoryProducts] = useState(null);
  const addToCart = useCartStore(state => state.addToCart);
  const apiUrlBackend = process.env.NEXT_PUBLIC_API_URL;
  const thumbnailContainerRef = useRef(null);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`/api/users/data/${userId}`);
      return response.data.payload.firstName;
    } catch (error) {
      console.error('Error fetching user name:', error);
      return 'Unknown User';
    }
  };

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const fetchedProduct = response.data.payload;

        const numValorations = fetchedProduct.valorations.length;
        let totalStars = 0;
        for (const valoration of fetchedProduct.valorations) {
          totalStars += valoration.star;
          valoration.firstName = await fetchUserName(valoration.userId);
        }
        const avgStars = numValorations > 0 ? totalStars / numValorations : 0;

        const now = new Date();
        const activeOffer = fetchedProduct.offers?.find(offer => {
          const startDate = new Date(offer.startDate);
          const endDate = new Date(offer.endDate);
          return startDate <= now && endDate >= now;
        });

        const originalPrice = parseFloat(fetchedProduct.price) || 0;
        const discount = activeOffer?.discount || 0;
        const newPrice = (originalPrice * (1 - discount / 100)).toFixed(2);

        fetchedProduct.numValorations = numValorations;
        fetchedProduct.avgStars = avgStars;
        fetchedProduct.newPrice = newPrice;
        fetchedProduct.activeOffer = activeOffer;

        setProduct(fetchedProduct);

        if (fetchedProduct.img.length > 0) {
          setSelectedImage(fetchedProduct.img[0].path);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();



  }, [id]);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        if (product?.category) {
          console.log('product category:', product.category);
          const response = await axios.get(`/api/products?category=${product.category}`);
          console.log('response', response);
          setcategoryProducts(response.data.payload.data);
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };

    fetchCategoryProducts();
  }, [product?.category]);



  console.log('categoryProducts', categoryProducts);
  const renderStars = () => {
    const stars = [];
    const avgStars = product.avgStars.toFixed(2);
    const fullStars = Math.floor(avgStars);
    const hasHalfStar = avgStars % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStarSharp key={i} size={25} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarSharp key="half" size={25} className="text-yellow-500" />);
    }

    while (stars.length < 5) {
      stars.push(<IoStarOutline key={stars.length} size={25} className="text-gray-300" />);
    }

    return stars;
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      scrollToCurrentPage();
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(product.img.length / imagesPerPage);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      scrollToCurrentPage();
    }
  };

  const scrollToCurrentPage = () => {
    if (thumbnailContainerRef.current) {
      thumbnailContainerRef.current.scrollTop = currentPage * thumbnailContainerRef.current.clientHeight;
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  const startIndex = currentPage * imagesPerPage;
  const endIndex = Math.min(startIndex + imagesPerPage, product.img.length);
  const imagesToShow = product.img.slice(startIndex, endIndex);

  return (
    <div className={`${styles.containerProductId} ${roboto.className}`}>
      <div className={styles.productIdBoxGeneralIMG}>
        <div className={styles.productIdImages}>
          <div className={styles.thumbnailNav}>
            <button
              className={styles.navButton}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <FaArrowUp />
            </button>
            <div
              className={styles.thumbnailImgContainer}
              ref={thumbnailContainerRef}
            >
              <div className={styles.thumbnailImg}>
                {imagesToShow.map((image, index) => (
                  <div key={index} className="" onClick={() => setSelectedImage(image.path)}>
                    <Image
                      alt={product.title}
                      src={`/images/${image.path.replace(/\\/g, '/')}`}
                      width={100}
                      height={100}
                      className={styles.imgThumbnail}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.navButton}
              onClick={handleNextPage}
              disabled={endIndex >= product.img.length}
            >
              <FaArrowDown />
            </button>
          </div>
          {selectedImage && (
            <div className={styles.imgBigContainer}>
              <img src={`/images/${selectedImage.replace(/\\/g, '/')}`} alt={product.title} className={styles.imgBigShow} />
            </div>
          )}
        </div>
        <div className={styles.barravertical}></div>
        <div className={`${styles.productPriceDetail} ${roboto.className}`}>
          <h1 className="">{product.title}</h1>
          <div className={styles.starsBox}>
            {renderStars()} <p>({product.numValorations})</p>
          </div>
          <h2 className={styles.productNormalPrice}>
            {product.offers.length > 0 && <p>Producto en Oferta!!!</p>}
            ${product.newPrice}
            {product.activeOffer && (
              <span className={styles.productNormalPrice}>${product.price}</span>
            )}
          </h2>
          <h2 className="">Stock disponible: {product.stock}</h2>
          <p>IVA incluido.</p>
          <h5 className="">6 Meses sin intereses</h5>
          <button className={styles.mediosdepago}>ver los medios de pago</button>
          <div className={styles.detailInfoprice}>
            <h5 className="">Envio Gratis</h5>
            <p>Protección al comprador</p>
            <p>Devoluciones dentro de los 30 días</p>
          </div>

          <div className={`${styles.btncontainer} ${roboto.className}`}>
            <button className={styles.btnBuyNow}>
              Comprar Ahora
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className={styles.btnAddtoCart}
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
      <div className={styles.productCaracteristicas}>
        <div className={styles.categoryTitle}>
          <div className={styles.barraTitle}></div>
          <h2>Este producto tiene las siguientes caracteristicas:</h2>
        </div>

        <ul>
          <div className={styles.productCaracteristicasDetail}>
            <li>
              <p>Es Gammer:</p>
              <p>{product.gamer || 'No aclarado'}</p>
            </li>
            <li>
              <p>Requiere Batería:</p>
              <p>{product.battery || 'No aclarado'}</p></li>
            <li>
              <p>Tiene Garantía: </p>
              <p>{product.garantia || 'No aclarado'}</p>
            </li>
            <li>
              <p>Cantidad de Botones: </p>
              <p>{product.botones || 'No aclarado'}</p>
            </li>
            <li>
              <p>Tiene Iluminación:</p>
              <p>  {product.iluminacion || 'No aclarado'}</p>
            </li>
          </div>
          <div className={styles.productCaracteristicasDetail}>
            <li>
              <p>Tiene Bluetooth:</p>
              <p>{product.bluetooth || 'No aclarado'}</p>
            </li>
            <li>
              <p>Es Recargable: </p>
              <p> {product.recargable || 'No aclarado'}</p>
            </li>
            <li>
              <p>Tipo de Conector: </p>
              <p>{product.conector || 'No aclarado'}</p>
            </li>
            <li>
              <p>Sistema operativo:</p>
              <p>{product.sistema || 'No aclarado'}</p>
            </li>
            <li>
              <p>Resolucion:</p>
              <p>{product.resolution || 'No aclarado'}</p>
            </li>
          </div>
        </ul>

      </div>
      <div className={styles.productDescription}>
        <div className={styles.categoryTitle}>
          <div className={styles.barraTitle}></div>
          <h2>Descripción del producto:</h2>
        </div>
        <div className={styles.productDescContainer}>
          <p>{product.description}</p>
        </div>

      </div>
      <div className={styles.productosSimilares}>
        <ProductCategory category={product.category} products={categoryProducts} />
      </div>


      <div>
        <div className={styles.categoryTitle}>
          <div className={styles.barraTitle}></div>
          <h2>Opiniones del producto:</h2>
        </div>
        {product.valorations.map(valoration => (
          <div key={valoration._id}>
            <p>Usuario: {valoration.firstName}</p>
            <p>Mensaje: {valoration.message}</p>
            <p>Estrellas: {valoration.star}</p>
            <p>Fecha: {new Date(valoration.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div >
  );
};

ProductPage.displayName = 'ProductPage';
export default ProductPage;
