import { login } from "../src/js/api/auth/login.js";
import { save } from "../src/js/storage/index.js";

jest.mock("../src/js/storage/index.js", () => ({
	save: jest.fn(),
}));

global.fetch = jest.fn(() =>
	promise.resolve({
		ok: true,
		json: () =>
			promise.resolve({
				accessToken: "mockToken",
				name: "mockName",
				email: "mockEmail",
			}),
	}),
);

describe("login function", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("should store a token and profile on login", async () => {
		const email = "mockEmail";
		const password = "mockPassword";
		const profile = await login(email, password);

		expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
			method: "post",
			body: JSON.stringify({ email, password }),
			headers: expect.any(Object),
		});
		expect(save).toHaveBeenCalledWith("token", profile.accessToken);
		expect(save).toHaveBeenCalledWith("profile", {
			name: profile.name,
			email: profile.email,
		});
		expect(profile).toEqual({
			name: profile.name,
			email: profile.email,
		});
	});
});
