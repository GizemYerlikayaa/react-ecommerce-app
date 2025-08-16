import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";
import productService from "../services/ProductService";
import type { ProductType } from "../types/Types";
import Button from "@mui/material/Button";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(0);

  const [product, setProduct] = useState<ProductType | null>();

  const getProductById = async (productId: number) => {
    try {
      dispatch(setLoading(true));
      const product: ProductType = await productService.getProductById(
        productId
      );
      setProduct(product);
    } catch (error) {
      toast.error("Ürün Getirilirken Hata Oluştu" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getProductById(Number(productId));
  }, []);
  return (
    <Container maxWidth="lg">
      {product && (
        <>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <img
                style={{ marginTop: "100px" }}
                src={product.image}
                width={250}
                height={400}
              />
            </div>
            <div style={{ marginLeft: "70px", marginTop: "120px" }}>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {product.title}
              </div>
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  marginTop: "25px",
                  height: "100px",
                }}
              >
                {product.description}
              </div>

              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: "25px",
                  fontWeight: "600",
                }}
              >
                {product.price} $
              </div>
              <div style={{ marginTop: "25px" }}>
                <span
                  onClick={() => setCount(count + 1)}
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginRight: "10px",
                    backgroundColor: "#f7bdeaa6",
                    borderRadius: "20px",
                  }}
                >
                  +
                </span>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {count}
                </span>
                <span
                  onClick={() => setCount(count - 1)}
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  -
                </span>
              </div>
              <div style={{ marginTop: "25px" }}>
                <Button
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "16px",
                    textTransform: "none",
                    backgroundColor: "#96a5ff",
                    color: "black",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                    "&:hover": {
                      backgroundColor: "#7d8fff", // hover için biraz koyu tonu
                    },
                  }}
                >
                  Sepete Ekle
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default ProductDetail;
