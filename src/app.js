import React, { Component } from 'react';
import {Platform,AppRegistry,Text} from 'react-native';
import {createStore, applyMiddleware, combineReducers,compose} from "redux";
import devToolsEnhancer, { composeWithDevTools } from 'remote-redux-devtools';
import friendDB from './components/friendDB'
import {Provider} from "react-redux";
import { Navigation } from 'react-native-navigation';
import registerScreens from './components/screens/screens.js';
import * as appActions from "./actions/index";
import thunk from "redux-thunk";
import * as reducers from "./reducers/index";
const reducer = combineReducers(reducers);
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));
registerScreens(store, Provider);

export default class  App extends Component {
  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
  }
  onStoreUpdate() { //subscribe to e
    let {root} = store.getState().root;
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }
  startApp(root) {
    switch (root) {
        case 'login':
          Navigation.startSingleScreenApp({
            screen: {
              screen: 'Madlen.FirstScreen',
              title: 'Madlen Home',
              navigatorStyle: {navBarHidden:true},
              navigatorButtons: {}
            },
          });
          return;
        case 'after-login':
            Navigation.startTabBasedApp({
              tabs: [{
                screen: 'Madlen.Home',
                title: 'Madlen Home',
                navigatorStyle: {navBarHidden:true},
                navigatorButtons: {},
                icon: require('./img/drawer_icon/h_off.png')
              },{
                screen: 'Madlen.SendLetter',
                title: 'Madlen SendLetter',
                navigatorStyle: {navBarHidden:true},
                navigatorButtons: {},
                icon: require('./img/drawer_icon/h_off.png')
              },{
                screen: 'Madlen.ReadLetter',
                title: 'Madlen ReadLetter',
                navigatorStyle: {navBarHidden:true},
                navigatorButtons: {},
                icon: require('./img/drawer_icon/h_off.png')
              },{
                screen: 'Madlen.PreciousLetter',
                title: 'Madlen PreciousLetter',
                navigatorStyle: {navBarHidden:true},
                navigatorButtons: {},
                icon: require('./img/drawer_icon/h_off.png')
              },{
                screen: 'Madlen.PrepareLetter',
                title: 'Madlen PrepareLetter',
                navigatorStyle: {navBarHidden:true},
                navigatorButtons: {},
                icon: require('./img/drawer_icon/h_off.png')
              }],
              appStyle: {
                tabBarHidden:true,
                drawUnderTabBar: true,
                orientation: 'portrait',
                hideBackButtonTitle: true
              },
              tabsStyle : {tabBarHidden:true, drawUnderTabBar: true,},
              drawer: {
                left: {
                  screen: 'Madlen.Drawer',
                  passProps: {},
                  disableOpenGesture: false,
                  fixedWidth: 500
                },
                style: {
                  drawerShadow: false,
                  contentOverlayColor: 'rgba(0,0,0,0)',
                  leftDrawerWidth: 60,
                  shouldStretchDrawer: true
                },
                type: 'MMDrawer',
                animationType: 'slide',
                disableOpenGesture: true
              },
              passProps: {},
            });
            return;
          default: 
            console.log("Not Root Found");
        }
    }
}
