import { Col, Container, Row } from "react-bootstrap";
import { AddExpenseForm } from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { groupNameState } from "../state/groupName";
import SettlementSummary from "./SettlementSummary";
import ServiceLogo from "./shared/ServiceLogo";

export const ExpenseMain = () => {
  return (
    <StyledContainer fluid>
      <Row>
        <Col xs={12} sm={5} md={5}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
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

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
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
  justify-content: space-between;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 60px;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0.25px;
  text-align: center;
`;

const StyledContainer = styled(Container)`
  height: 100vh;
`;

const StyledPaneWrapper = styled(StyledContainer)`
  justify-content: center;
  padding: 0px 31px 0px 31px;
  display: flex;
  flex-direction: column;
`;
