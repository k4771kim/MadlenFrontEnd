import React, { Component } from 'react';
import {AsyncStorage,Text,View,Alert,Image,Platform} from 'react-native';
import {Container,Content,Item,Label,Input,Button} from 'native-base';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as  appActions from '../../../actions/index';
import MadlenURL from '../../MadlenURL'
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import LottieView from 'lottie-react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
const on_the_way_anim = require('../../../img/anim/on_the_way_anim.json');
const received_anim = require('../../../img/anim/received_anim.json');
const gift_anim = require('../../../img/anim/happy_gift.json');
const entries = [{},{},{}]
FCM.on(FCMEvent.Notification, async (notif) => {
   FCM.getInitialNotification().then(notif2=>{
    });       
});
export class FirstScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {activeSlide:0, is_login_screen:false};    
    }
    async getFCMToken(){
       try{
          let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
        } catch(e){
          console.error(e);
        }
        FCM.getFCMToken().then(token => {
             if(token) AsyncStorage.setItem('FCM_TOKEN',token)
        });
    }
    componentDidMount(){
        this.AutoLogin();
    }
    async AutoLogin() {
         await this.getFCMToken();
         let AuthorizationKey = await AsyncStorage.getItem('AuthorizationKey')
        if(AuthorizationKey){
            let url = MadlenURL.AUTO_LOGIN;
            let headers = new Headers({'authorization': AuthorizationKey, 'Content-Type': 'application/x-www-form-urlencoded'});
            var details = {
                // phone_number : AuthPhoneNumber
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
                console.log(responseData);
                if(responseData.result=="AUTO_LOGIN_SUCCESS") {
                    AsyncStorage.setItem('AuthorizationKey',responseData.user.usr_auth);
                    this.state.is_login_screen = true;
                    this.props.dispatch(appActions.login(responseData.user));
                }else{
                    this.setState({is_login_screen:true});
                }
            }).catch((e)=>{
                console.log(e)              
                this.setState({is_login_screen:true})
            })
        }else{
            this.setState({is_login_screen:true});
        }
    }
    render() {
        const _renderItem = ({item, index}) => {
            const play = (animation) =>{
                if(animation)animation.play()
            }
            switch(index){
                case 0 :
                    play(this.on_the_way_animation);
                    return (
                        <View style = {{width:width,marginTop:'auto'}}>
                            <View style = {{padding:10, width:width*0.8, alignSelf:'center',flexDirection:'row'}}>
                                <LottieView
                                    style = {{width:95,height:90}}
                                    ref={on_the_way_animation => {
                                        this.on_the_way_animation = on_the_way_animation;
                                    }}
                                    loop={true}
                                    source = {on_the_way_anim}
                                />   
                                <Text style = {{alignSelf:'flex-end',fontSize:14, color:'#444444',marginLeft:10,lineHeight:24}}>마들렌 우체부가 {"\n"}당신의 편지를 배달중입니다.</Text>
                            </View>
                            <Text style = {{alignSelf:'center',textAlign:'center', color:'#444444', marginTop:80,lineHeight:27,fontSize:16}}>편지를 보내면{"\n"}마들렌 우체부가 열심히{"\n"}당신의 마음을 배달해 드립니다.</Text>
                        </View>
                    );
                    break;
                case 1 :
                    play(this.received_animation)
                    return (
                        <View style = {{width:width,marginTop:'auto'}}>
                            <View style = {{padding:10, width:width*0.8, alignSelf:'center',flexDirection:'row'}}>
                                <LottieView
                                    style = {{width:95,height:90}}
                                    ref={received_animation => {
                                            this.received_animation = received_animation;
                                        }}
                                    loop={true}
                                    source = {received_anim}
                                />   
                                <Text style = {{alignSelf:'flex-end',fontSize:14, color:'#444444',marginLeft:10,lineHeight:24}}>편지가 도착했습니다 {"\n"}어서 열어보세요.</Text>
                            </View>
                            <Text style = {{alignSelf:'center',textAlign:'center', color:'#444444', marginTop:50,lineHeight:27,fontSize:16}}>편지는 24시간동안 열심히 달려서 {"\n"}그 다음날 도착합니다.{"\n"} 편지를 받는 사람은{"\n"}무척 설레고 기쁠 것입니다.</Text>
                        </View>
                    );
                    break;
                case 2 :
                    return (
                        <View style = {{width:width,marginTop:'auto'}}>
                            <View style = {{padding:10, width:width*0.8, alignSelf:'center',flexDirection:'row'}}>
                                <View style = {{marginLeft:'auto',marginRight:'auto'}}>
                                <LottieView
                                    style = {{width:140,height:160 }}
                                    ref={received_animation => {
                                        this.received_animation = received_animation;
                                    }}
                                    loop={true}
                                    source = {gift_anim}
                                />   
                                </View>
                            </View>
                            <Text style = {{alignSelf:'center',textAlign:'center', color:'#444444', marginTop:50,lineHeight:27,fontSize:16}}>마음을 전하고 싶을 때는 문자대신{"\n"}이제부터 마들렌으로 편지를 쓰세요{"\n"}마들렌은 마음을 전하는 최고의 선물입니다.</Text> 
                        </View>
                    );
                    break;
            }
        }
    if(this.state.is_login_screen){
        return (
            <Container style = {{flex:1,backgroundColor: '#f0f0f0'}}>
                <Image style = {{position:'absolute', width:'80%',height:'75%',bottom:0,alignSelf:'center'}} resizeMode="stretch" source = {require('../../../img/tutorial_phone.png')}/>
                <View style = {{alignItems:'center',marginTop:68}}>
                    <Text style = {{fontSize:25}}>내일 도착하는 편지</Text>
                    <Text style ={{fontSize:32,marginTop:10,}}>마들렌</Text>
                </View>
                <Carousel
                ref={(c) => { this._carousel = c; }}
                data={entries}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                <Pagination 
                    containerStyle = {{paddingBottom:0,}}
                    activeDotIndex={this.state.activeSlide}
                    dotsLength={entries.length}
                />
                <Button style = {{marginTop:'auto',alignSelf:'center',marginBottom:20}} transparent onPress = {()=>{ this.props.navigator.push({screen: 'Madlen.Login', navigatorStyle: {navBarHidden:true}})}}>
                    <Text>마들렌 회원가입</Text>
                </Button>
            </Container>
        );
    }else{
        return <View />
    }
  }
}
export default connect()(FirstScreen);