import React, { Component } from 'react';
import {AsyncStorage,StyleSheet,View,Text,TouchableOpacity,Alert,Linking,Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container,Thumbnail, Header, Left, Body, Right, Button,Separator, Icon, Title,List,ListItem,Content,Switch} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import MadlenURL from '../../MadlenURL'
import * as  appActions from '../../../actions/index';
import Mailer from 'react-native-mail';
export class Settings extends Component {

constructor(props) {
  super(props);

  this.state = {
    is_drawer_open : false,
    left_menu_icon:'menu',
    letter_received_push:false,
    newsfeed_push:false,
  };
    const {dispatch} = this.props;
    this.user = dispatch(appActions.getUserData());
}

  render() {
    const logout = () =>{
        AsyncStorage.clear()
       this.props.dispatch(appActions.appInitialized());
     
    }
    const handleEmail = () => {
        console.log(Linking)
        let link;
        Platform.OS === 'android'
        ? link = 'mailto:dantesway@dantesway.com?cc=?subject=yourSubject&body=yourMessage'
        : link = 'mailto:dantesway@dantesway.com?cc=&subject=yourSubject&body=yourMessage'
        console.log(link)
        Linking.openURL(link);
    
    
       
/*
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<b>A Bold Body</b>',
      isHTML: true,
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });

    */
  }


    const toggleDrawer = () =>{

        this.props.navigator.toggleDrawer({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        });

    }
     const _renderUpdateProfile = () =>{
        if(!this.user.usr_name || !this.user.usr_thumbnail){
            return(
                <ListItem icon>
                    <Left />
                    <Body>
                        <Text>내 프로필</Text>
                    </Body>
                    <Right />
                </ListItem>
                )
        }else{
            return(
                <ListItem icon>
                    <Left>
                        <Thumbnail style = {{width:34,height:34,borderRadius: 17}} source = {{uri : MadlenURL.SERVER+this.user.usr_thumbnail}}/>
                    </Left>
                    <Body>
                        <Text>{this.user.usr_name}</Text>
                    </Body>
                    <Right />
                </ListItem>
            )
        }
     }
      const _renderHeader = () =>{
        return(
            <Header style={styles.header}>
            <Left>
                 <TouchableOpacity style = {{flexDirection:'row',alignItems:'center'}} onPress = {()=>this.props.navigator.dismissModal()}>
                    <Icon name = {'ios-arrow-back'} />
                </TouchableOpacity>
            </Left>
            <Body>
                <Title>설정</Title>
            </Body>
            <Right />
        </Header>
        )
    }
    const _renderSettingsContent = () =>{
        
        const _renderReceiveLetterAlarm = ()=>{
            const letterReceivePushChange = () =>{
                this.setState({letter_received_push:!this.state.letter_received_push})
            }
        
            return(
                <ListItem icon>
                        <Left />
                        <Body>
                            <Text>편지가 올때 알림 받음</Text>
                        </Body>
                        <Right>
                            <Switch value={this.state.letter_received_push} onValueChange = {letterReceivePushChange} />
                        </Right>
                </ListItem>
                )
        }
        const _renderNotifyAlarm = ()=>{
            const newsfeedPushChange = () =>{
                this.setState({newsfeed_push:!this.state.newsfeed_push})
            }
            return(
                <ListItem icon>
                        <Left />
                        <Body>
                            <Text>마들렌의 새소식이 올 때 알림 받음</Text>
                        </Body>
                        <Right>
                            <Switch value={this.state.newsfeed_push} onValueChange = {newsfeedPushChange}  />
                        </Right>
                </ListItem>
                )
        }        
        const _renderSendOpinion = ()=>{
            return(

                <ListItem icon>
                        <Left />
                        <Body>
                            <Text>마들렌에 의견 보내기</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }      
        const _renderSendRating = ()=>{
            return(
                <ListItem icon>
                        <Left />
                        <Body>
                            <Text>마들렌 앱 평가하기</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }     
        const _renderFacebook = ()=>{
           
            const linkingFacebook = () =>{
                Linking.openURL('https://www.facebook.com/내일도착하는-편지-마들렌-190453258353182/').catch(err => console.error('An error occurred', err));
            }
            return(
                <ListItem onPress = {linkingFacebook} icon>
                        <Left />
                        <Body>
                            <Text>마들렌 공식 Facebook</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }      
        const _renderEmail = ()=>{
            return(
                <ListItem  onPress = {handleEmail} icon>
                        <Left />
                        <Body>
                            <Text>회사(Dantesway Inc)에 이메일 보내기</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }     
        const _renderTerms = ()=>{
            return(
                <ListItem icon>
                        <Left />
                        <Body>
                            <Text>마들렌 약관</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }      
        const _renderPolicy = ()=>{
            return(
                <ListItem icon>
                        <Left />
                        <Body>
                            <Text>개인정보관리 및 처리방침</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }     
        const _renderLogout = ()=>{
            return(
                <ListItem onPress = {logout} icon>
                        <Left />
                        <Body>
                            <Text>로그아웃(다시 로그인할 때 전화번호 인증)</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }      
        const _renderLeave = ()=>{
            return(
                <ListItem icon>
                        <Left />
                        <Body>
                            <Text>계정탈퇴(저장된 편지가 모두 삭제됩니다)</Text>
                        </Body>
                        <Right />
                </ListItem>
                )
        }     
        return(
            <Content>
                <List>
                    <Separator>
                        <Text>내 프로필</Text>
                    </Separator>
                        {_renderUpdateProfile()}
                    {/*
                    <Separator>
                        <Text>소식 설정</Text>
                    </Separator>

                    {_renderReceiveLetterAlarm()}
                    {_renderNotifyAlarm()}
                    */}
                    {/* <Separator>
                        <Text>사용자 의견과 평가</Text>
                    </Separator>
                    {_renderSendOpinion()}
                    {_renderSendRating()} */}

                    <Separator>
                        <Text>마들렌 소식과 소통</Text>
                    </Separator>
                    {_renderFacebook()}
                    {_renderEmail()}
                    {/*
                    <Separator>
                        <Text>개인정보관리</Text>
                    </Separator>
                    {_renderTerms()}
                    {_renderPolicy()}

                    */}
                    <Separator>
                        <Text>계정관리</Text>
                    </Separator>
                    {_renderLogout()}
                    {/* {_renderLeave()} */}
                </List>
            </Content>
        )
    }

    return (
      <Container style = {{backgroundColor:'white'}}>
        {_renderHeader()}
        {_renderSettingsContent()}
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header : {
    backgroundColor: '#ffffff',
    shadowRadius: 0,
    shadowOffset: {height: 0},
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    elevation:0,padding:0,margin:0,
  },
  header_left_view : {padding:0,margin:0,flexDirection:'row',alignItems:'center'},
  header_right_text:{backgroundColor: '#ffffff', paddingLeft:10,paddingRight:20,position:'absolute',right:-10, fontSize:12, color:'#404040',}

});


export default connect()(Settings);