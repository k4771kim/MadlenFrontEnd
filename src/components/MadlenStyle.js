import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0
    },
    content: {
        flex: 1,
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    header: {
        backgroundColor: '#ffffff',
        shadowRadius: 0,
        shadowOffset: {
            height: 0
        },
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        elevation: 0,
        padding: 0,
        margin: 0,
    },
    header_left_view: {
        padding: 0,
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    list_item_body: {
        backgroundColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {
            height: 0
        },
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
        padding: 0,
        margin: 0,
    },
    notify_item_view: {
        // borderTopWidth:0.5 ,
        marginBottom: 10,
        paddingTop: 10,
        borderColor: '#d0d0d0',
        borderRadius: 20
    },
    popoverText: {
        color: '#303030',
    },
    selected_text: {
        color: '#fead00'
    },
    unselected_text: {
        color: '#000000'
    },
    send_dialog_button: {
        borderColor: '#444444',
        justifyContent: 'center',
        alignItems: 'center',
        width: 66,
        borderWidth: 1,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10
    },
    //text
    notification_detail_content: {
        alignSelf: 'center',
        marginTop: 12,
        color: '#686868',
        fontSize: 13,
        paddingLeft: 100,
        paddingRight: 100,
        fontFamily: 'NanumBarunGothic',
        lineHeight: 19
    },
    notification_detail_title: {
        alignSelf: 'center',
        marginTop: 25,
        fontSize: 19,
        fontFamily: 'NanumBarunGothic',
        color: '#686868'
    },
    header_title: {
        fontFamily: 'NanumBarunGothic',
    },
    drawer_menu_title: {
        fontFamily: 'NanumBarunGothic',
        fontSize: 16
    },
    today_title: {
        fontFamily: 'NanumBarunGothic',
        fontSize: 24,
        marginBottom: 5
    },
    notification_title: {
        marginTop: 15,
        marginBottom: 6,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#303030',
        fontFamily: 'NanumBarunGothic'
    },
    letter_item_title: {
        fontSize: 19
    },
    on_the_way_dialog_title: {
        fontFamily: 'NanumBarunGothic',
        fontSize: 26,
        color: '#d12d30',
        textDecorationLine: 'underline'
    },
    select_ld_name: {
        width: 100,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
        color: '#444444',
        fontFamily: 'NanumBarunGothic'
    },
    select_ld_title: {
        fontFamily: 'NanumBarunGothic',
        marginTop: 25,
        marginLeft: 22,
        fontSize: 18,
        color: '#444444'
    },
    //icons
    black_icon: {
        color: 'black'
    },
    drawer_menu_icon: {
        fontSize: 20
    },

});