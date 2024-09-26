import ClientProductPage from './ClientProductPage';

const ProductPage = ({ params }) => {
  const { id } = params;  // Obtenemos el id desde los params del Server Component
  console.log('params', id);

  return <ClientProductPage id={id} />;
};

export default ProductPage;
