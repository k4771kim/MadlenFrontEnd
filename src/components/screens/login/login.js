import React, { Component } from 'react';
import {Text,View,Alert,Platform} from 'react-native';
import {Container,Button,Content,Item,Label,Input,Header,Left,Right,Body,Title,Icon} from 'native-base';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as  appActions from '../../../actions/index';
import MadlenURL from '../../MadlenURL'
import styles from '../../MadlenStyle'
export class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {phone_number:"",button_disable : true};
    } 
    render() {
        const sendAuthKey = async () =>{
            let url = MadlenURL.AUTH_BY_SMS;
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            var details = {
                phone_number:this.state.phone_number
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
                if(responseData.result = "SUCCESS"){
                    this.props.navigator.push({screen: 'Madlen.inputAuthKey', passProps: {phone_number:this.state.phone_number}, navigatorStyle: {navBarHidden:true}});
                }
            })
        }
        const showAlert = ()=>{
            if(this.state.phone_number.length > 11 || this.state.phone_number.length < 10 ){
                Alert.alert(
                  '잘못된 전화번호 형식',
                  '전화번호를 다시 입력해 주세요.',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
            }else{
                Alert.alert(
                  this.state.phone_number,
                  "이 전화번호로 SMS 인증번호를 보냅니다.",
                  [
                    {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '확인', onPress: () => sendAuthKey()},
                  ],
                  { cancelable: false }
                )
            }
        }
    return (
        <Container>
            <Header style={styles.header}>
              <Left style = {styles.header_left_view}>
                <Button transparent onPress = {()=>this.props.navigator.pop()}>
                  <Icon style = {{color:'black'}} name= 'ios-arrow-back' />
                </Button>
             </Left>
             <Body>
               <Title>가입</Title>
               </Body>
               <Right />
            </Header>
            <View style = {{paddingLeft:20,paddingRight:20,flex:1}}>
                <Text style = {{marginTop:30,fontSize:19}}>대한민국 (Republic of Korea)</Text>
                <Item style = {{marginTop:10,marginRight:20,}}>
                    <Input
                        style = {{fontSize:36}} 
                        dataDetectorTypes = 'phoneNumber' 
                        keyboardType = 'phone-pad'
                        value = {this.state.phone_number} 
                        onChangeText={(phone_number) => this.handleInputChange(phone_number)}/>
                </Item>
                    <View style = {{marginTop:15}}>
                    <Text style = {{lineHeight:20,fontSize:14}}>마들렌 계정을 만들려면 전화번호 인증을 해야합니다.{"\n"}마들렌 이용약관과 개인정보 수집 및 이용에 동의하는 경우,{"\n"}전화번호 인증 버튼을 눌러주세요.</Text>
                    </View>
                <Button block warning style =  {{ width:'100%', marginTop:100, alignSelf:'center'}} onPress = {showAlert} disabled={this.state.button_disable}>
                    <Text style = {{color:'white'}}>전화번호 인증</Text>
                </Button>
            </View>
        </Container>
    );
  }
    handleInputChange(phone_number){
        let newText = '';
        let numbers = '0123456789';
        if(phone_number.length == 0 ){
            this.setState({phone_number : ''});
        }else{
            for (var i=0; i <  phone_number.length; i++) {
                if(numbers.indexOf(phone_number[i]) > -1 ) {
                    newText = newText +  phone_number[i];
                }
                else {
                }
            }
            let button_disable;
            if(newText.length > 11 || newText.length < 10 ){
                button_disable = true;
            }else{
                button_disable = false;
            }
            this.setState({phone_number:newText ,button_disable});
        }
    }
}
export default connect()(Login);