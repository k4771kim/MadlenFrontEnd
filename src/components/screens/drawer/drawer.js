import React from 'react';
import {StyleSheet, View,TouchableOpacity,Image} from 'react-native';
import { Container, Header, Button,Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import MadlenURL from '../../MadlenURL'
import moment from 'moment'
import {connect} from 'react-redux';
import * as  appActions from '../../../actions/index';
import styles from '../../MadlenStyle'
export class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.user = this.props.dispatch(appActions.getUserData());
        this.state = {index: 0,history_list:[]};
    }
    componentWillMount(){
        this.setHistory();
    }
    
    async setHistory(){
        console.log("HI");
        const refreshHistory = async () =>{
            return await this.props.dispatch(appActions.refreshHistory(this.user));
         }
         
         const getHistory = async() =>{
            return await this.props.dispatch(appActions.getHistory());
         }
         await refreshHistory();
         this.history = await getHistory();
    }
    /*
    getHistoryData(){
        let url = MadlenURL.HISTORY_LIST
        let headers = new Headers({'authorization': this.user.usr_auth});
        fetch(url, {
            method: 'get',
            headers
        }).then((response) => response.json())
        .then((responseData) => {
            // console.log(responseData.histories)
            this.setState({history_list : responseData.histories})
        })
    }
*/
  render() {


    const _renderDrawerListItem = (icon_off,icon_on,title,index) =>{
        let icon,color;

        if(this.state.index==index) {
            color = '#f2b613'; 
            icon = icon_on;
        }else {
            color = '#909090';
            icon = icon_off;
        }
        return (
            <ListItem style = {{marginBottom:0}} onPress = {()=>onPress(index)} icon>
              <Left>
              <Image style = {{width:20,height:20}} resizeMode = 'stretch' source = {icon}/>
              </Left>
              <Body style = {styles.list_item_body}>
                <Text style = {[{color},styles.drawer_menu_title]}>{title}</Text>
              </Body>
            </ListItem>
            )
    }
    const onPress = (index)=>{
        this.props.navigator.switchToTab({
          tabIndex: index
        });
        this.setState({index});
        this.props.navigator.toggleDrawer({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        });
    }
    const _renderHistoryList = (histories) =>{
        return histories.map((history,i)=>{
            return(
                <View key = {i} style = {{marginBottom:6}}>
                    <Text style = {{fontSize:11,color:'#444444'}}>{history.message}</Text>
                    <Text style = {{fontSize:9,color:'#444444',marginLeft:2,}}>{moment(history.date).format('YYYY.MM.DD.hh.mm')}</Text>
                </View>
                )
        })
    }
    const onClickSettings = () =>{
        this.props.navigator.showModal({screen:'Madlen.Settings', navigatorStyle: {navBarHidden:true}})
    }
    return (
         <Container style = {{backgroundColor:'white'}}>
            <View>
                <List style = {{marginTop:65,padding:10}}>
                     {_renderDrawerListItem(require('../../../img/drawer_icon/h_off.png'),require('../../../img/drawer_icon/h_on.png'),'마들렌홈',0)}
                     {_renderDrawerListItem(require('../../../img/drawer_icon/to_off.png'),require('../../../img/drawer_icon/to_on.png'),'보낸 편지',1)}
                     {_renderDrawerListItem(require('../../../img/drawer_icon/from_off.png'),require('../../../img/drawer_icon/from_on.png'),'받은 편지',2)}
                     {/* {_renderDrawerListItem(require('../../../img/drawer_icon/like_off.png'),require('../../../img/drawer_icon/like_on.png'),'소중한 편지',3)} */}
                     {_renderDrawerListItem(require('../../../img/drawer_icon/l_off.png'),require('../../../img/drawer_icon/l_on.png'),'쓰다만 편지',4)}
                </List>
            </View>

            <View style = {{padding:20,marginTop:0,marginBottom:20}}>
                {_renderHistoryList(this.props.history_list)}
                {console.log(this.props.history_list)}
            </View>
            <View style = {{flexDirection:'row',marginLeft:30,marginRight:30,marginBottom:25,marginTop:'auto'}}>                
                <View style = {{flexDirection:'row',marginLeft:'auto'}}>
                {/*<TouchableOpacity style = {{justifyContent:'center',marginRight:30}}><Icon style = {[{color:'#909090'},styles.drawer_menu_icon]} name = 'ios-search'/></TouchableOpacity>*/}
                    <TouchableOpacity onPress = {onClickSettings}style = {{justifyContent:'flex-end'}}><Icon style = {[{color:'#909090'},styles.drawer_menu_icon]} name = 'settings'/></TouchableOpacity>
                </View>
            </View>
      </Container>
    );
  }
}
// export function refreshHistory(){
//     this.getHistoryData
// }
let mapStateToProps = (state) => {
    return {
        history_list: state.history.history_list
    };
}
export default connect(mapStateToProps)(Drawer,);

