import React, { Component } from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card} from 'native-base';
import {connect} from 'react-redux';
import Hr from "react-native-hr-plus";
import * as  appActions from '../../../actions/index';
import MadlenURL from '../../MadlenURL'
import LetterItem from '../item/letterItem'
import styles from '../../MadlenStyle'
export class PreciousLetter extends Component {

constructor(props) {
    super(props);

    this.state = {
       precious_letter : []
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
                this.getPreciousLetterData();
                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                break;
        }

    }
    getPreciousLetterData(){
            let url = MadlenURL.LIST_PRECIOUS_LETTER
            let headers = new Headers({'authorization': this.user.usr_auth});
            fetch(url, {
                method: 'get',
                headers
            }).then((response) => response.json())
            .then((responseData) => {
                this.setState({precious_letter : responseData.precious_letter})
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

            return (
             
               <LetterItem key = {i}
                                read
                                detail
                                letter = {letter}
                                preciousCallback = {()=>this.getPreciousLetterData()}
                                navigator = {this.props.navigator}/>
            )            
        }

       const showFriendList = () =>{
            if(!this.user.usr_name || !this.user.usr_thumbnail){

                this.setState({ dialogVisible: true });
            }else{
                this.props.navigator.showModal({screen:'Madlen.FriendList', navigatorStyle: {navBarHidden:true},passProps:{user:this.user}})
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
           <Title>소중한 편지</Title>
           </Body>
           <Right>
            <TouchableOpacity onPress = {showFriendList}>
                                <Icon name = "ios-send-outline"/>
                            </TouchableOpacity>

           </Right>
       </Header>
        <Content>
        <Card style = {styles.header}>
                {_renderLetterList(this.state.precious_letter)}
        </Card>
        </Content>
      </Container>

    );
  }
}

export default connect()(PreciousLetter);