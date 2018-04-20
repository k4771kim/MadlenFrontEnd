import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,Alert} from 'react-native';
import { Container, Content,Card,CardItem,Header, Left, Body, Right, Button, Icon, Title,Thumbnail} from 'native-base';
import ImageCapInset from 'react-native-image-capinsets';
import MadlenURL from '../../MadlenURL'
import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import styles from '../../MadlenStyle'
import moment from 'moment'
import {connect} from 'react-redux';
import * as  appActions from '../../../actions/index';
export class LetterItem extends Component {
    constructor(props) {
      super(props);
        this.state = {usr_thumbnail:require('../../../img/default_profile.png')};
        this.ld_list_image = require('../../../img/letter3.png');
        const {dispatch} = this.props;
        this.user = dispatch(appActions.getUserData());
    }
    render(){
        if(this.props.read){
            this.state.usr_thumbnail= {uri:MadlenURL.SERVER+this.props.letter.letter_sender.usr_thumbnail}
        }
        else if (this.props.send){
            if(this.props.letter.letter_receiver_profile)
                this.state.usr_thumbnail = {uri:MadlenURL.SERVER+this.props.letter.letter_receiver_profile}
            else this.state.usr_thumbnail =  require('../../../img/default_profile.png')
        }
            if(this.props.letter.letter_ld){
                this.ld_list_image = {uri:MadlenURL.SERVER+this.props.letter.letter_ld.ld_list_image}
            }else{
                this.ld_list_image = require('../../../img/letter3.png')
            }
            
        const onClickLetter = (letter) =>{
            if(this.props.detail){
                this.props.navigator.showModal({screen:'Madlen.letterDetail', navigatorStyle: {navBarHidden:true},passProps:{letter_id:letter.letter_id}})
            }else if(this.props.temp){
                this.props.navigator.showModal({screen:'Madlen.WriteLetter', navigatorStyle: {navBarHidden:true},passProps:{temp_letter:letter,name:letter.letter_receiver_name,phone_number:letter.letter_receiver}})    
            }
        };
        const onPressHeartButton = () =>{
            let url = MadlenURL.SET_PRECIOUS_LETTER;
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','authorization': this.user.usr_auth});
            var details = {
                letter_id : this.props.letter.letter_id,
                onoff : !this.props.letter.letter_is_precious
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(url, {
                method: 'POST',
                headers,
                body: formBody
            }).then((response) => response.json())
            .then((responseData) => {
                this.props.preciousCallback();
            })
        }
        const onPressDeleteButton = () =>{
            const deleteLetter = () =>{
                let url = MadlenURL.DELETE_LETTER
                let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','authorization': this.user.usr_auth});
                var details = {
                    'usr_id':this.user.usr_id,
                    'letter_id':this.props.letter.letter_id
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(url, {
                    method: 'post',
                    headers,
                    body:formBody
                }).then((response) => response.json()).then((responseData) => {
                    if(responseData.result=="SUCCESS"){      
                        this.props.refreshCallback();
                    }else{
                        console.log("fail");
                    }
                })
                .catch((error) => {
                    return error
                })   
            }
            Alert.alert(
                '삭제하기',
                '쓰다만 편지를 삭제하시겠습니까?',
                [
                    {text: '확인', onPress: () => deleteLetter() },
                    {text: '취소', onPress: () => {} , style: 'cancel'},
                ],
                { cancelable: false }
            )
        }
        const onProfileLoadError = () =>{
            this.setState({
                usr_thumbnail:require('../../../img/default_profile.png')
            })
        }
        return (
            <TouchableOpacity style = {{borderTopWidth:0.5,borderLeftWidth:0.5,borderRightWidth:0.5, padding:10,paddingBottom:20,marginBottom:20,marginTop:5}} activeOpacity =  {1} onPress = {()=>onClickLetter(this.props.letter)}>
                <View style = {{flexDirection:'row'}}>
                    <Thumbnail source = {this.state.usr_thumbnail} onError={onProfileLoadError}/>
                    <View style = {{justifyContent:'center',marginLeft:10,}}>
                        <Text style = {{fontSize:20}}>{this.props.read&& this.props.letter.letter_sender.usr_name}{this.props.send&& this.props.letter.letter_receiver_name}</Text>
                        <Text style = {{color:'gray',fontSize:11,}}>{moment(this.props.letter.letter_send_date).format("YYYY.MM.DD hh:mm")}</Text>
                    </View>
                    {this.props.temp &&
                        <TouchableOpacity onPress = {onPressDeleteButton} style = {{marginLeft:'auto',justifyContent:'center'}}><Text style = {{fontSize:17}}>지우기</Text></TouchableOpacity>
                    }
                </View>
                <View>
                    <Text numberOfLines = {2} style = {{marginBottom:5,lineHeight:19, color:'gray',fontSize:13,marginTop:6}}>{this.props.letter.letter_content}</Text>
                </View>
                <Image style = {{position:'absolute',bottom:-12,height:13,left:-3}} resizeMode='stretch' source = {require('../../../img/letter_line.png')}></Image>
            </TouchableOpacity>
        )
    }
}
export default connect()(LetterItem);
