import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,TextInput,AppState,InteractionManager,TouchableHighlight} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container, Header,Item,Input, Left, Body, Right, Button,Label, Icon, Title,Thumbnail,Content} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import * as  appActions from '../../../actions/index';
 import {createStore, applyMiddleware, combineReducers} from "redux";
// import thunk from "redux-thunk";
import MadlenURL from '../../MadlenURL'
import friendDB from '../../friendDB'
import TimerMixin from 'react-timer-mixin';
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
import * as reducers from "../../../reducers/index";
const reducer = combineReducers(reducers);
// const store = createStoreWithMiddleware(reducer);
import moment from 'moment' 
// import { Popover, PopoverContainer } from 'react-native-simple-popover';
import Carousel from 'react-native-snap-carousel';
import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Dialog } from 'react-native-simple-dialogs';
var Contacts = require('react-native-contacts')
import styles from '../../MadlenStyle'
const on_the_way_dialog_anim = require('../../../img/anim/ex-splash.json');
mixins: [TimerMixin];
export class Home extends Component {

    constructor(props) {
        super(props);
        Text.defaultProps.style = { fontFamily: 'NanumBarunGothic'}
        const {dispatch} = this.props;
        this.user = dispatch(appActions.getUserData());
        this.state = {
            dialogVisible: false,
            // letter_on_the_way : [],
            letter_received: [],
            notify_list : [],
            selectedImage : require('../../../img/null_profile.png'),
            korText:'',
            engText:'',
            onTheWayDialogVisible:false,
            contactsList:[]
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.refreshFriendDB();
    }
    refreshFriendDB(){
        Contacts.getAll((err, contacts) => {
          if(err === 'denied'){
            // error
          } else {
            this.state.contactsList =contacts
             this.refreshFriend();
          }
        })
       
    }
    refreshFriend(){
        var PhoneNumberList = [];
            for(let i = 0 ; i < this.state.contactsList.length;i++){
                if(this.state.contactsList[i].phoneNumbers.length>0)
                    PhoneNumberList.push(this.state.contactsList[i].phoneNumbers[0].number);
            }

        let url = MadlenURL.GET_FRIEND_LIST
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','authorization': this.user.usr_auth});
         var formBody = [];
        for(let i = 0 ; i< PhoneNumberList.length ; i++){
             var encodedKey = encodeURIComponent('phone_number');
             var encodedValue = encodeURIComponent(PhoneNumberList[i]);
              formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(url, {
            method: 'POST',
            headers,
            body: formBody

        }).then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            friendDB.refresh(responseData.friend,(friendList)=>{
            });
        })  
    }
    onNavigatorEvent(event) {
        switch(event.id) {
            case 'willAppear':
                break;
            case 'didAppear':
                this.getReceiveLetterData();
                this.getNotifyData();
                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                break;
        }
    }
    animPlay(){
        if(this.on_the_way_animation) this.on_the_way_animation.play();
        if(this.received_animation) this.received_animation.play();
        if(this.on_the_way_dialog_animation) this.on_the_way_dialog_animation.play()
        if(this.empty_animation) this.empty_animation.play();
    }
    componentWillUpdate(){
        this.animPlay();
    }
    componentDidMount(){
        
        this.animPlay();
        AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                this.animPlay();
            } 
           if(state === 'background'){
            console.log('background');
           }
         });
        // this.props.navigator.toggleTabs({ to: 'hidden', animated: true });
    }
    getNotifyData(){
        let url = MadlenURL.NOTIFICATION_LIST
        let headers = new Headers({'authorization': this.user.usr_auth});
        fetch(url, {
            method: 'get',
            headers
        }).then((response) => response.json())
        .then((responseData) => {
            if(this.state.notify_list != responseData.ntf_list)
                this.setState({notify_list:responseData.ntf_list})
            //

        });
    }
    getReceiveLetterData(){ // Home, News Feed..
        let url = MadlenURL.LIST_RECEIVE_LETTER
        let headers = new Headers({'authorization': this.user.usr_auth});
        fetch(url, {
            method: 'get',
            headers
        }).then((response) => response.json())
        .then((responseData) => {
            // console.log(responseData)
            this.setState({letter_received:responseData.receive_letter});
            /*
            var letter_on_the_way = [];
            var letter_received = [];

            for(let i = 0 ; i < responseData.receive_letter.length;i++){
                if(Date.parse(responseData.receive_letter[i].letter_receive_date) > Date.now()){
                    letter_on_the_way.push(responseData.receive_letter[i]);
                }else{
                    if(!responseData.receive_letter[i].letter_is_read)
                        letter_received.push(responseData.receive_letter[i]);
                }
            }
            this.setState({letter_on_the_way,letter_received});
            if(this.on_the_way_animation) this.on_the_way_animation.play();
            if(this.received_animation) this.received_animation.play();
        
        */
        })
    }
    korTextOnChange(event){
        this.setState({
            korText: event.nativeEvent.text,
        });
    }
    engTextOnChange(event){
        this.setState({
            engText: event.nativeEvent.text,
        });
    }
    render() {
        const selectImage = () =>{
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image);
                this.setState({
                    selectedImage: {uri:image.path},
                    uploadImage : image
                })
                 this.props.navigator.toggleTabs({
                  to: 'hidden',
                  animated: false,
                });


            }).catch(e => {
             this.props.navigator.toggleTabs({
                  to: 'hidden',
                  animated: false,
                });
            });
            
        }
        const saveProfile = () =>{
            
            if(this.state.selectedImage.uri && this.state.korText != ''){
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
                fd.append('kor_name',this.state.korText);
                if(this.state.engText != '')fd.append('eng_name',this.state.engText);
                fetch(url, {
                  method: 'post',
                  body:fd
                }).then((response) => response.json()).then((responseData) => {

                    if(responseData.result=="SUCCESS"){      

                        this.props.dispatch(appActions.updateProfile(responseData.user));
                        this.user = this.props.dispatch(appActions.getUserData());

                        this.setState({dialogVisible:false});
                        //this.props.navigator.showModal({screen:'Madlen.FriendList', navigatorStyle: {navBarHidden:true},passProps:{user:this.user}})
                    }else{
                        console.log("fail");
                    }
                   })
                    .catch((error) => {
                      return error
                })              
            }else{

            }


        }

        const toggleDrawer = () =>{
            this.props.navigator.toggleDrawer({
              side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
              animated: true, // does the toggle have transition animation or does it happen immediately (optional)
            });
        }
        const _renderDialog = () =>{
            
            return(
                <Dialog 
                    verticalPosition='flex-start'
                    dialogStyle = {{marginTop:10}}
                    visible={this.state.dialogVisible} 
                    onTouchOutside={() => this.setState({dialogVisible: false})} >
                    <View> 
                    <Icon name='ios-checkmark' style={{fontSize:50,alignSelf:'center'}}/>
                    <Text style = {{textAlign:'center',fontSize:15,color:'#444444'}}>편지를 보내기 위해서는 보내는 사람의 이름과 사진이 필요합니다</Text>
                        <View style = {{flexDirection:'row',marginTop:28}}>
                            <TouchableOpacity onPress = {selectImage}>
                                <Thumbnail style = {{borderRadius: 0}} source = {this.state.selectedImage} />
                            </TouchableOpacity>
                            <Text style = {{fontSize:12, lineHeight: 18, marginLeft:15,alignSelf:'flex-end',color:'#a0a0a0'}}>
                                편지를 받는 이들이 {"\n"}당신의 얼굴을 알아 볼 수 있는 사진
                            </Text>           
                        </View>
                        <View style = {{marginTop:20}}>
                            <Text style = {{fontSize:12, lineHeight: 18,color:'#a0a0a0',alignSelf:'center',marginBottom:15}}>편지를 받는 이들이 당신을 아는 본래의 이름</Text>        
                            
                            <View style = {{flexDirection:'row',marginBottom:5,marginLeft:10,marginRight:10 ,alignItems:'center'}}>
                               
                                <Item>
                                    <Input style = {{height:25,fontSize:17}} onChange={this.korTextOnChange.bind(this)} placeholder='한글이름(필수)'/>
                                </Item>
                            </View>

                            <View style= {{flexDirection:'row',marginLeft:10,marginRight:10,alignItems:'center'}}>
                                <Item>
                                    <Input style = {{height:25,fontSize:17}} onChange={this.engTextOnChange.bind(this)} placeholder='영어이름(선택)'/>
                                </Item>
                            </View>
                           
                        </View>
                        <TouchableOpacity transparent style = {{borderWidth:1,borderColor:'#000000',paddingLeft:15,paddingRight:15,paddingTop:5,paddingBottom:5,marginTop:30,alignSelf:'center'}}><Text onPress = {saveProfile}>저장하기</Text></TouchableOpacity>
                    </View>
               </Dialog>
            )

        }



        const _renderHeader = () =>{
            return (
                <Header style={styles.header}>
                    <Left style = {styles.header_left_view}>
                        <Button transparent onPress = {toggleDrawer}>
                            <Icon style = {styles.black_icon} name= 'menu' />
                        </Button>
                        </Left>
                        <Body />
                        {/* <Body><Title style = {styles.header_title}>마 들 렌</Title></Body> */}
                    <Right>

                 <TouchableOpacity onPress = {showFriendList}>
                                <Icon name = "ios-send-outline"/>
                            </TouchableOpacity>
                    </Right>
                </Header>
            )
        }
