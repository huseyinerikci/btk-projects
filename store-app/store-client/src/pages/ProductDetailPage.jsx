import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/slices/cartSlice";
import {
  fetchProductById,
  selectProductById,
} from "../redux/slices/catalogSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { cart, status } = useSelector((state) => state.cart);
  const product = useSelector((state) => selectProductById(state, id));
  const { status: loading } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  const cartItem = cart?.cartItems.find(
    (i) => i.product.productId == product?.id
  );

  function handleAddItem(productId) {
    dispatch(addItemToCart({ productId: productId }));
  }

  useEffect(() => {
    if (!product && id) dispatch(fetchProductById(id));
  }, [id]);

  if (loading === "pendingFetchProductById")
    return <Loading message="Yükleniyor..." />;

  if (!product) return <h1>Ürün bulunamadı.</h1>;

  return (
    <ProductItem
      product={product}
      handleAddItem={handleAddItem}
      cartItem={cartItem}
      isAdding={status === "pendingAddItem" + product.id}
    />
  );
};

export default ProductDetailPage;
