import { atom } from "recoil";

export const groupNameState = atom<string>({
  key: "groupName",
  default: undefined,
});
