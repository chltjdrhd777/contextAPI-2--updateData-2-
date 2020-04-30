/* eslint-disable array-callback-return */
import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "typescript-styled-flex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import store from "../Store";
//padding : direction 12, 3, 6, 9 or direction top buttom, left right
const Header = styled.header`
  height: 70px;
  background-color: #ecf0f1;
  padding: 0 40px;
  margin-top: 10px;
`;

const Number = styled.span`
  font-size: 8px;
  font-weight: 600;
  background-color: #8e44ad;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  left: 13px;
  top: -7px;
`;

//justify-content : center = center according to the axis
//align-items: center = center accoring to their space
//transition : all(width,height) s timing delay  <---- set how animation works
// & = like "this" in class. in this case, &:hpver = span:hover
// transform : translate <----- move the target according to X axis, or Y axis
const HeaderIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: white;
  background-color: #3498db;
  border-radius: 50%;
  margin-right: 15px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);

  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }

  position: relative;
`;

const unSeenChekcer = (notification: any) => {
  let unSeen = [];
  Object.keys(notification).map((key) => {
    if (!notification[key].seen) {
      unSeen.push(notification[key]);
    }
  });
  return unSeen.length;
};

const Headpresenter = () => {
  return (
    <Header>
      <Flex full justifyBetween>
        <FlexItem>
          <h3>Anderson</h3>
        </FlexItem>

        <FlexItem>
          <HeaderIcon>
            <FontAwesomeIcon icon={faChild} size="1x" />
          </HeaderIcon>

          <HeaderIcon>
            <FontAwesomeIcon icon={faCog} size="1x" />
          </HeaderIcon>

          <HeaderIcon>
            <FontAwesomeIcon icon={faBell} size="1x" />

            <Number>
              <store.Consumer>
                {(store) => unSeenChekcer(store.notification)}
              </store.Consumer>
            </Number>
          </HeaderIcon>
        </FlexItem>
      </Flex>
    </Header>
  );
};

export default Headpresenter;
