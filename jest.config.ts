import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // TypeScript 파일로 변경
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Babel을 사용하여 변환
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|mp3|wav|webm|m4a|aac|oga)$":
      "<rootDir>/fileMock.ts",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: ["/node_modules/(?!(react-bootstrap-tagsinput))"],
};

export default config;
