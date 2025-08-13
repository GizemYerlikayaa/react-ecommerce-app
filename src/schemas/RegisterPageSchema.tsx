import * as yup from "yup";

export const RegisterPageSchema = yup.object().shape({
  username: yup.string().required("Kullanıcı Adı Boş Geçilmez!"),
  password: yup.string().required("Şifre Boş Geçilmez!"),
});
