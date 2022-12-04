import axios from "axios";
import {createStore} from "effector";
import {createEffect} from "effector";
import {API_URL} from "../http";

export const getCampsFx = createEffect(async ({time = '', type = '', start = '', end = ''}: any) => {
	const response = await axios.get(`${API_URL}camp/filter/`, {
		params: {
			time,
			start,
			end,
			type
		}
	})
	
	return response.data
})

export const $camps = createStore([]).on(getCampsFx.doneData, (_, camps) => camps)

