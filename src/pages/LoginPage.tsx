import "../css/LoginPage.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import siteLogo from "../images/sitelogo.png";
import { height, spacing } from "@mui/system";
import { useFormik } from "formik";
import { RegisterPageSchema } from "../schemas/RegisterPageSchema";
import loginPageService from "../services/LoginPageService";

function LoginPage() {
  const submit = (values: any, action: any) => {
    try {
      loginPageService.login();
    } catch (error) {}
  };

  const clear = () => {
    resetForm();
  };
  const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submit,
    validationSchema: RegisterPageSchema,
  });
  return (
    <div className="login">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div
            className="form-div"
            style={{ backgroundColor: "rgba(255, 166, 139, 0.61)" }}
          >
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
                  backgroundColor: "#9f7eecff",
                  "&:hover": { backgroundColor: "#9f7eece7" },
                }}
              >
                Giriş Yap
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
                  backgroundColor: "#98f1eaff",
                  "&:hover": { backgroundColor: "#98f1ead5" },
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

export default LoginPage;
