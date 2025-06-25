import { useEffect } from "react";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../redux/slices/catalogSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const loadedProducts = useSelector(selectAllProducts);
  const { status, isLoaded } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (!isLoaded) dispatch(fetchProducts());
  }, [isLoaded]);

  if (status === "pendingFetchProducts")
    return <Loading message="Yükleniyor..." />;

  return <ProductList products={loadedProducts} />;
};

export default ProductsPage;
