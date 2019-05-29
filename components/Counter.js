import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Context } from '../contexts';

export default () => {
  const value = useContext(Context);
  return (
    <div style={{ marginLeft: '100px' }}>
      <div>
        <span>{value.count.count.count}</span>
      </div>
      <ButtonStyled onClick={() => value.count._inc({ type: 'inc' })}>Hello anh em</ButtonStyled>
    </div>
  );
};
const ButtonStyled = styled(Button)`
  && {
    color: white;
    background-color: ${(props) => props.theme.palette.primary.main};
    margin-left: 100px;
    font-family: ${(props) => props.theme.typography.fontFamily};
  }
  &&:hover {
    color: black;
  }
`;
