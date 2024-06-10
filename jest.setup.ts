import "@testing-library/jest-dom";
import React from "react";
import Amplify from "aws-amplify";
import * as awsconfig from "./amplify_outputs.json";
Amplify.Amplify.configure(awsconfig);
global.React = React;

jest.mock("aws-amplify", () => {
  const actualAmplify = jest.requireActual("aws-amplify");
  return {
    ...actualAmplify,
    Auth: {
      ...actualAmplify.Auth,
      signIn: jest.fn().mockResolvedValue({}),
      signOut: jest.fn().mockResolvedValue({}),
    },
    API: {
      ...actualAmplify.API,
      graphql: jest.fn().mockResolvedValue({}),
    },
  };
});
