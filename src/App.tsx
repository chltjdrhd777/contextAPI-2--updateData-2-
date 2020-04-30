import React, { Fragment, Component } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Flex from "typescript-styled-flex";
import Headpresenter from "./components/Header";
import NotificationPresenter from "./components/Notification";
import store from "./Store";
//createGlobalStyle = define the whole page's CSS
//reset = to reduce default line heights, margins, font sizes.... I mean, It gives me a clear blueprint
const GlobalStyle = createGlobalStyle`
  ${reset};
  body{
    height: 100%;
    background-color: #ecf0f1;
  } 
`;

//alignCenter = if there are numerous items which have different height, align them right in the center of flex axis
//full = give width 100% height 100%

//If I want to return a specific function, I should mention like
// store => {return store.notification.map(....)}

//However, If I want to return Component directly, the form is like
//store => (<Component>......<Component>)
class App extends Component {
  state: {
    notification: {};
    deleteNoti: (id: number) => void;
    checkSeen: (id: number) => void;
  };

  deleteNotification: (id: number) => void;
  showSeen: (id: number) => void;

  constructor(props: any) {
    super(props);
    this.deleteNotification = (id) => {
      this.setState((currentState: any) => {
        const newState = delete currentState.notification[id];
        return newState;
      });
    };

    this.showSeen = (id) => {
      this.setState((currentState: any) => {
        return {
          notification: {
            ...currentState.notification,
            [id]: { ...currentState.notification[id], seen: true },
          },
        };
      });
    };

    this.state = {
      notification: {
        "1": {
          id: 1,
          text: "something",
          seen: false,
        },
        "2": {
          id: 2,
          text: "something2",
          seen: false,
        },
        "3": {
          id: 3,
          text: "something3",
          seen: false,
        },
      },
      deleteNoti: this.deleteNotification,
      checkSeen: this.showSeen,
    };
  }

  render() {
    return (
      <store.Provider value={this.state}>
        <Fragment>
          <GlobalStyle />
          <Headpresenter />
          <Flex alignCenter full column>
            <store.Consumer>
              {(store) => {
                return Object.keys(store!.notification).map((key) => (
                  <NotificationPresenter
                    key={store.notification[key].id}
                    id={store.notification[key].id}
                    text={store.notification[key].text}
                    seen={store.notification[key].seen}
                  />
                ));
              }}
            </store.Consumer>
          </Flex>
        </Fragment>
      </store.Provider>
    );
  }
}

export default App;
