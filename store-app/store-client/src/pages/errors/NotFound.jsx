import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Not Found Error
      </Typography>
      <Alert severity="error">Aradığınız kaynak bulunamadı.</Alert>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Anasayfa
      </Button>
    </Paper>
  );
};

export default NotFound;
