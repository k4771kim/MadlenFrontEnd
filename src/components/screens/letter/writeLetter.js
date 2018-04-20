import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,TextInput,Keyboard,Animated,Image,ScrollView,TouchableWithoutFeedback} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import PropTypes from 'prop-types';
import { Container, Content,Header, Left, Body, Right, Button, Icon, Title,Thumbnail,getTheme,StyleProvider} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import * as  appActions from '../../../actions/index';
import PopupDialog ,{DialogButton,ScaleAnimation,DialogTitle} from 'react-native-popup-dialog';
import Drawer ,{d} from '../drawer/drawer'
import ImageCapInset from 'react-native-image-capinsets';
import MadlenURL from '../../MadlenURL'
import { Popover, PopoverContainer } from 'react-native-simple-popover';
const scaleAnimation = new ScaleAnimation();
import Picker from 'react-native-picker';
import styles from '../../MadlenStyle'
export class WriteLetter extends Component {

constructor(props) {
    super(props);
    const default_letter_design = {ld_id:1, ld_title:"Letter_Design_01", ld_image : "/images/letter_design/letter01.png"};
    const default_letter_design_uri = {uri:MadlenURL.SERVER+'/images/letter_design/letter01.png'}
    this.state = {
        textInputBottom : new Animated.Value(50),
        toolsBottom : new Animated.Value(0),
        text : "",
        second_tool_visible : false,
        third_tool_visible : false,
        font_color_tool_visible : false,
        font_tool_visible:false,
        text_align : 'left',
        letter_design : default_letter_design,
        letter_design_uri:default_letter_design_uri,
        font:'NanumBarunGothic',
        font_color:'black',
        tools_visible:false,
    }
    this._keyboardWillShow=this._keyboardWillShow.bind(this)
    this._keyboardWillHide=this._keyboardWillHide.bind(this)
    const {dispatch} = this.props;
    this.user = dispatch(appActions.getUserData());
}
    textOnChange(event){
        this.setState({
            text: event.nativeEvent.text,
        });
    }
  _keyboardWillShow (e) {
    this.setState({
        tools_visible:true,    
        second_tool_visible : false,
        third_tool_visible : false,
        font_color_tool_visible : false,
        font_tool_visible:false,
    });
    Animated.timing(                           
        this.state.textInputBottom,                 
        { toValue:e.endCoordinates.height+50,duration:e.duration}
    ).start();
    Animated.timing(                           
        this.state.toolsBottom,                 
        { toValue:e.endCoordinates.height,duration:e.duration}
    ).start();
  }
    _keyboardWillHide (e) {
        this.setState({ 
            // tools_visible:false,
            second_tool_visible : false,
            third_tool_visible : false,
            font_color_tool_visible : false,
            font_tool_visible:false ,
            textInputBottom:new Animated.Value(0),
            toolsBottom:new Animated.Value(0)
        });
    }
    componentDidMount(){
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
        if(this.props.temp_letter){
            if(this.props.temp_letter.letter_ld) this.state.letter_design_uri = {uri:MadlenURL.SERVER+this.props.temp_letter.letter_ld.ld_image};
            this.setState({
                text:this.props.temp_letter.letter_content,
                letter_design:this.props.temp_letter.letter_ld,
                // font_size : this.props.temp_letter.letter_font_size,
                text_align:this.props.temp_letter.letter_align,
                font:this.props.temp_letter.letter_font ,
                font_color : this.props.temp_letter.letter_font_color
            })
        }
    }
    componentWillUnmount(){
        if(this.keyboardWillShowListener) this.keyboardWillShowListener.remove();
        if(this.keyboardWillHideListener) this.keyboardWillHideListener.remove();
        Picker.hide();
    }
    render() {
        const onPressSendLetter = (isSend)=>{
            let url = MadlenURL.SEND_LETTER;
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','authorization': this.user.usr_auth});
            var details = {
                'receiver_phone_number' : this.props.phone_number,
                receiver_name : this.props.name,
                'is_send' : isSend,
                'content' : this.state.text,
                font : this.state.font,
                font_color : this.state.font_color,
                align : this.state.text_align,
                ld_id : 1
            };
            if(this.state.letter_design) if(this.state.letter_design.ld_id) details.ld_id= this.state.letter_design.ld_id
            if(this.props.temp_letter) details.letter_id = this.props.temp_letter.letter_id
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
                this.props.dispatch(appActions.refreshHistory(this.user));
                this.props.navigator.dismissModal()
            })
        }
        const _renderTools = () => {
            const _renderSecondTool = () =>{
                const selectAlign = (align) =>{
                    this.setState({text_align:align,second_tool_visible:false})
                }
                return (
                        <Popover
                            placement='top'
                            arrowColor="#f0f0f0"
                            arrowWidth={0}
                            arrowHeight={0}
                            isVisible={this.state.second_tool_visible}
                            component={() => (
                                <View style = {{backgroundColor: '#ffffff',width:width}}>
                                    <StyleProvider style={getTheme({iconFamily: "MaterialIcons"})}>
                                        <View style = {{flexDirection:'row',paddingLeft:10}}>
                                            <Button style = {{flex:1}} transparent onPress = {()=>selectAlign('left')}>
                                                <Icon name = 'format-align-left' style={[styles.popoverText,this.state.text_align == 'left' ? styles.selected_text:styles.unselected_text]}/>
                                            </Button>
                                            <Button style = {{flex:1}} transparent onPress = {()=>selectAlign('center')}>
                                                <Icon name = 'format-align-center' style={[styles.popoverText,this.state.text_align == 'center' ? styles.selected_text:styles.unselected_text]}/>
                                            </Button>
                                            <Button style = {{flex:1}} transparent onPress = {()=>{selectAlign('right')}}>
                                                <Icon name = 'format-align-right' style={[styles.popoverText,this.state.text_align == 'right' ? styles.selected_text:styles.unselected_text]}/>
                                            </Button>
                                            <View  style = {{flex:1}} />
                                        </View>
                                    </StyleProvider>
                                </View>
                            )}>
                            <StyleProvider style={getTheme({iconFamily: "MaterialIcons"})}> 
                                <Button  style = {{flex:1,justifyContent:'center'}} transparent onPress = {()=>{
                                    this.state.third_tool_visible = false;
                                    this.state.font_color_tool_visible = false;
                                    this.state.font_tool_visible = false;
                                    ;this.setState({second_tool_visible:!this.state.second_tool_visible})}}>
                                <Icon style = {{color:this.state.second_tool_visible?'#fead00':'#000000' }} 
                                        name= {this.state.text_align=='left' && "format-align-left" || this.state.text_align=='right' && "format-align-right"|| this.state.text_align=='center' && "format-align-center"}/>
                                </Button>
                            </StyleProvider>
                        </Popover>
                )
            }
            const _renderFontTool = () =>{
                const showSelectFont = () =>{
                    this.state.second_tool_visible = false;
                    this.state.third_tool_visible = false;
                    this.state.font_color_tool_visible = false;
                    this.setState({font_tool_visible:!this.state.font_tool_visible})
                }
                const fontList = [
                    'NanumBarunGothic',
                    'NanumBarunpen',
                    'NanumMyeongjo',
                    'NanumBrush',
                    'NanumPen',
                    'NanumSquare',
                    'SDMiSaeng',
                    'BMYEONSUNG',                        
                    'godoMaum',
                ]
                return (
                        <Popover
                            placement='top'
                            arrowColor="#f0f0f0"
                            arrowWidth={0}
                            arrowHeight={0}
                            isVisible={this.state.font_tool_visible}
                            component={() => (
                                <View style = {{backgroundColor: '#ffffff',width:width}}> 
                                    <ScrollView horizontal style = {{paddingLeft:10,flexDirection:'row'}}>
                                        {
                                            fontList.map((font,i) =>{
                                                return (
                                                    <Button onPress = {()=>this.setState({font,font_tool_visible:false})} key = {i} style = {{flex:1,justifyContent:'center'}} transparent>
                                                        <Text style = {{marginLeft:10,marginRight:10, fontSize:20,fontFamily: font}}>마들렌</Text>
                                                    </Button>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )}>
                           <Button style = {{flex:1,justifyContent:'center'}} transparent onPress = {showSelectFont}>
                                <Text style = {{fontSize:20,fontFamily: this.state.font}}>가</Text>
                            </Button>
                       </Popover>
                )
            }
            const _renderFontColorTool = () =>{
                const showSelectFontColor = () =>{
                    this.state.second_tool_visible = false;
                    this.state.third_tool_visible = false;
                    this.state.font_tool_visible = false;
                    this.setState({font_color_tool_visible:!this.state.font_color_tool_visible})
                }
                const colorList = ['red','blue','orange','cyan','white','black']
                return (
                    <Popover
                    placement='top'
                    arrowColor="#f0f0f0"
                    arrowWidth={0}
                    arrowHeight={0}
                    isVisible={this.state.font_color_tool_visible}
                    component={() => (
                        <View style = {{backgroundColor: '#ffffff',width:width}}>
                            <View style = {{flexDirection:'row',paddingLeft:10}}>
                                {colorList.map((color,i) =>{
                                    return (
                                        <Button onPress = {()=>this.setState({font_color:color,font_color_tool_visible:false})} key = {i} style = {{flex:1}} transparent>
                                            <Icon style = {{color: color == 'white' ? 'black':color }} name = {color == 'white' ? 'ios-square-outline':'ios-square'}/>
                                        </Button>
                                    )
                                })}
                            </View>
                        </View>
                    )}>
                        <Button style = {{flex:1,justifyContent:'center'}} transparent onPress = {showSelectFontColor}>
                            <Icon style = {{color: this.state.color == 'white' ? 'black':this.state.font_color }} name = {this.state.color == 'white' ? 'ios-square-outline':'ios-square'} />
                        </Button>
                    </Popover>
                )
            }
            const showLetterDesign = () =>{
                //Show LetterDesign
                const selectLetterDesign = (result,design) =>{
                    if(result){
                        this.props.navigator.dismissModal();
                        console.log(design)
                        this.setState({letter_design: design , letter_design_uri : {uri:MadlenURL.SERVER+design.ld_image}})                        
                    }


                }
                this.props.navigator.showModal({screen:'Madlen.selectLetterDesign', navigatorStyle: {navBarHidden:true},passProps:{callback:selectLetterDesign}})      
            }

            return (
                <Animated.View ref = 'ka' style={{position:'absolute',bottom:this.state.toolsBottom}}> 
                    <View style = {{flexDirection:'row', backgroundColor: '#ffffff' , height:50,width:width,marginTop:10, alignItems:'center'}}>
                        <Button style = {{flex:1,justifyContent:'center'}} transparent onPress = {showLetterDesign}>
                            <Icon style = {{color:'black'}} name = 'ios-browsers-outline' />
                        </Button>
                        {_renderSecondTool()}
                        {_renderFontTool()}
                        {_renderFontColorTool()}
                        <Button style = {{flex:1,justifyContent:'center'}} transparent onPress = {()=>{onPressSendLetter(false)}}>
                            <Text>임시저장</Text>
                        </Button>
                    </View>
                </Animated.View>
            )
        }
        const _renderDialog = () =>{
            return (
                <PopupDialog
                    dialogAnimation={scaleAnimation}
                    dialogStyle = {{padding:0,backgroundColor: 'transparent',alignSelf:'center'}}
                    width={0.65}
                    height={0.4}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}        
                    actions={[
                        <View key = {0} style = {{alignSelf:'center', flexDirection:'row',marginTop:30}}>
                            <TouchableOpacity
                              text="예"
                              style = {[styles.send_dialog_button,{marginRight:10}]}
                              onPress={()=>{onPressSendLetter(true)}}
                              key="send"
                            >
                                <Text style = {{fontSize:16, color:'#444444'}}>예</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                text="아니오"
                                style = {{borderColor:'#444444' ,justifyContent:'center',alignItems:'center',width:66,borderWidth: 1,padding:2,paddingLeft:10,paddingRight:10}}
                                onPress={() => {
                                    this.popupDialog.dismiss();
                                }}
                                key="cancel"
                            >
                                <Text style = {{fontSize:16, color:'#444444'}}>아니오</Text>
                            </TouchableOpacity>
                        </View>
                    ]}
                >
                    <ImageCapInset
                        style = {{position : 'absolute', width:'100%',height:'100%'}}
                        source={require('../../../img/mail_dialog.png')}
                    />
                    <View style = {{paddingTop:13, paddingLeft:15, paddingRight:15}}>
                        <Text style = {{textAlign:'center', marginBottom : 15,fontSize:16, color:'#444444'}}>To. {this.props.name}</Text>
                        <Text style = {{textAlign:'center',fontSize:16, color:'#444444'}}>{this.props.name} 님에게 {"\n"}이 편지를 보냅니다</Text>
                    </View>
                </PopupDialog>
        )
    }
    return (
        <PopoverContainer >
            {_renderDialog()}
            <Image source = {this.state.letter_design_uri} style = {{position:'absolute',width:'100%',height:'100%'}} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header style={[styles.header,{backgroundColor: 'transparent'}]}>
                        <Left>
                            <Button transparent onPress = {()=>this.props.navigator.dismissModal()}>
                                <Icon style = {{color:'black'}} name='ios-arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>To. {this.props.name}</Title>
                        </Body>
                        <Right>    
                        <Button  transparent
                        onPress={() => {this.popupDialog.show();}}>
                                <Icon style = {{color:'black' ,fontSize:50}} name = 'ios-checkmark' />
                            </Button>
                        </Right>
                    </Header>
                    <Animated.View style={{margin:10,flex:1,marginBottom:this.state.textInputBottom}}>
                        <TextInput 
                            maxLength = {500}
                            value={this.state.text} onChange={this.textOnChange.bind(this)} multiline={true} style = {{textAlign:this.state.text_align,flex:1,borderWidth:0,borderColor:'#808080',padding:10, color :this.state.font_color, fontFamily: this.state.font}}/>
                    </Animated.View>
                    {_renderTools()}
                </Container>
            </TouchableWithoutFeedback>
      </PopoverContainer>
    );
  }
}
export default connect()(WriteLetter);