import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  LocalShipping,
  Security,
  Support,
  TrendingUp,
  Star,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/catalogSlice";
import { selectAllProducts } from "../redux/slices/catalogSlice";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";
import Loading from "../components/Loading";

const HomePage = () => {
  const dispatch = useDispatch();
  const { status, isLoaded } = useSelector((state) => state.catalog);
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isLoaded]);

  // Öne çıkan ürünler (ilk 6 ürün)
  const featuredProducts = products.slice(0, 4);

  // Kategoriler
  const categories = [
    {
      name: "Giyim & Moda",
      icon: "👕",
      color: "#1976d2",
      description: "Mont, ceket ve dış giyim",
      count: products.length,
      path: "/products",
    },
    {
      name: "Elektronik",
      icon: "📱",
      color: "#388e3c",
      description: "Telefon, tablet ve aksesuarlar",
      count: 0,
      path: "/products",
    },
    {
      name: "Ev & Yaşam",
      icon: "🏠",
      color: "#f57c00",
      description: "Ev dekorasyon ve yaşam ürünleri",
      count: 0,
      path: "/products",
    },
    {
      name: "Spor & Outdoor",
      icon: "⚽",
      color: "#d32f2f",
      description: "Spor ekipmanları ve outdoor",
      count: 0,
      path: "/products",
    },
  ];

  // Özellikler
  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: "Ücretsiz Kargo",
      description: "150 TL üzeri alışverişlerde ücretsiz kargo",
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Güvenli Ödeme",
      description: "256-bit SSL şifreleme ile güvenli ödeme",
    },
    {
      icon: <Support sx={{ fontSize: 40 }} />,
      title: "7/24 Destek",
      description: "Müşteri hizmetleri her zaman yanınızda",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "En İyi Fiyat",
      description: "Kaliteli ürünler, uygun fiyatlarla",
    },
  ];

  if (status === "pendingFetchProducts") {
    return <Loading message="Ürünler yükleniyor..." />;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "white",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          height: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: "600px" }}>
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Alışverişin En İyi Adresi
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Binlerce ürün, uygun fiyatlar ve hızlı teslimat ile alışveriş
              deneyiminizi bir üst seviyeye taşıyın.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/products"
                startIcon={<ShoppingCart />}
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
              >
                Alışverişe Başla
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/products"
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Ürünleri Keşfet
              </Button>
            </Stack>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Kategoriler */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Kategoriler
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.name}>
                <Card
                  sx={{
                    height: "100%",
                    width: "250px",
                    minHeight: 220,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                      "& .category-icon": {
                        transform: "scale(1.1)",
                      },
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      backgroundColor: category.color,
                    },
                  }}
                  component={Link}
                  to={category.path}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      py: 4,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: "3.5rem",
                          mb: 2,
                          transition: "transform 0.3s ease",
                        }}
                        className="category-icon"
                      >
                        {category.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {category.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          lineHeight: 1.4,
                          minHeight: "2.8em",
                        }}
                      >
                        {category.description}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Chip
                        label={`${category.count} ürün`}
                        size="small"
                        sx={{
                          backgroundColor: category.color,
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                          height: "24px",
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Özellikler */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Neden Bizi Seçmelisiniz?
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    width: "250px",
                    minHeight: 200,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      py: 3,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ color: "primary.main", mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Öne Çıkan Ürünler */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h2">
              Öne Çıkan Ürünler
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to="/products"
              endIcon={<TrendingUp />}
            >
              Tümünü Gör
            </Button>
          </Box>
          <Box>
            <Grid container spacing={3}>
              {featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Box sx={{ height: "100%", width: "250px" }}>
                    <ProductCard product={product} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* İstatistikler */}
        <Box sx={{ mb: 6 }}>
          <Paper
            sx={{
              p: 4,
              backgroundColor: "primary.main",
              color: "white",
            }}
          >
            <Grid
              container
              spacing={4}
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2rem", sm: "3rem" },
                  }}
                >
                  {products.length}+
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "0.9rem", sm: "1.25rem" } }}
                >
                  Ürün
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2rem", sm: "3rem" },
                  }}
                >
                  1000+
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "0.9rem", sm: "1.25rem" } }}
                >
                  Mutlu Müşteri
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2rem", sm: "3rem" },
                  }}
                >
                  24/7
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "0.9rem", sm: "1.25rem" } }}
                >
                  Destek
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "2rem", sm: "3rem" },
                  }}
                >
                  <Star sx={{ fontSize: "inherit", verticalAlign: "middle" }} />
                  4.8
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "0.9rem", sm: "1.25rem" } }}
                >
                  Müşteri Puanı
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
