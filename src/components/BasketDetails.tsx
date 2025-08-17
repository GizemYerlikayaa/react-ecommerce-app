import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setCurrentUser, setDrawer, updateBalance } from "../redux/appSlice";
import type { ProductType, UserType } from "../types/Types";
import Button from "@mui/material/Button";
import LogoIcon from "../images/sitelogo.png";
import {
  calculateBasket,
  removeProductFromBasket,
  setBasket,
} from "../redux/basketSlice";
import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";

function BasketDetails() {
  const { drawer, currentUser } = useSelector((state: RootState) => state.app);
  const { basket, totalAmount } = useSelector(
    (state: RootState) => state.basket
  );
  const dispatch = useDispatch();
  const closeDrawer = () => {
    dispatch(setDrawer(false));
  };
  const removeProduct = (productId: number) => {
    dispatch(removeProductFromBasket(productId));
  };
  const buy = () => {
    const total = Number(totalAmount);
    const balance = Number(currentUser?.balance || 0);

    if (balance < total) {
      toast.warn("Yetersiz Bakiye !");
      return;
    }

    if (currentUser) {
      const remainingBalance = balance - total;
      const payload: UserType = { ...currentUser, balance: remainingBalance };
      dispatch(updateBalance(payload));
      dispatch(setBasket([]));
      localStorage.removeItem("basket");
      toast.success("Ürün Başarılı Bir Şekilde Satın Alınmıştır.");
    }
  };

  useEffect(() => {
    dispatch(calculateBasket());
  }, [basket]);
  return (
    <div>
      <Drawer
        open={drawer}
        anchor="right"
        sx={{ width: "200px" }}
        onClose={closeDrawer}
      >
        <div style={{ backgroundColor: "#fdaff99c", height: "61px" }}>
          <img
            src={LogoIcon}
            style={{
              width: "150px",
              cursor: "pointer",
              marginBottom: "15px",
            }}
            alt="Logo"
          />
        </div>
        {basket &&
          basket.map((product: ProductType) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "5px 30px",
                }}
              >
                <div style={{ marginRight: "15px" }}>
                  <img src={product.image} width={60} height={60} alt="" />
                </div>
                <div style={{ width: "300px" }}>
                  <div style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    {product.title.substring(0, 30)}
                  </div>
                  <div style={{ fontFamily: "Poppins" }}>
                    {product.description.substring(0, 35)}
                  </div>
                </div>
                <div style={{ marginRight: "40px", fontWeight: "bold" }}>
                  {product.count}{" "}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    width: "75px",
                  }}
                >
                  {product.price} $
                </div>
                <div>
                  <Button
                    onClick={() => removeProduct(product.id)}
                    size="small"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#97a7ff",
                      color: "black",
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      "&:hover": {
                        backgroundColor: "#7f8fff", // biraz daha koyu ton
                        color: "white",
                        fontFamily: "Poppins",
                      },
                    }}
                    variant="contained"
                  >
                    Sil
                  </Button>
                </div>
              </div>
            </>
          ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              marginTop: "15px",
              fontWeight: "bold",
              fontFamily: "Poppins",
            }}
          >
            Toplam Tutar: {Number(totalAmount).toFixed(2)} $
          </div>
          <div>
            <Button
              onClick={buy}
              size="small"
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#e8f88afb",
                color: "black",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "20px",
                width: "100px",
                "&:hover": {
                  backgroundColor: "#e8f88afb",
                  color: "black",
                  fontFamily: "Poppins",
                },
              }}
            >
              Satın Al
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default BasketDetails;
