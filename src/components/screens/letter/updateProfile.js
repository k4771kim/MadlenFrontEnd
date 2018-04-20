import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container,Content, Header, Left, Body, Right, Button, Icon, Title,List,ListItem,Separator,Thumbnail} from 'native-base';
import {connect} from 'react-redux'
import * as  appActions from '../../../actions/index';
var Contacts = require('react-native-contacts')
import friendDB from '../../friendDB'
import MadlenURL from '../../MadlenURL'
import ImagePicker from 'react-native-image-crop-picker';
export default class UpdateProfile extends Component {
constructor(props) {
    super(props);
    this.state = {
        selectedImage : require('../../../img/null_profile.png'),
        uploadImage : {}
    };
    this.user = this.props.user
}
    render() {
        const selectImage = () =>{
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                this.setState({
                    selectedImage: {uri:image.path},
                    uploadImage : image
                })
            });
        }
        const saveProfile = () =>{
            let url = MadlenURL.UPDATE_PROFILE
            let fd = new FormData();
            fd.append('usr_id',this.user.usr_id)
            const splitdata = this.state.uploadImage.path.split('/')
            const name = splitdata[splitdata.length-1]
            fd.append('usr_profile_image', {
                uri: this.state.uploadImage.path,
                type: this.state.uploadImage.mime,
                name:name
            });  
            fetch(url, {
              method: 'post',
              body:fd
            }).then((response) => response.json()).then((responseData) => {
                if(responseData.result=="SUCCESS"){      
                    this.props.callback(true,responseData.user);
                }else{
                }
            }).catch((error) => {
                console.log(error);
                return error
            })
        }
        const _renderHeader = () =>{
            return(
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity style = {{flexDirection:'row',alignItems:'center'}} onPress = {()=>this.props.navigator.dismissModal()}>
                            <Icon name = {'ios-arrow-back'} />
                            <Text style = {{marginLeft:5}}>닫기</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title>이름과 사진 등록</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress = {saveProfile}>
                            <Text>저장</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
            )
        }
        return (
            <Container>
                {_renderHeader()}
                <Content>
                    <Text>
                        편지를 받는 이들이 당신의 얼굴을 알아 볼 수 있는 사진
                    </Text>           
                    <Thumbnail source = {this.state.selectedImage} />
                    <Button onPress = {selectImage}>
                        <Text>ImageUpload</Text>
                    </Button>
                    <Text>편지를 받는 이들이 당신을 아는 본래의 이름 ( 등록된 이름은 수정 할 수 없습니다)</Text>  
                    <Text>한글이름 : (필수) </Text>
                    <TextInput />
                        <Text>영어이름 : (선택) </Text>
                    <TextInput />
                </Content>
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

