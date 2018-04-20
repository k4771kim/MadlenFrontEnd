import React, { Component } from 'react';
import {AsyncStorage,Text,View,Alert,TouchableOpacity,TextInput,Platform} from 'react-native';
import {Container,Content,Item,Button,Label,Input,Header,Left,Right,Icon,Body,Title} from 'native-base';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as  appActions from '../../../actions/index';
import MadlenURL from '../../MadlenURL'
import styles from '../../MadlenStyle'
export class InputAuthKey extends Component {
    constructor(props) {
      super(props);
      this.state = {certification:''};
    }
    render() {
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
                <View style = {{paddingLeft:20,paddingRight:20,}}>
                    <TextInput style = {{fontSize:43,marginTop:30,textAlign:'center'}} maxLength={4} placeholder = '인증번호' onChangeText={(certification) => this.setState({certification})} />
                <Text style = {{marginTop:15,alignSelf:'center',fontSize:19,color: '#f0af6f'}}>{this.props.phone_number}</Text>
                    <Text style = {{marginTop:20,alignSelf:'center',textAlign:'center',fontSize:16,}}>
                        SMS로 발송된 인증번호를 입력해 주세요. {"\n"}
                        인증번호를 받지 못한 경우 다음 중 하나를 선택하세요.
                    </Text>
                        <TouchableOpacity >
                            <Text style = {{alignSelf:'center', marginTop:15,fontSize:16, textDecorationLine: 'underline'}}>인증번호 다시 받기</Text>
                        </TouchableOpacity>
                    <Button block warning style =  {{ width:'100%', marginTop:100, alignSelf:'center'}}  onPress={ () => this.onCertification()} disabled={this.state.button_disable}>
                        <Text style = {{color:'white'}}>다음</Text>
                    </Button>
                </View>
            </Container>
        );
    }
    onCertification(){
        let url = MadlenURL.INPUT_AUTH_KEY;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        var details = {
            phone_number : this.props.phone_number,
            auth_key : this.state.certification
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
            if(responseData.result == "AUTH_SUCCESS"){
                AsyncStorage.setItem('AuthPhoneNumber',this.props.phone_number)
                this.onLogin();
            }else{
                Alert.alert(
                '인증 실패',
                '인증번호를 다시 입력해 주세요.',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
                )
            }
        })
    }
    async onLogin() {
        let url = MadlenURL.LOGIN;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        var details = {
            phone_number : this.props.phone_number
        };
        let FcmToken = await AsyncStorage.getItem('FCM_TOKEN');
        if(FcmToken) details.push_key = FcmToken;
        if(Platform.OS == 'ios') details.device_type = "I"; else details.device_type = "A";
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
            AsyncStorage.setItem('AuthorizationKey',responseData.user.usr_auth);
            this.props.dispatch(appActions.login(responseData.user));
        })
    }
}
export default connect()(InputAuthKey);