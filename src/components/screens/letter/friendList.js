import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container,Content, Header, Left, Body, Right, Button, Icon, Title,List,ListItem,Separator,Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import * as  appActions from '../../../actions/index';
var Contacts = require('react-native-contacts')
import friendDB from '../../friendDB'
import MadlenURL from '../../MadlenURL'
import ProgressCircle from 'react-native-progress-circle'
import styles from '../../MadlenStyle'
import { Dialog } from 'react-native-simple-dialogs';
export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactsList:[],
            friendList:[],
            dialogVisible : false,
            profile:{thumbnail:'',usr_name:'',usr_eng_name:'',receiveLetterCount:0,sendLetterCount:0,phone_number:''},
        };
        this.user = this.props.user
    }
    componentDidMount(){
        this.getFriendListFromDB();
        this.getContactsList();
    }
    getFriendListFromDB(){
        friendDB.get((friendList) =>{
            this.setState({friendList});
        })
    }
    getContactsList(){
        Contacts.getAll((err, contacts) => {
          if(err === 'denied'){
            // error
          } else {
            this.setState({contactsList:contacts})
          }
        })
    }

    render() {
        const _renderProfileDialog = (friend) =>{
            const onPressWriteLetter = () =>{
                this.setState({dialogVisible:false});
                this.props.navigator.push({screen: 'Madlen.WriteLetter', navigatorStyle: {navBarHidden:true}, passProps: {name : this.state.profile.usr_name, phone_number:this.state.profile.phone_number}});
            }
            return(
                <Dialog 
                    contentStyle = {{paddingTop:0,padding:0}}
                    visible={this.state.dialogVisible} 
                    onTouchOutside={() => this.setState({dialogVisible: false})} >
                    <View>
                        <Image style = {{width:'100%',height:300}} 
                        resizeMode = 'stretch' 
                        source = {require('../../../img/temp_profile_background.png')} />
                    
                        <View style ={{marginLeft:33,marginTop:21, flexDirection:'row',alignItems:'center'}}>
                            <Thumbnail style = {{width:50,height:50,borderRadius:25}} source = {{uri:this.state.profile.thumbnail}}/>
                            <Text style = {{marginLeft:10, fontSize:20}}>{this.state.profile.usr_name} {this.state.profile.usr_eng_name && this.state.profile.usr_eng_name}</Text>
                        </View>
                        <View style = {{padding:20,paddingTop:0,paddingBottom:0,marginTop:25, flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                            
                            <View style = {{flex:1,alignItems:'center'}}>
                                <Text style = {{fontWeight:'bold', fontSize:18,marginBottom:5,}}>{this.state.profile.receiveLetterCount}</Text>
                                <Text style = {{fontSize:13}}>받은 편지</Text>
                            </View>
                            <View style = {{flex:1,alignItems:'center'}}>
                                <Text style = {{fontWeight:'bold',fontSize:18,marginBottom:5,}}>{this.state.profile.sendLetterCount}</Text>
                                <Text style = {{fontSize:13}}>보낸 편지</Text>
                            </View>                                    
                            <TouchableOpacity onPress = {() => onPressWriteLetter(friend)} style = {{flex:1,alignItems:'center'}}>
                                <Icon style = {{fontSize:28}} name = 'mail'/>
                                <Text style = {{fontSize:13}}>편지 바로 보내기</Text>
                            </TouchableOpacity>    
                        </View>
                        <TouchableOpacity 
                            onPress = {() =>this.setState({dialogVisible:false})}
                            style = {{padding:3,paddingRight:15,paddingLeft:15, borderWidth:1, alignSelf:'center',marginBottom:20, marginTop:30}}>
                            <Text style = {{fontWeight:'bold'}}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            )
        }
        const showProfileDialog = (friend) =>{
            let url = MadlenURL.GET_USER_PROFILE + friend.phone_number
            let headers = new Headers({'authorization': this.user.usr_auth});
            fetch(url, {
                method: 'get',
                headers
            }).then((response) => response.json())
            .then((responseData) => {
                var thumbnail = responseData.profile.usr_thumbnail;
            
                if(thumbnail == '' || !thumbnail) thumbnail = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
                else thumbnail = MadlenURL.SERVER + thumbnail
                this.setState({
                    profile:{
                        thumbnail,
                        usr_name:responseData.profile.usr_name,
                        usr_eng_name:responseData.profile.usr_eng_name,
                        receiveLetterCount:responseData.receiveLetterCount,
                        sendLetterCount:responseData.sendLetterCount,
                        phone_number : friend.phone_number
                    }
                })
                this.setState({dialogVisible:true})
            })
        }

    const _mapToFriendsList= (friends) =>{
        return friends.map((friend,i) =>{
          const pushWriteLetter = () =>{
                this.props.navigator.push({screen: 'Madlen.WriteLetter', navigatorStyle: {navBarHidden:true}, passProps: {type : 'friend', name : friend.name, phone_number : friend.phone_number}});
            }
            var thumbnail = friend.thumbnail;
            if(thumbnail == "" || !thumbnail) thumbnail = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
            else thumbnail = MadlenURL.SERVER + thumbnail
            return(
                <ListItem onPress = {pushWriteLetter} key = {i}>
                    {_renderProfileDialog(friend)}
                    <TouchableOpacity onPress = {()=>showProfileDialog(friend)} >
                        <Thumbnail style = {{width:50,height:50,borderRadius: 25}} source={{uri: thumbnail}}/>
                    </TouchableOpacity>
                    <Text style = {{marginLeft:15}}> {friend.name}</Text>
                </ListItem>
                )
        })
    }
    const _mapToContactsList = (contacts) =>{

        return contacts.map((contact,i) =>{
            const pushWriteLetter = () =>{
                this.props.navigator.push({screen: 'Madlen.WriteLetter', navigatorStyle: {navBarHidden:true}, passProps: {type : 'contact' ,name : contact.givenName +' ' + contact.familyName , phone_number : contact.phoneNumbers[0].number}});
            }
            if(contact.phoneNumbers[0])
                return(
                    <ListItem onPress = {pushWriteLetter} key = {i}>
                        <Text> {contact.givenName} {contact.familyName}</Text>
                    </ListItem>
                )
        })
    }

    return (
      <Container style = {{backgroundColor:'white'}}>
        <Header style={[styles.header]}>
            <Left />
            <Body>
                <Title>To.</Title>
            </Body>
          
            <Right>    
                <TouchableOpacity onPress = {()=>this.props.navigator.dismissModal()}>
                    <Text>닫기</Text>
                </TouchableOpacity>
            </Right>
        </Header>
        <View style = {{marginLeft:70,marginRight:70}}>
            <Text style = {{alignSelf:'center',margin:10}}>먼저 누구에게 보낼지를 선택하세요.</Text>
            <Image source = {require('../../../img/m_icon.png')} style = {{position:'absolute',top:-4, width:'100%', height:'100%'}}/>
        </View>
        <Content>
        <List>
            <Separator bordered>
                <Text>Friends</Text>
            </Separator>
            {_mapToFriendsList(this.state.friendList)}

          <Separator bordered>
            <Text>전화번호 연락처</Text>
          </Separator>
            {_mapToContactsList(this.state.contactsList)}
        </List>
        </Content>

      </Container>

    );
  }
}

