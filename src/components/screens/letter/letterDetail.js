import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity,ScrollView,Image} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import * as  appActions from '../../../actions/index';
import MadlenURL from '../../MadlenURL'
import ImageCapInset from 'react-native-image-capinsets';
import styles from '../../MadlenStyle'
import moment from 'moment'
export  class LetterDetail extends Component {

constructor(props) {
  super(props);

  this.state = {
    letter:{letter_sender :{}}
  };

  const {dispatch} = this.props;
  this.user = dispatch(appActions.getUserData());

}
    componentDidMount(){
        this.getLetterDetail();
    }
    getLetterDetail(){
            let url = MadlenURL.LETTER_DETAIL + this.props.letter_id
            console.log(url)
            let headers = new Headers({'authorization': this.user.usr_auth});
            fetch(url, {
                method: 'get',
                headers
            }).then((response) => response.json())
            .then((responseData) => {
                this.setState({letter : responseData.letter})
            })
    }

    render() {
        const _renderLetterContent = () =>{
            return (
                <View style = {[styles.content,{marginTop:10,padding:10}]}>
                   
                    <ScrollView showsVerticalScrollIndicator = {false} style = {{width:'100%',padding:10}}>
                        <Text multiline 
                        style = {{
                            marginBottom:10,
                            fontFamily: this.state.letter.letter_font,
                            color:this.state.letter.letter_font_color,
                            textAlign:this.state.letter.letter_align
                        }}>
                            {this.state.letter.letter_content}
                        </Text>
                    </ScrollView>
                    <View style = {{alignItems:'flex-end',marginBottom:12,marginRight:10}}>
                        <Text style = {{fontFamily: this.state.letter.letter_font,color:this.state.letter.letter_font_color}}>From. {this.state.letter.letter_sender.usr_name}</Text>
                       <Text style = {{fontFamily: this.state.letter.letter_font,color:this.state.letter.letter_font_color,fontSize:14,justifyContent:'flex-end'}}>{moment(this.state.letter.letter_send_date).format("YYYY.MM.DD A")}</Text>
                       </View>
                </View>
            )
        }
      const _renderHeader = () =>{
            return(
                <Header style={[styles.header,{backgroundColor: 'transparent'}]}>
                <Left>
                     <TouchableOpacity style = {{flexDirection:'row',alignItems:'center'}} onPress = {()=>this.props.navigator.dismissModal()}>
                        <Icon name = {'ios-arrow-back'} />
                        <Text style = {{marginLeft:5}}>닫기</Text>
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Title></Title>
                </Body>
                <Right />
            </Header>
        )
        }
    return (
        <Container>

            {this.state.letter.letter_ld &&
                <Image source = {{uri:MadlenURL.SERVER+this.state.letter.letter_ld.ld_image}} style = {{position:'absolute',width:'100%',height:'100%'}} />
            }

            {_renderHeader()}

            {_renderLetterContent()}
        </Container>

    );
  }
}

export default connect()(LetterDetail);