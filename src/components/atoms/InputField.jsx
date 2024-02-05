// src/components/atoms/InputField.js
import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// InputFieldコンポーネントを作成
const InputField = (props) => <Input {...props} />;

export default InputField;
