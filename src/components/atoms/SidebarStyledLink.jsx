import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarStyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 10px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0d8ed9;
  }
`;

export default SidebarStyledLink;
