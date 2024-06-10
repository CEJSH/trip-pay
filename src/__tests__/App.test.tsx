import App from "../App.tsx";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Amplify } from "aws-amplify";
import awsconfig from "../../amplify_outputs.json";
Amplify.configure(awsconfig);
test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
