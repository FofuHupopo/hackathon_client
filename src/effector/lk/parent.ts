import axios from "axios";
import { createEffect, createStore } from "effector";
import $api from "../../http";

export const sendParentInfoFx = createEffect(async (data: any) => {
  const response = await $api.put("account/representative/passport/", {
    passport: data,
  });

  return response.data;
});

export const getParentInfoFx = createEffect(async () => {
  const response = await $api.get("account/representative/");

  return response.data;
});

export const sendEmail = createEffect(async () => {
  const response = await $api.get("auth/code/send/");
});

export const sendCode = createEffect(async (code: string) => {
  try {
    const response = await $api.post("auth/code/confirm/", { code });

    return response.data;
  } catch {}
});

export const getChildsFx = createEffect(async () => {
  try {
    const response = await $api.get("account/representative/child/");

    return response.data;
  } catch {}
});

export const deleteChild = createEffect(async (id: any) => {
  try {
    const response = await $api.delete(`account/representative/child/${id}`);

    return response.data;
  } catch {}
});

export const $childs = createStore<any>([])
  .on(getChildsFx.doneData, (_, childs) => childs)
  .on(deleteChild.doneData, (_, childs) => childs);

export const $parent = createStore<any>({})
  .on(sendParentInfoFx.doneData, (_, parent) => parent)
  .on(getParentInfoFx.doneData, (_, parent) => parent);
