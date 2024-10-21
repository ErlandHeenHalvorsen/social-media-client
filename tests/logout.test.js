import { logout } from "../src/js/api/auth/logout";
import { remove } from "../src/js/storage";

jest.mock("../src/js/storage/remove.js", () => ({
	remove: jest.fn(),
}));

describe("Logout", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("should remove the token and profile", async () => {
		await logout();

		expect(remove).toHaveBeenCalledWith("token");
		expect(remove).toHaveBeenCalledWith("profile");
	});
});
