import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,StatusBar,Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import * as  appActions from '../../../actions/index';
import styles from '../../MadlenStyle'
import MadlenURL from '../../MadlenURL'
export class NotificationDetail extends Component {

constructor(props) {
  super(props);

  this.state = {  };
}

  render() {

    return (

      <View testID="something" style = {{flex:1}}>
         <Image testID="something" source = {{uri:MadlenURL.SERVER+this.props.notification.ntf_img}} style = {{position:'absolute',width:'100%',height:'100%'}} />
       <Header  testID="something" style={[styles.header,{backgroundColor: 'transparent'}]}>
          <Left style = {styles.header_left_view}>
            <Button transparent testID="something"
            onPress = {()=>
              this.props.navigator.dismissModal()
            }>
              <Icon style = {{color:'black'}} name= 'ios-arrow-back' />
            </Button>
         </Left>
         <Body />

        <Right>
        </Right>
        </Header>

        <Content style = {styles.content}>
        <Text style = {styles.notification_detail_title}>{this.props.notification.ntf_title}</Text>

        <Text style = {styles.notification_detail_content}>{this.props.notification.ntf_content}</Text>
        </Content>
      </View>

    );
  }
}


export default connect()(NotificationDetail);