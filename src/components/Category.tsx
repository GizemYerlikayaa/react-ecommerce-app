import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import categoryService from "../services/CategoryService";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/appSlice";
import { toast } from "react-toastify";

function Category() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>();
  const getAllCategories = async () => {
    try {
      dispatch(setLoading(true));
      const categories: string[] = await categoryService.getAllCategories();
      setCategories(categories);
    } catch (error) {
      toast.error("Kategori Bulunamadı" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div
      style={{
        marginTop: "60px",
        marginLeft: "15px",
        backgroundColor: "rgba(250, 233, 134, 0.85)",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        position: "sticky",
        top: "80px", // navbar yüksekliği + boşluk
        zIndex: 10,
      }}
    >
      <FormGroup>
        {categories &&
          categories.map((category: string, index: number) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  sx={{
                    color: "#97a7ff",
                    "&.Mui-checked": {
                      color: "#97a7ff",
                    },
                  }}
                />
              }
              label={category}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#000",
                },
              }}
            />
          ))}
      </FormGroup>
    </div>
  );
}

export default Category;
