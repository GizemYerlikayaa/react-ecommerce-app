import React from "react";
import "../css/RegisterPace.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import siteLogo from "../images/sitelogo.png";
import { height, spacing } from "@mui/system";
import { useFormik } from "formik";
import { RegisterPageSchema } from "../schemas/RegisterPageSchema";
import registerPageService from "../services/RegisterPageService";
import type { UserType } from "../types/Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const submit = async (values: any, actions: any) => {
    try {
      const payload: UserType = {
        id: String(Math.floor(Math.random() * 999999)),
        username: values.username,
        password: values.password,
        balance: 1000,
      };
      const response = await registerPageService.register(payload);
      if (response) {
        clear();
        toast.success("Kullanıcı Başarıyla Kayıt Oldu.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Kullanıcı Kaydedilirken Hata Oluştu");
    }
  };
  const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submit,
    validationSchema: RegisterPageSchema,
  });

  const clear = () => {
    resetForm();
  };

  return (
    <div className="register">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <div>
              <img
                src={siteLogo}
                alt="Site Logo"
                style={{ height: "50px", marginBottom: "20px" }}
              />
            </div>
            <TextField
              sx={{
                width: "300px",
                marginBottom: "15px",

                // Input yazısı ve placeholder
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins, sans-serif",
                },
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "Poppins, sans-serif",
                },

                // Helper text
                "& .MuiFormHelperText-root": {
                  fontFamily: "Poppins, sans-serif",
                },
              }}
              id="username"
              placeholder="Kullanıcı Adı"
              value={values.username}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoPersonCircleSharp style={{ fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              helperText={
                errors.username && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    {errors.username}
                  </span>
                )
              }
            />

            <TextField
              sx={{
                width: "300px",
                marginBottom: "15px",

                // Input yazısı ve placeholder
                "& .MuiInputBase-input": {
                  fontFamily: "Poppins, sans-serif",
                },
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "Poppins, sans-serif",
                },

                // Helper text
                "& .MuiFormHelperText-root": {
                  fontFamily: "Poppins, sans-serif",
                },
              }}
              id="password"
              type="password"
              placeholder="Şifre"
              value={values.password}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              helperText={
                errors.password && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    {errors.password}
                  </span>
                )
              }
            />
            <div>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  margin: "10px",
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#f58ed6d0",
                  "&:hover": { backgroundColor: "#f383d1a1" },
                }}
              >
                Kayıt Ol
              </Button>
              <Button
                onClick={clear}
                variant="contained"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  margin: "10px",
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#c78ef5e3",
                  "&:hover": { backgroundColor: "#c78ef5be" },
                }}
              >
                Temizle
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
