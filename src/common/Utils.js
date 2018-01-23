import {Platform} from 'react-native';
export const APP_AUTHEN_SERVER = "http://125.212.226.54:21380/vlock/rest/vityportal/app_authen";
export const USER_ACTION_SERVER = "http://125.212.226.54:21380/vlock/rest/vityportal/user_action";
export const PRODUCT_CODE = "VLOCK";
// export const MODAL = {
//     MODAL_NETWORK: "MODAL_NETWORK",
//     MODAL_BLUETOOTH: "MODAL_BLUETOOTH",
//     MODAL_
// }
export const appId = Platform.select({
    ios: "1:1033751381614:ios:fa890c48570e769a",
    android: "1:1033751381614:android:8fa798c3d3eca09d"
})
export function getClientId(){
    const device = require("react-native-device-info");
    return device.getUniqueID();
}
