import { Get } from "../../utils/apiServices"
import {userTypes} from "./types"

export const getUser = () => async(dispatch) => {
    try{
        dispatch({ type: userTypes.GET_ME_REQUEST })
        const res = await Get('/me');
        dispatch({ type: userTypes.GET_ME_FINISH, payload: res.data.data })
    }catch(err){
        dispatch({ type: userTypes.GET_ME_FAIL })
    }
}