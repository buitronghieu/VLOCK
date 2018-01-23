import { AsyncStorage } from "react-native";
import { APP_AUTHEN_SERVER, getClientId } from '../common/Utils';
import { UPDATE_TOKEN, UPDATE_LOGIN } from "../types";
export function getToken() {
    return (dispatch) => {
        try {
            const value = await AsyncStorage.getItem("token");
            if (value) {
                fetch(Util.APP_AUTHEN_SERVER, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        method: 'm_login',
                        params: {
                            clientid: getClientId(),
                            token: value
                        }
                    })
                }).then((response) => response.json())
                    .then((responseData) => {
                        if (responseData.status) {
                            if (responseData.token !== value) {
                                AsyncStorage.setItem("token", JSON.stringify(responseData.token))
                            }
                            dispatch({
                                type: UPDATE_TOKEN,
                                payload: responseData.token
                            })
                            dispatch({
                                type: UPDATE_LOGIN,
                                payload: true
                            });
                        }
                    });
            }
        } catch (error) {

        }
    }
}


