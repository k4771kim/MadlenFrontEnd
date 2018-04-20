import { Navigation } from 'react-native-navigation';
import Login from './login/login';
import Home from './contents/home';
import PreciousLetter from './contents/preciousLetter';
import ReadLetter from './contents/readLetter';
import PrepareLetter from './contents/prepareLetter';
import ReceiveLetter from './contents/receiveLetter';
import SendLetter from './contents/sendLetter';
import FriendList from './letter/friendList';
import WriteLetter from './letter/writeLetter';
import LetterDetail from './letter/letterDetail';
import inputAuthKey from './login/inputAuthKey';
import FirstScreen from './login/firstScreen';
import updateProfile from './letter/updateProfile';
import SelectLetterDesign from './letter/selectLetterDesign'
import NotificationDetail from './letter/notificationDetail'
import Settings from './contents/settings';
import Drawer from './drawer/drawer';

const ComponentList = [
    {screen : 'Madlen.Login',obj :Login},
    {screen : 'Madlen.Home',obj :Home},
    {screen : 'Madlen.Drawer',obj :Drawer},
    {screen : 'Madlen.PreciousLetter',obj:PreciousLetter},
    {screen : 'Madlen.ReadLetter',obj :ReadLetter},
    {screen : 'Madlen.PrepareLetter',obj:PrepareLetter},
    {screen : 'Madlen.ReceiveLetter',obj :ReceiveLetter},
    {screen : 'Madlen.SendLetter',obj :SendLetter},
    {screen : 'Madlen.FriendList',obj :FriendList},
    {screen : 'Madlen.WriteLetter',obj :WriteLetter},
    {screen : 'Madlen.inputAuthKey',obj :inputAuthKey},
    {screen : 'Madlen.FirstScreen',obj :FirstScreen},
    {screen : 'Madlen.UpdateProfile',obj :updateProfile},
    {screen : 'Madlen.letterDetail',obj :LetterDetail},
    {screen : 'Madlen.selectLetterDesign', obj : SelectLetterDesign},
    {screen : 'Madlen.NotificationDetail', obj : NotificationDetail},
    {screen : 'Madlen.Settings', obj : Settings},
]
export default (store, Provider) =>  {
    for(let i = 0 ; i < ComponentList.length;i++){
        Navigation.registerComponent(ComponentList[i].screen, () => ComponentList[i].obj, store, Provider);
    }
}