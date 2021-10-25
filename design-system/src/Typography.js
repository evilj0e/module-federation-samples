import React from "react";
import styled from 'styled-components';

const H3 = styled.h3`
    line-height: 32px;
    border: 1px solid #ccc;
`;

export default ({ children, style = {} }) => (<H3 style={style}>{children}</H3>);