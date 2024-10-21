import { apiPath } from "../src/js/api/constants.js";
import { login } from "../src/js/api/auth/login.js";
import { save } from "../src/js/storage/index.js";

jest.mock("../src/js/storage/save.js", () => ({
	save: jest.fn(),
}));

global.fetch = jest.fn();

describe("Login", () => {
	afterEach(() => {
		jest.clearAllMocks(); // Reset mocks after each test
	});

	it("should store a token and profile when given valid credentials", async () => {
		const mockProfile = {
			accessToken: "mockToken",
			name: "mockName",
			email: "mockEmail",
		};

		// Mocking the fetch call to return a successful response
		fetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockProfile),
		});

		// Call the login function with mock credentials
		const result = await login("mockEmail@mock.com", "mockPassword");

		// Ensure fetch was called with the correct API path
		expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
			method: "post",
			body: JSON.stringify({
				email: "mockEmail@mock.com",
				password: "mockPassword",
			}),
			headers: expect.any(Object), // Ensure correct headers
		});

		// Verify that the token was saved
		expect(save).toHaveBeenCalledWith("token", "mockToken");

		// Verify that the profile was saved without the token
		const expectedProfile = { name: "mockName", email: "mockEmail" };
		expect(save).toHaveBeenCalledWith("profile", expectedProfile);

		// Ensure the result returned from login matches the expected profile
		expect(result).toEqual(expectedProfile);
	});
});
