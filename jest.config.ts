import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

const config: Config = {
	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",

	// The test environment that will be used for testing
	testEnvironment: "jsdom",
	testEnvironmentOptions: {
		customExportOptions: [""],
	},
	rootDir: __dirname,
};

export default createJestConfig(config);
