import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { ProductType } from "../types/Types";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: ProductType;
}

function ProductCard(props: ProductCardProps) {
  const { id, title, price, description, category, image, rating } =
    props.product;
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        backgroundColor: "#fff",
        cursor: "pointer",
        boxShadow: "1px 5px 5px lightgrey",
        width: "330px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "60px 10px",
        overflow: "hidden", // taşmaları engelle
        transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#f7bdeaa6", // hover arka plan rengi
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          transform: "translateY(-5px)", // hafif yukarı kalkma efekti
        },
        "& img": {
          transition: "transform 0.3s ease-in-out",
        },
        "&:hover img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <img src={image} width={230} height={230} />
      <CardContent sx={{ height: "250px" }}>
        <Typography
          sx={{ fontFamily: "Poppins" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {title.substring(0, 40)}...
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontFamily: "Poppins" }}
        >
          {description.substring(0, 200)}...
        </Typography>
      </CardContent>
      <div>
        <h2 style={{ fontFamily: "Poppins" }}>{price} $</h2>
      </div>
      <CardActions>
        <Button
          onClick={() => navigate("/product-detail/" + id)}
          size="large"
          variant="contained"
          sx={{
            fontFamily: "Poppins",
            marginBottom: "15px",
            color: "black",
            backgroundColor: "#97a7ff",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#97a7ff",
              color: "#fff",
              borderColor: "#96a5ff",
            },
          }}
        >
          Detay
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
