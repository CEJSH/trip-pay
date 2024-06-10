/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { CreateGroup } from "./CreateGroup";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";

const renderComponent = () => {
  render(
    <RecoilRoot>
      <CreateGroup />
    </RecoilRoot>
  );
  const input = screen.getByPlaceholderText("what travel it is?");
  const saveButton = screen.getByText("저장");
  const errorMessage = screen.queryByText("그룹 이름을 입력해 주세요");

  return {
    input,
    saveButton,
    errorMessage,
  };
};

describe("그룹 생성 페이지", () => {
  test("그룹 이름 입력 컴포넌트가 렌더링 되는가", () => {
    const { input, saveButton } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveButton).not.toBeNull();
  });

  test('그룹 이름을 입력하지 않고 "저장" 버튼 클릭시, 에러 메시지를 노출시킨다', async () => {
    const { saveButton, errorMessage } = renderComponent();

    await userEvent.click(saveButton);
    expect(errorMessage).not.toBeNull();
  });
});
