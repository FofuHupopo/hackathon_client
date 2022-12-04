import axios from "axios";
import {createEffect, createStore} from "effector";
import $api from "../http";

export const getKidsFx = createEffect(async () => {
	const {data} = await $api.get('account/representative/child/')
	
	return data
})

export const $kids = createStore([]).on(getKidsFx.doneData, (_, kids) => kids)