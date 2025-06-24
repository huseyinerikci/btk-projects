import { Grid as Grid2 } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <Grid2 container spacing={2}>
      {products.map((product) => (
        <Grid2 key={product.id} size={{ xs: 6, md: 4, lg: 3 }}>
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ProductList;
