import React, { Component } from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import MadlenURL from '../../MadlenURL'
import styles from '../../MadlenStyle'

import * as  appActions from '../../../actions/index';

export  class SelectLetterDesign extends Component {

constructor(props) {
  super(props);

  this.state = {letter_design_list : []
  };
   const {dispatch} = this.props;
    this.user = dispatch(appActions.getUserData());
    this.getLetterDesignList();
}
    getLetterDesignList(){
            let url = MadlenURL.LETTER_DESIGN_LIST
            console.log(url)
            let headers = new Headers({'authorization': this.user.usr_auth});
            fetch(url, {
                method: 'get',
                headers
            }).then((response) => response.json())
            .then((responseData) => {
                this.setState({letter_design_list : responseData.letter_design})
            })
    }

  render() {
        const _renderLetterDesignList = (designs)=>{
            const onPressItem = (design) =>{
                this.props.callback(true,design)
            }
            return designs.map((design,i) =>{
                return ( 
                    <TouchableOpacity onPress = {()=>onPressItem(design)} key = {i} style ={{marginRight:7,alignItems:'center'}}>
                        <Thumbnail 
                        style = {{borderRadius:5, height: 150, width: 100}} resizeMode = 'stretch' square source={{ uri: MadlenURL.SERVER+design.ld_image }} />
                        <Text style = {styles.select_ld_name} >{design.ld_title}</Text>
                    </TouchableOpacity>
                 )
            })
    }

    return (
      <Container style = {{backgroundColor:'white'}}>
        <Header style={styles.header}>
          <Left style = {styles.header_left_view}>
            <TouchableOpacity style = {{flexDirection:'row',alignItems:'center'}} onPress = {()=>this.props.navigator.dismissModal()}>
                <Icon name = {'ios-arrow-back'} />
            </TouchableOpacity>
         </Left>
         <Body>
            <Title>편지지 선택</Title>
         </Body>
         <Right />
        </Header>
        <View>
            <Text style = {styles.select_ld_title}>새 편지지</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style = {{marginTop : 30,marginBottom:10, marginLeft:22}} >
                {_renderLetterDesignList(this.state.letter_design_list)}
            </ScrollView>
        </View>
      </Container>

    );
  }
}


export default connect()(SelectLetterDesign);