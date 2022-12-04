import { createEffect, createStore } from "effector";
import $api from "../../http";

export const getRequests = createEffect(async () => {
  try {
    const response = await $api.get("request/");

    return response.data;
  } catch {}
});

export const $requests = createStore<any>([]).on(
  getRequests.doneData,
  (_, requests) => requests
);
