import AsyncStorage from '@react-native-community/async-storage';
import { Dimensions } from 'react-native';

const baseURL = 'http://192.168.43.163:8000/'

export const getUrl = {
    baseApi: baseURL + 'api/',
    baseURLimage: baseURL,
}

export const getRandomChar = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getAuthUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : { isLogin: false }
    } catch (e) {
        return { isLogin: false }
    }
}

export const setAuthUser = async (data) => {
    data = {
        ...data,
        isLogin: true,
    }
    await AsyncStorage.setItem('user', JSON.stringify(data));
    return true
}

export const getColor = {
    button: '#2E86CA',
    devider: '#F0EFF4'
}

export const getSize = {
    widthScreen: Dimensions.get('window').width,
    heightScreen: Dimensions.get('window').height,
    paddingContainer: 20,
    fontSizetitle: 20,
}

export const getKey = {
    apiKey: 'lkjnsfaJHoahslkf889w4najnKLNLKGjnaljnsdio8'
}