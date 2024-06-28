import React from "react";
import styled from "styled-components";

interface StyledDivProps {
  padding?: string;
  minHeight?: string;
}
export const OverlayWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled.div<StyledDivProps>`
  padding: ${(props) => props?.padding || "5vw"};
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: white;
  border-radius: 15px;
  min-height: ${(props) => props?.minHeight || "0"};
`;
