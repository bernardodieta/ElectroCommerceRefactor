import ClientProductPage from './ClientProductPage';

const ProductPage = ({ params }) => {
  const { id } = params; 
  console.log('params', id);

  return <ClientProductPage id={id} />;
};

export default ProductPage;
