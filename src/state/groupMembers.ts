import { atom } from "recoil";

export const groupMemberState = atom<string[]>({
  key: "groupMembers",
  default: [],
});
