import React from "react";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoIcon from "../images/sitelogo.png";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { filterProduct, setCurrentUser, setProducts } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import type { ProductType } from "../types/Types";
import { FaShoppingBasket } from "react-icons/fa";
import Badge from "@mui/material/Badge";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser(null));
    navigate("/login");
    toast.success("Başarıyla Çıkış Yapıldı");
  };

  const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value) {
        dispatch(filterProduct(e.target.value));
      } else {
        const products: ProductType[] = await productService.getAllProducts();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("Filtreleme Yaparken Bir Hata Oluştu." + error);
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#ffc9ff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Sol: Logo */}
        <IconButton
          onClick={() => navigate("/")}
          size="large"
          edge="start"
          sx={{ mr: 2 }}
        >
          <img
            src={LogoIcon}
            style={{ width: "150px", cursor: "pointer" }}
            alt="Logo"
          />
        </IconButton>

        {/* Orta: Arama kutusu */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            marginLeft: "800px",
          }}
        >
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilter(e)
            }
            sx={{
              width: "300px",
              "& .MuiInputBase-input": {
                fontFamily: "Poppins, sans-serif",
              },
              "& .MuiInputBase-input::placeholder": {
                fontFamily: "Poppins, sans-serif",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
            id="searchInput"
            placeholder="Bir Şey Ara..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "black" }} />
                </InputAdornment>
              ),
              style: {
                color: "black",
                border: "2px solid black",
                width: "450px",
              },
            }}
            variant="outlined"
          />
        </Box>
        <Badge
          color="default"
          badgeContent={4}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#a27bff", // istediğin mor tonu
              color: "black",
              fontWeight: "600",
              right: 15,
              top: 5,
            },
          }}
        >
          <FaShoppingBasket
            style={{
              fontSize: "30px",
              color: "black",
              margin: "0px 25px",
              cursor: "pointer",
            }}
          />
        </Badge>

        {/* Sağ: Çıkış butonu */}
        <Button
          onClick={logout}
          color="inherit"
          sx={{
            fontFamily: "Poppins",
            color: "black",
            fontSize: "17px",
            textTransform: "none",
          }}
        >
          Çıkış Yap
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
