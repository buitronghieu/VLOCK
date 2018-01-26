import React from 'reat';
import { AsyncStorage } from "react-native";
import {UPDATE_USER, UPDATE_LANGUAGE} from '../types';
export function getUser(){
    return(dispatch)=>{
        try {
            if(value){
                dispatch({
                    type: UPDATE_USER,
                    payload: value
                })
            }else{
                
            }
        } catch (error) {
            
        }
    }
}