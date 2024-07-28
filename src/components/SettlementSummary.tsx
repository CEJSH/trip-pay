import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import styled from "styled-components";
import { StyledTitle } from "./AddExpenseForm";
import { groupMemberState } from "../state/groupMembers";
import { Button } from "react-bootstrap";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { Download } from "react-bootstrap-icons";

export const calculateMinimumTransaction = (
  expenses: { payer: string; amount: number }[],
  members: string[],
  amountPerPerson: number
) => {
  const minTransactions: {
    receiver: string;
    sender: string;
    amount: number;
  }[] = [];
  if (amountPerPerson === 0) {
    return minTransactions;
  }
  // 1. 사람별로 냈어야 할 금액
  const membersToPay: { [index: string]: number } = {};
  members.forEach((member: string) => {
    membersToPay[member] = amountPerPerson;
  });

  // 2. 사람별로 냈어야 할 금액
  expenses.forEach(({ payer, amount }) => {
    membersToPay[payer] -= amount;
  });

  //3. amount별 오름차순으로 sorting이 된 리스트(배열)
  const sortedMembersToPay = Object.keys(membersToPay)
    .map((member) => ({
      member: member,
      amount: membersToPay[member],
    }))
    .sort((a, b) => a.amount - b.amount);

  //4. left right에 대한 선언 필요
  let left = 0;
  let right = sortedMembersToPay.length - 1;

  while (left < right) {
    while (left < right && sortedMembersToPay[left].amount === 0) {
      left++;
    }
    while (left < right && sortedMembersToPay[right].amount === 0) {
      right--;
    }
    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];

    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend > amountToReceive) {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toSend.amount = 0;
      toReceive.amount += amountToSend;
      right--;
    }
  }
  return minTransactions;
};

export default function SettlementSummary() {
  const wrapperElement = useRef(null);
  const expenses = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMemberState);
  const groupMembersCount = members.length;
  const totalExpenseAmount = expenses.reduce(
    (prevAmount, curExpense) => prevAmount + curExpense.amount,
    0
  );
  const splitAmount = totalExpenseAmount / groupMembersCount;
  const minimumTransaction = calculateMinimumTransaction(
    expenses,
    members,
    splitAmount
  );
  const exportToImage = () => {
    if (wrapperElement.current === null) {
      return;
    }
    toPng(wrapperElement.current, {
      filter: (node) => {
        return node.tagName !== "BUTTON";
      },
    })
      .then((dataURL) => {
        const link = document.createElement("a");
        link.download = "settlement-summary.png";
        link.href = dataURL;

        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledWrapper ref={wrapperElement}>
      <StyledTitle>2. 정산은 이렇게!</StyledTitle>
      {totalExpenseAmount > 0 && groupMembersCount > 0 && (
        <>
          <StyledSummary>
            <span>
              {groupMembersCount} 명이서 총{" "}
              {totalExpenseAmount.toLocaleString()}원 지출
            </span>
            <br />
            <span>한 사람 당 {Math.ceil(splitAmount).toLocaleString()}원</span>
          </StyledSummary>
          <StyledUl>
            {minimumTransaction.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${index}`}>
                <span>
                  {sender}(이)가 {receiver}에게{" "}
                  {Math.ceil(amount).toLocaleString()}원 보내기
                </span>
              </li>
            ))}
          </StyledUl>
          <StyledButton data-testid="btn-download" onClick={exportToImage}>
            <Download />
          </StyledButton>
        </>
      )}
    </StyledWrapper>
  );
}

const StyledButton = styled(Button)<any>`
  padding-top: 0px;
  background: none;
  border: none;
  font-size: 25px;
  position: absolute;
  top: 2vh;
  right: 2vh;

  &:hover,
  &:active {
    background-color: #fffbfb !important;
    color: #683ba1;
  }
`;

const StyledSummary = styled.div`
  margin-top: 16px;
`;
const StyledWrapper = styled.div<any>`
  position: relative;
  padding: 40px;
  background-color: #683ba1;
  color: #fffbfb;
  border-radius: 15px;
  box-shadow: 3px 0px 4px 0px #00000040;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0.1px;
`;

const StyledUl = styled.ul`
  margin-top: 24px;
  font-weight: 500;
  line-height: 36px;
  list-style-type: disclosure-closed;
  li::marker {
    animation: blinker 2s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
