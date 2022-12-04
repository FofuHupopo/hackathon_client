import axios from "axios";
import { createStore } from "effector";
import { createEffect } from "effector";
import $api, { API_URL } from "../http";

export const getCampsFx = createEffect(
  async ({ time = "", type = "", start = "", end = "" }: any) => {
    const response = await axios.get(`${API_URL}camp/filter/`, {
      params: {
        time,
        start,
        end,
        type,
      },
    });

    return response.data;
  }
);

export const createRequestFx = createEffect(async ({ id, event }: any) => {
  try {
    console.log(id);
    console.log(event);
    const response = await $api.get("request/create/", {
      params: {
        child_id: id,
        camp_event_id: event,
      },
    });

    alert("Заявка создана.");
  } catch {}
});

export const $camps = createStore([]).on(
  getCampsFx.doneData,
  (_, camps) => camps
);
