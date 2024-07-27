import { atom } from "recoil";

export const expensesState = atom<
  { date: string; desc: string; amount: number; payer: string }[]
>({
  key: "expenses",
  default: [],
});
