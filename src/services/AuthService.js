import axios from "axios";
import $api, { API_URL } from "../http";

export default class AuthService {
  static async login(email, password) {
    return axios.post(
      `${API_URL}auth/token/`,
      {
        username: email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  static async registration({
    email,
    password,
    firstname,
    lastname,
    phone,
    patronymic,
    role,
    citizenship,
    username
  }) {
    return axios.post(`${API_URL}auth/registration/`, {
      lastname,
      firstname,
      username,
      patronymic,
      email,
      phone,
      password,
      role,
      citizenship
    });
  }

  static async getToken({ email, password }) {
    return $api.post("/auth/token/", {
      username: email,
      password,
    });
  }

  static async logout() {
    return $api.get("/auth/logout/");
  }
}
