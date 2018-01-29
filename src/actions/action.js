/*
 * action types
 */
export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";
export const UPDATE_PERIPHERALS = "UPDATE_PERIPHERALS";
export const UPDATE_PERIPHERALID = "UPDATE_PERIPHERAL";
export const UPDATE_PERSIONAL = "UPDATE_PERSIONAL";
export const UPDATE_CONNECT_DEVICE = "UPDATE_CONNECT_DEVICE";
export const UPDATE_PINRFID = "UPDATE_PINRFID";
export const UPDATE_PINBLACKBOX = "UPDATE_PINBLACKBOX";
export const UPDATE_LISTKEYRFID = "UPDATE_LISTKEYRFID";
export const UPDATE_INSTANCEID = "UPDATE_INSTANCEID";
export const UPDATE_LOGIN = "UPDATE_LOGIN";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_OIL = "UPDATE_OIL";
export const UPDATE_BRAKE = "UPDATE_BRAKE";
export const UPDATE_TIRE = "UPDATE_TIRE";
export const UPDATE_ACQUY = "UPDATE_ACQUY";
export const UPDATE_ALL = "UPDATE_ALL";
export const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION";
export const UPDATE_COLLISION = "UPDATE_COLLISION";
export const UPDATE_CONFIG_LIGHT = "UPDATE_CONFIG_LIGHT";
export const UPDATE_CONFIG_HORN = "UPDATE_CONFIG_HORN";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_FIREBASE = "UPDATE_FIREBASE";
export const UPDATE_ENABLEBLUETOOTH = "UPDATE_ENABLEBLUETOOTH";
export const UPDATE_ANTI_THEFT = "UPDATE_ANTI_THEFT";
export const UPDATE_SCAN = "UPDATE_SCAN";
export const UPDATE_APP_FIRST= "UPDATE_APP_FIRST";
export const UPDATE_APP_FIRST_LOGIN= "UPDATE_APP_FIRST_LOGIN";

/*
 * action creators
 */

export function updateLanguage(value) {
    return {
        type: UPDATE_LANGUAGE,
        language: value
    }
}

export function updatePeripherals(value) {
    return {
        type: UPDATE_PERIPHERALS,
        peripherals: value
    }
}

export function updatePeripheralId(value) {
    return {
        type: UPDATE_PERIPHERALID,
        peripheralId: value
    }
}

export function updatePersonal(value) {
    return {
        type: UPDATE_PERSIONAL,
        personal: value
    }
}

export function updateConnectDevice(value) {
    return {
        type: UPDATE_CONNECT_DEVICE,
        boolean: value
    }
}

export function updatePinRFID(value) {
    return {
        type: UPDATE_PINRFID,
        pinRFID: value
    }
}

export function updatePinBlackbox(value) {
    return {
        type: UPDATE_PINBLACKBOX,
        pinBlackbox: value
    }
}

export function updateListKeyRFID(value) {
    return {
        type: UPDATE_LISTKEYRFID,
        listKeyUUID: value
    }
}
export function updateInstanceId(value) {
    return {
        type: UPDATE_INSTANCEID,
        instanceID: value
    }
}

export function updateLogin(value) {
    return {
        type: UPDATE_LOGIN,
        isLogin: value
    }
}
export function updateUserName(value) {
    return {
        type: UPDATE_USERNAME,
        username: value
    }
}
export function updateOil(oil) {
    return {
        type: UPDATE_OIL,
        oil
    }
}
export function updateBrake(brake) {
    return {
        type: UPDATE_BRAKE,
        brake,
    }
}
export function updateTire(tire) {
    return {
        type: UPDATE_TIRE,
        tire
    }
}
export function updateAcquy(acquy) {
    return {
        type: UPDATE_ACQUY,
        acquy
    }
}
export function updateAll(all) {
    return {
        type: UPDATE_ALL,
        all
    }
}
export function updateNotification(notification){
        return {
        type: UPDATE_NOTIFICATION,
        notification
    }
}
export function updateCollision(value){
    return {
        type: UPDATE_COLLISION,
        collision: value
    }
}

export function updateConfigLight(value){
    return {
        type: UPDATE_CONFIG_LIGHT,
        config_light: value
    }
}

export function updateConfigHorn(value){
    return {
        type: UPDATE_CONFIG_HORN,
        config_horn: value
    }
}

export function updateToken(value){
    return {
        type: UPDATE_TOKEN,
        token: value
    }
}
export function updateFirebase(value){
    return {
        type: UPDATE_FIREBASE,
        firebase: value
    }
}
export function updateEnableBluetooth(value){
    return {
        type: UPDATE_FIREBASE,
        enableBluetooth: value
    }
}

export function updateAntiTheft(value){
    return {
        type: UPDATE_ANTI_THEFT,
        anti_theft: value
    }
}
export function updateScan(value){
    return {
        type: UPDATE_SCAN,
        isScan: value
    }
}
export function updateAppFirst(value){
    return {
        type: UPDATE_APP_FIRST,
        isFirst: value
    }
}
export function updateAppFirstLogin(value){
    return {
        type: UPDATE_APP_FIRST_LOGIN,
        isFirstLogin: value
    }
}