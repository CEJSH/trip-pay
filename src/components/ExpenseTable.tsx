import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { Table } from "react-bootstrap";
import { OverlayWrapper } from "./shared/OverlayWrapper";
import styled from "styled-components";

export default function ExpenseTable() {
  const expenses = useRecoilValue(expensesState);
  return (
    <OverlayWrapper minHeight="73vh">
      <Table data-testid="expenseList" borderless hover responsive>
        <StyledThead className="table-light">
          <tr>
            <th>날짜</th> <th>내용</th> <th>결제자</th> <th>금액</th>
          </tr>
        </StyledThead>
        <StyledBody>
          {expenses.map(({ date, desc, amount, payer }, idx) => (
            <tr key={`expense-${idx}`}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>{amount} 원</td>
            </tr>
          ))}
        </StyledBody>
      </Table>
    </OverlayWrapper>
  );
}
const StyledThead = styled.thead`
  color: #6b3da6;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 29.05px;

  th {
    padding: 20px 8px;
  }
  padding: 20px 8px;
`;
const StyledBody = styled.tbody`
  td {
    font-size: 24px;
    font-weight: 351;
    line-height: 59.17px;
    text-align: center;
  }
`;
