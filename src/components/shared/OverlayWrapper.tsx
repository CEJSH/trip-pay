import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  padding?: string;
  minHeight?: string;
};

interface StyledDivProps {
  padding?: string;
  minHeight?: string;
}
export const OverlayWrapper = ({ children, padding, minHeight }: Props) => {
  return (
    <StyledContainer padding={padding} minHeight={minHeight}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<StyledDivProps>`
  padding: ${(props) => props?.padding || "4vw"};
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: white;
  border-radius: 15px;
  min-height: ${(props) => props?.minHeight || "0"};
`;