/*
        const _renderLetterOnTheWay = (letters) =>{
            if(letters.length>0){

                const _rendershowOnTheWayDialog = (letter) =>{
                    var diffTime = moment(Date.parse(letter.letter_receive_date)).diff(moment());
                    var duration = moment.duration(diffTime);
            
                    const onCloseOnTheWayDialog = () =>{
    
                        this.setState({onTheWayDialogVisible: false})
                        clearTimeout(this.interval) 
                    }
                    const onShowOnTheWayDialog = () =>{
    
                        if(this.on_the_way_dialog_animation) this.on_the_way_dialog_animation.play()
    
                        this.interval = setInterval(() => {
                            diffTime = moment(Date.parse(letter.letter_receive_date)).diff(moment());
                            duration = moment.duration(diffTime);
                            this.forceUpdate();
                        }, 1000);
                        
                    }
                    return(
                        <Dialog 
                        dialogStyle = {{width:'70%', alignSelf:'center',borderRadius:5}}
                            titleStyle = {styles.on_the_way_dialog_title}
                            visible={this.state.onTheWayDialogVisible} 
                            title="Sorry!"
                            onShow = {()=> {
                                onShowOnTheWayDialog();
                            }}
                            onTouchOutside={() => {
                                
                                onCloseOnTheWayDialog();
                              
                                
                                }}>
                        <View style = {{alignSelf:'center',marginTop:25,width:150,height:80}}>
                            <LottieView
                                style = {{width:'100%',height:'100%'}}
                                ref={on_the_way_dialog_animation => {
                                        this.on_the_way_dialog_animation = on_the_way_dialog_animation;
                                    }}
                                loop={true}
                                source = {on_the_way_dialog_anim}
                            />    
                        </View>                  
                           <Text style = {{color:'#444444',marginTop:46,lineHeight: 20,fontSize:15, alignSelf:'center', textAlign:'center'}}>
                                편지가 도착하기까지 {"\n"} 발신인과 내용을 확인 할 수 {"\n"} 없습니다.
                           </Text>
                           <Text style = {{color:'#444444',marginTop:20,fontSize:15,textAlign:'center',alignSelf:'center'}}> 남은 시간 {duration.hours()}:{duration.minutes()}:{duration.seconds()}</Text>
                   </Dialog>
                   )
                    
                }
    
                const showOnTheWayDialog = () =>{
                    this.setState({onTheWayDialogVisible: true})
                }
                let diffTime = moment(Date.parse(letters[0].letter_receive_date)).diff(moment());
                let duration = moment.duration(diffTime);
                const anim = require('../../../img/anim/on_the_way_anim.json');
                return (
                    <View>
                        {_rendershowOnTheWayDialog(letters[0])}
                        <TouchableOpacity onPress = {showOnTheWayDialog} style = {{height:60, flexDirection:'row',}}>
                            <View style = {{width:70,height:60,justifyContent:'flex-start',paddingTop:3}}>
                                 <LottieView
                                 style = {{width:60,height:50,alignSelf:'center'}}
                                    ref={on_the_way_animation => {
                                      this.on_the_way_animation = on_the_way_animation;
                                    }}
                                    loop={true}
                                    source = {anim}
                                  />
                            </View>
                            <View style = {{flex:1,marginLeft:10}}>
                                <View style = {{ flexDirection:'row'}}>
                                    <Text style = {{color:'#a0a0a0',fontSize:12}}>편지가 도착하기까지</Text>
                                    <Text style = {{color:'#a0a0a0',marginLeft:'auto',fontSize:12}}>{duration.hours()}시간 {duration.minutes()}분 {duration.seconds()}초</Text>
                                    
                                </View>
                                <View style = {{marginTop:'auto'}}>
                                    <Text style = {{fontSize:15}}>{this.user.usr_name}님에게</Text>
                                    <Text style = {{fontSize:15}}> 누군가의 편지가 오고 있습니다. ({letters.length}통)</Text>
                                </View>
                            </View>
                    </TouchableOpacity>
                    </View>
                );

            }else{
                   return <View />
               }
        }
        */
        const _renderLetterReceived = (letters) =>{
            console.log(letters)
            const _rendershowOnTheWayDialog = (letter) =>{
                   
                var diffTime = moment(Date.parse(letter.letter_receive_date)).diff(moment());
                var duration = moment.duration(diffTime);
        
                const onCloseOnTheWayDialog = () =>{
                    this.setState({onTheWayDialogVisible: false})
                    clearTimeout(this.interval) 
                }
                const onShowOnTheWayDialog = () =>{

                    if(this.on_the_way_dialog_animation) this.on_the_way_dialog_animation.play()

                    this.interval = setInterval(() => {
                        diffTime = moment(Date.parse(letter.letter_receive_date)).diff(moment());
                        duration = moment.duration(diffTime);
                        this.forceUpdate();
                    }, 1000);
                    
                }
                return(
                    <Dialog 
                    dialogStyle = {{width:'70%', alignSelf:'center',borderRadius:5}}
                        titleStyle = {styles.on_the_way_dialog_title}
                        visible={this.state.onTheWayDialogVisible} 
                        title="Sorry!"
                        onShow = {()=> {
                            onShowOnTheWayDialog();
                        }}
                        onTouchOutside={() => {
                            
                            onCloseOnTheWayDialog();
                        
                            
                            }}>
                    <View style = {{alignSelf:'center',marginTop:25,width:150,height:80}}>
                        <LottieView
                            style = {{width:'100%',height:'100%'}}
                            ref={on_the_way_dialog_animation => {
                                    this.on_the_way_dialog_animation = on_the_way_dialog_animation;
                                }}
                            loop={true}
                            source = {on_the_way_dialog_anim}
                        />    
                    </View>                  
                    <Text style = {{color:'#444444',marginTop:46,lineHeight: 20,fontSize:15, alignSelf:'center', textAlign:'center'}}>
                            편지가 도착하기까지 {"\n"} 발신인과 내용을 확인 할 수 {"\n"} 없습니다.
                    </Text>
                    <Text style = {{color:'#444444',marginTop:20,fontSize:15,textAlign:'center',alignSelf:'center'}}> 남은 시간 {duration.hours()}:{duration.minutes()}:{duration.seconds()}</Text>
            </Dialog>
            )
            
        }
        const showOnTheWayDialog = () =>{
            this.setState({onTheWayDialogVisible: true})
        }
         
        const _renderReceived = (letter) => {
            const readLetter = () =>{
                this.props.navigator.showModal({screen:'Madlen.letterDetail', navigatorStyle: {navBarHidden:true},passProps:{letter_id:letters[0].letter_id}})
            }
            const cycleAnim = require('../../../img/anim/received_anim.json');
            if(this.received_animation) this.received_animation.play();
            return(
                <View>
                    <TouchableOpacity onPress = {readLetter} style = {{height:100, flexDirection:'row',}}>
                        <View style = {{paddingLeft:10,width:120,height:100,justifyContent:'flex-start',paddingTop:3}}>
                            <LottieView
                            style = {{width:120,height:100,alignSelf:'center'}}
                                ref={received_animation => {
                                    this.received_animation = received_animation;
                                }}
                                loop={true}
                                source = {cycleAnim}
                            />
                        </View>
                        <View style = {{marginLeft:10,justifyContent:'center',marginTop:30,marginLeft:30}}>
                           
                            <View style = {{}}>
                                <Text style = {{fontSize:15}}> 편지가 도착했어요.</Text>
                                <Text style = {{paddingLeft:3,marginTop:3,color:'#a0a0a0',fontSize:10,alignSelf:'center'}}>(From.{letter.letter_sender.usr_name})</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )

        }
        const _renderOnTherWay = (letter) =>{
            let diffTime = moment(Date.parse(letters[0].letter_receive_date)).diff(moment());
            let duration = moment.duration(diffTime);
            const onTheWayAnim = require('../../../img/anim/on_the_way_anim.json');
            if(this.on_the_way_animation) this.on_the_way_animation.play();
            return(
                <View>
                    {_rendershowOnTheWayDialog(letter)}
                    <TouchableOpacity onPress = {showOnTheWayDialog} style = {{height:100, flexDirection:'row',}}>
                        <View style = {{paddingLeft:10,width:100,height:100,justifyContent:'flex-start',paddingTop:3}}>
                            <LottieView
                            style = {{width:100,height:100,alignSelf:'center'}}
                                ref={on_the_way_animation => {
                                this.on_the_way_animation = on_the_way_animation;
                                }}
                                loop={true}
                                source = {onTheWayAnim}
                            />
                        </View>
                        <View style = {{flex:1,marginLeft:10,justifyContent:'center',marginTop:30,marginLeft:30}}>
                           
                            <View style = {{}}>
                                <Text style = {{fontSize:15}}> 편지가 오고 있습니다.</Text>
                                <Text style = {{paddingLeft:3,marginTop:3,color:'#a0a0a0',fontSize:10}}>(도착까지 {duration.hours()}시간 {duration.minutes()}분 {duration.seconds()}초)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        const _renderEmptyLetter = () =>{
            const emptyAnim = require('../../../img/anim/notification.json');
            if(this.empty_animation) this.empty_animation.play();
            return(
                <View style = {{height:100, flexDirection:'row',alignItems:'center',paddingTop:10,paddingLeft:20}}>
                    <View style = {{paddingLeft:10,width:60,height:60,justifyContent:'flex-start'}}>
                        <LottieView
                        style = {{width:60,height:60,alignSelf:'center'}}
                            ref={empty_animation => {
                                this.empty_animation = empty_animation;
                            }}
                            loop={true}
                            source = {emptyAnim}
                        />
                    </View>
                    <View style = {{marginLeft:10,justifyContent:'center',marginTop:7,marginLeft:30}}>
                        <View style = {{}}>
                            <Text style = {{fontSize:15}}>새로운 편지가 없습니다.</Text>
                        </View>
                    </View>
                </View>
            )
        }
                if(letters.length>0){
                
                    if(Date.parse(letters[0].letter_receive_date)<= Date.now()){
                            return (_renderReceived(letters[0]));
                    } else{
                        return (_renderOnTherWay(letters[0]))
                        
                }
            }else{
                return (_renderEmptyLetter())
            }
        }


        const _renderNotifyList = (notify_list)=>{
            const _renderNotifyItems = (notification,i) =>{
                return(
                    <TouchableHighlight underlayColor = 'transparent' activeOpacity = {1} onPress = {()=>this.props.navigator.showModal({screen:'Madlen.NotificationDetail',passProps : {notification}, navigatorStyle: {navBarHidden:true}})} key = {i} >
                        <View style = {styles.notify_item_view}>
                            <Image style = {{height:140, width:width*0.9}} source = {{uri:MadlenURL.SERVER+notification.ntf_img}}/>
                            <Text style = {styles.notification_title}>{notification.ntf_title}</Text>
                            <Text numberOfLines={2} style = {{fontSize:13, color : '#878787'}}>{notification.ntf_content}</Text>
                        </View>
                    </TouchableHighlight>
                )
            }

            return(
                <View>
                    {notify_list.map((notification,i) =>{
                        return _renderNotifyItems(notification,i) })
                    }
                </View>
                )
        }

        /*
        const updateProfileCallback = (saveFlag,updateUserData) =>{

            if(saveFlag){
                //update Redux State User
                this.props.dispatch(appActions.updateProfile(updateUserData));
                this.user = this.props.dispatch(appActions.getUserData());
                //show Friend List..
                this.props.navigator.dismissModal();
            //    this.props.navigator.showModal({screen:'Madlen.FriendList', navigatorStyle: {navBarHidden:true},passProps:{user:this.user}})

            }
        }
        */
        // const showUpdateProfile = () =>{
        //     this.setState({ dialogVisible: !this.state.dialogVisible });
        //   // this.props.navigator.showModal({screen:'Madlen.UpdateProfile', navigatorStyle: {navBarHidden:true},passProps:{user:this.user,callback:updateProfileCallback}})       
        // }
        const showFriendList = () =>{
            if(!this.user.usr_name || !this.user.usr_thumbnail){

                this.setState({ dialogVisible: true });
            }else{
                this.props.navigator.showModal({screen:'Madlen.FriendList', navigatorStyle: {navBarHidden:true},passProps:{user:this.user}})
            }
        }

        return (
            <Container style = {styles.container}>
                {_renderHeader()}
                {_renderDialog()}
                    <Content  showsVerticalScrollIndicator = {false} style = {styles.content}>
                    <Text style = {{fontSize:30,marginLeft:15, fontFamily:'NanumGothic'}}>마들렌</Text>
                    {/* {_renderLetterOnTheWay(this.state.letter_on_the_way)} */}
                    {_renderLetterReceived(this.state.letter_received)}
                        {/* {this.state.letter_on_the_way.length>0&&_renderLetterOnTheWay(this.state.letter_on_the_way)} */}
                        {/* {this.state.letter_received.length>0&&_renderLetterReceived(this.state.letter_received)} */}
                        <View style = {{padding:10}}>
                        <Image style = {{position:'absolute',top:0,height:13}} resizeMode='stretch' source = {require('../../../img/letter_line.png')}></Image>
               
                            {/* <Text style = {styles.today_title}>오늘의 글</Text> */}
                            {/* <Text style = {{marginBottom:20}}>오늘의 글은 오늘의 글이며 힐링하는 오늘의 글이다.</Text> */}
                            {_renderNotifyList(this.state.notify_list)}
                        </View>
                </Content>
            </Container>

        );
    }
}
export default connect()(Home);
