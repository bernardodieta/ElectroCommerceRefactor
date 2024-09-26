import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserDetailsModal.module.css";

const UserDetailsModal = ({ user, onClose }) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productIds = user.purchasedProducts.map(
          (product) => product.product.productId
        );

        const response = await axios.post(
          "/api/products/bulk-products",
          { productIds },
          { withCredentials: true }
        );

        setPurchasedProducts(response.data.payload);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user.purchasedProducts && user.purchasedProducts.length > 0) {
      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, [user.purchasedProducts]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.avatarSection}>
          {user.avatar ? (
            <img src={user.avatar} alt={fullName} className={styles.avatar} />
          ) : (
            <div className={styles.defaultAvatar}>👤</div>
          )}
        </div>
        <div className={styles.userInfo}>
          <h2>
            Nombre completo: {user.firstName} {user.lastName}
          </h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Edad:</strong> {user.age}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Fecha de Registro:</strong>{" "}
            {new Date(user.registrationDate).toLocaleDateString()}
          </p>
        </div>

        <div className={styles.documentsSection}>
          <h3>Documentos cargados</h3>
          {user.documents && user.documents.length > 0 ? (
            <ul>
              {user.documents.map((doc, index) => (
                <li key={index}>
                  <span className={styles.documentIcon}>📄</span>
                  <a
                    href={`/images/${doc.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc.document_name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay documentos cargados.</p>
          )}
        </div>

        <div className={styles.productsSection}>
          <h3>Productos Comprados ({purchasedProducts.length})</h3>
          {loading ? (
            <p>Cargando productos...</p>
          ) : purchasedProducts.length > 0 ? (
            <ul>
              {purchasedProducts.map((product, index) => (
                <li key={index} className={styles.productItem}>
                  {product.img && product.img.length > 0 ? (
                    <img
                      src={`/images/${product.img[0].path}`}
                      alt={product.title}
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.placeholderImage} />
                  )}
                  <div className={styles.productDetails}>
                    <p className={styles.productTitle}>{product.title}</p>
                    <p className={styles.productPrice}>${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos comprados.</p>
          )}
        </div>

        <button onClick={onClose} className={styles.closeBtn}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
