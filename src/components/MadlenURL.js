let MADLEN_SERVER = 'http://localhost:3000' // Insert MADLEN Backend Server Address
export default {
    SERVER : MADLEN_SERVER,
    SEND_LETTER : MADLEN_SERVER + '/letter/send',
    LIST_SEND_LETTER : MADLEN_SERVER + '/letter/list/send',
    LIST_RECEIVE_LETTER : MADLEN_SERVER + '/letter/list/receive',
    LIST_READ_LETTER : MADLEN_SERVER + '/letter/list/read',
    LIST_TEMP_LETTER : MADLEN_SERVER + '/letter/list/temp',
    LOGIN : MADLEN_SERVER + '/users/login',
    AUTO_LOGIN : MADLEN_SERVER + '/users/auto_login',
    AUTH_BY_SMS : MADLEN_SERVER + '/users/auth_by_sms',
    INPUT_AUTH_KEY : MADLEN_SERVER + '/users/input_auth_key',
    GET_FRIEND_LIST : MADLEN_SERVER + '/users/get_friend_list',
    UPDATE_PROFILE : MADLEN_SERVER + '/users/profile_upload',
    LETTER_DESIGN_LIST : MADLEN_SERVER + '/letter/letter_design/list',
    LETTER_DETAIL : MADLEN_SERVER + '/letter/detail/',
    NOTIFICATION_LIST : MADLEN_SERVER + '/letter/list/notification/',
    SET_PRECIOUS_LETTER : MADLEN_SERVER + '/letter/precious',
    LIST_PRECIOUS_LETTER : MADLEN_SERVER + '/letter/list/precious',
    GET_USER_PROFILE : MADLEN_SERVER + '/users/profile/',
    DELETE_LETTER : MADLEN_SERVER + '/letter/delete',
    HISTORY_LIST : MADLEN_SERVER + '/users/history'
}