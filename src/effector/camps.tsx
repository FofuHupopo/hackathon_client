import axios from "axios";
import { createEffect } from "effector";
import { API_URL } from "../http";

const getCampsFx = createEffect<any, any>(
  async ({ time, type, start, end }) => {
    try {
      const response = axios.get(`${API_URL}/`, {
        params: { time, type, start, end },
      });
    } catch (e) {}
  }
);
