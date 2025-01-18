
import asyncAccess from '@App/constants/asyncAccess';
import { IUserDetails } from '@App/types/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function saveUserInfo(params:IUserDetails) {
  return await AsyncStorage.setItem(
    asyncAccess.userInfo,
    JSON.stringify(params),
  );
}
export async function readUserInfo(): Promise<IUserDetails|null> {
  try {
    const data = await AsyncStorage.getItem(asyncAccess.userInfo);
    return data ? (JSON.parse(data) ) : null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
