import React, { Fragment } from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "typescript-styled-flex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import store from "../Store";

export type NotiPropType = {
  id?: number;
  text: string;
  seen: boolean;
};

type ButtonType = {
  success?: any;
  danger?: any;
  seen?: boolean;
};

//border : thickness style color
const Notification = styled.div<{ seen: boolean }>`
  background-color: white;
  width: 80%;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
  border: 2px solid ${(props) => (props.seen ? "transparent" : "#f1c40f")};
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
`;

const Title = styled.span`
  font-size: 15px;
`;

const Button = styled.button<ButtonType>`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: none;
  color: white;
  background-color: ${(props) => {
    if (props.seen) {
      return "#7f8c8d";
    } else if (props.success) {
      return "#2ecc71";
    } else if (props.danger) {
      return "#e74c3c";
    }
  }};
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(1px);
  }
`;

//the es6 expression about the contents of props => {id,text,seen}
//which means I wanna select the exact properties among numerous ones in props

//store.Consumer = context API allows me to use the stored information. Note, it should be a funtion
const NotificationPresenter = ({ id, text, seen }: NotiPropType) => {
  return (
    <Notification seen={seen}>
      <Flex alignCenter justifyBetween>
        <Title>{text}</Title>

        <FlexItem>
          <store.Consumer>
            {(store) => (
              <Fragment>
                <Button success seen={seen} onClick={() => store.checkSeen(id)}>
                  <FontAwesomeIcon icon={faCheck} size="1x" />
                </Button>

                <Button danger onClick={() => store.deleteNoti(id)}>
                  <FontAwesomeIcon icon={faTimes} size="1x" />
                </Button>
              </Fragment>
            )}
          </store.Consumer>
        </FlexItem>
      </Flex>
    </Notification>
  );
};

export default NotificationPresenter;
