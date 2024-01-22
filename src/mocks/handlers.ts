import { http, HttpResponse } from "msw";
import { mockedBatteryRes } from "./mockData";

export const handlers = [
	http.post("http://localhost:8000/api/v1/battery", () => {
		return HttpResponse.json(mockedBatteryRes, {
			status: 200,
		});
	}),
];
