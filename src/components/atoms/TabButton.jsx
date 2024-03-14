// atoms/TabButton.jsx
import styled from "styled-components";

const TabButton = styled.button`
  padding: 20px 0;
  border: none;
  background: none;
  font-weight: bold;
  color: #1da1f2;
  flex-grow: 1;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#1da1f2" : "transparent")}; // アクティブなタブの下線を表示
  &:hover {
    background-color: #e8f5fe;
  }
`;

export default TabButton;
