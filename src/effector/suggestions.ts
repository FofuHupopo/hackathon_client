import axios from "axios";
import { createEffect, createStore } from "effector";
import { API_URL } from "../http";

export const getCountrySuggestionsFx = createEffect<string, string[]>(
  async (string: string) => {
    try {
      const response = await axios.get(`${API_URL}address/countries/`, {
        params: {
           search: string
        }
      });

      return response.data;
    } catch (e) {}
  }
);

export const $countrySuggestions = createStore<string[]>([]).on(
  getCountrySuggestionsFx.doneData,
  (_, suggestions) => suggestions
);
