// src/app/page.js
import { roboto } from "@/config/fonts/fonts.js";
import styles from "./index.module.css";
import { ProductCategory } from "./shop/components/products/ProductCategory";
import { Header } from "./shop/components/headers/Header";
import AxiosClient from "@/services/axiosClient";
import { CategoryOffers } from "./shop/components/categoryHeader/CategoryOffers";
import { ProductNewAdded } from "./shop/components/products/ProductNewAdded";

export default async function Home() {
  const laptopResponse = await AxiosClient.getRequest({
    url: "http://localhost:8080/api/products?category=Laptops",
  });
  const laptopProducts = laptopResponse.data.payload.data;

  const motherboardResponse = await AxiosClient.getRequest({
    url: "http://localhost:8080/api/products?category=Motherboards",
  });

  const motherboardProducts = motherboardResponse.data.payload.data;

  const processorResponse = await AxiosClient.getRequest({
    url: "http://localhost:8080/api/products?category=Procesadores",
  });

  const processorProducts = processorResponse.data.payload.data;

  return (
    <>
      <Header />
      <div className={`${styles.mainproductcontainer} ${roboto.className}`}>
        <ProductNewAdded startDate={"2024-09-01"} />
        <ProductCategory category={"Laptops"} products={laptopProducts} />

        <ProductCategory
          category={"Motherboards"}
          products={motherboardProducts}
        />

        <ProductCategory
          category={"Procesadores"}
          products={processorProducts}
        />

        <CategoryOffers />
      </div>
    </>
  );
}
