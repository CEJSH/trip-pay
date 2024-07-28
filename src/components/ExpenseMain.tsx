import { Col, Container, Row } from "react-bootstrap";
import { AddExpenseForm } from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import SettlementSummary from "./SettlementSummary";
import ServiceLogo from "./shared/ServiceLogo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { expensesState } from "../state/expenses";

export const ExpenseMain = () => {
  const navigate = useNavigate();
  const groupName = useRecoilValue(groupNameState);
  const reset = useSetRecoilState(expensesState);
  useEffect(() => {
    if (groupName === undefined) {
      navigate("/");
      reset([]);
    }
  }, []);
  return (
    <StyledContainer fluid>
      <Row>
        <Col xs={12} sm={5} md={5}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane groupName={groupName} />
        </Col>
      </Row>
    </StyledContainer>
  );
};

const LeftPane = () => {
  return (
    <StyledPaneWrapper>
      <ServiceLogo />
      <StyledGapRow>
        <Row>
          <AddExpenseForm />
        </Row>
        <Row>
          <SettlementSummary />
        </Row>
      </StyledGapRow>
    </StyledPaneWrapper>
  );
};

const RightPane = ({ groupName }: { groupName: string }) => {
  return (
    <StyledPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || "그룹 이름"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledPaneWrapper>
  );
};

const StyledGapRow = styled(Row)`
  margin-top: 2vh;
  gap: 5vh;
  justify-content: center;
`;

const StyledGroupName = styled.div`
  margin-bottom: 60px;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0.25px;
  text-align: center;
  @media (max-width: 576px) {
    margin-bottom: 16px;
    margin-top: 24px;
  }
`;

const StyledContainer = styled(Container)`
  height: 100vh;
`;

const StyledPaneWrapper = styled(StyledContainer)`
  justify-content: center;
  padding: 0px 31px 0px 31px;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    padding: 0px 10px 0px 10px;
  }
`;
