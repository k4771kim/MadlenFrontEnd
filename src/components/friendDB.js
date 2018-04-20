import Realm from 'realm';
const FriendSchema = {
    name: 'Friend',
    properties: {
        phone_number: 'string',
        name: 'string',
        thumbnail: 'string'
    }
};
const realm = new Realm({
    schema: [FriendSchema],
    schemaVersion: 1
});
const refresh = (friendList, callback) => {
    realm.write(() => {
        realm.deleteAll();
        for (let i = 0; i < friendList.length; i++) {
            let usr_thumbnail = "" //friendList[i].usr_thumbnail
            if (friendList[i].usr_thumbnail) usr_thumbnail = friendList[i].usr_thumbnail
            let friend = realm.create('Friend', {
                phone_number: friendList[i].usr_phone_number,
                name: friendList[i].usr_name,
                thumbnail: usr_thumbnail,
            });
        }
        callback({
            result: "SUCCESS"
        })
    })
}
const get = (callback) => {
    const q = realm.objects('Friend');
    callback(q);
}
exports.refresh = refresh;
exports.get = get;