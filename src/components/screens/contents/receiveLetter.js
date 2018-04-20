/*
import React, { Component } from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {List, Container,Content, Header, Left, Body, Right, Button, Icon, Title,Card,CardItem} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import * as  appActions from '../../../actions/index';
import ImageCapInset from 'react-native-image-capinsets';
import MadlenURL from '../../MadlenURL'
import LetterItem from '../item/letterItem'
import ProgressCircle from 'react-native-progress-circle'

export class ReceiveLetter extends Component {

constructor(props) {
  super(props);

  this.state = {
    receive_letter : []
  }; 
  const {dispatch} = this.props;
  this.user = dispatch(appActions.getUserData());
 this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
}

    onNavigatorEvent(event) {
        switch(event.id) {
            case 'willAppear':
                break;
            case 'didAppear':
                this.getReceiveLetterData();
                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                break;
        }

    }
    getReceiveLetterData(){
            let url = MadlenURL.LIST_RECEIVE_LETTER
            let headers = new Headers({'authorization': this.user.usr_auth});
            fetch(url, {
                method: 'get',
                headers
            }).then((response) => response.json())
            .then((responseData) => {
                this.setState({receive_letter : responseData.receive_letter})
            })

    }
  render() {
    const toggleDrawer = () =>{
        this.props.navigator.toggleDrawer({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        });

    }

     const _renderLetter = (letter,i) =>{

        if(Date.parse(letter.letter_receive_date) > Date.now()){
            let per = 100 -(Date.parse(letter.letter_receive_date) - Date.now()) / (24 * 60 * 60 * 10) ;

            return (

                <ProgressCircle
                    percent={per}
                    key = {i}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
            >
  <Text>{per}</Text>
        </ProgressCircle>
                )
        }else{
            return (
             
               <LetterItem key = {i}
                                receive
                                detail
                                letter = {letter}
                                navigator = {this.props.navigator}/>
            )            
        }
    }


    const _renderLetterList = (letters) =>{
        if(letters.length == 0){
            return (
                <View style = {{flex:1,alignItems:'center',marginTop:100}}>
                    <Text style = {{marginBottom:10}}>새로 도착한 편지가 없습니다.</Text>
                    <Text style = {{color:'#909090',textAlign:'center' }}>나처럼 오랫동안 외지에서 생활하는 애들은 {"\n"}항상 부모님께 좋은 소식만 알리는 버릇이 있었다.
                    {"\n"}{"\n"} 슝둔 - 스물아홉 나는, 유쾌하게 죽기로 했다 </Text>
                </View>
            )            
        }else{
            return (
                <View style = {{alignSelf:'center'}}>
                    {letters.map((letter,i) =>{
                        return _renderLetter(letter,i);
                    })}
                </View>
            )
        }
    }
    return (
      <Container>
        <Header style={styles.header}>
          <Left style = {styles.header_left_view}>
            <Button transparent onPress = {toggleDrawer}>
              <Icon style = {{color:'black'}} name= 'menu' />
            </Button>
         </Left>
         <Body>
           <Title>도착한 편지</Title>
           </Body>
           <Right />
        </Header>
        <Content>
        <Card style = {styles.header}>
                {_renderLetterList(this.state.receive_letter)}
        </Card>
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
    elevation:0,padding:0,margin:0,borderWidth:0,borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0
  },
  header_left_view : {padding:0,margin:0,flexDirection:'row',alignItems:'center'},
  header_right_text:{backgroundColor: '#ffffff', paddingLeft:10,paddingRight:20,position:'absolute',right:-10, fontSize:12, color:'#404040',}

});

export default connect()(ReceiveLetter);

*/