import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
