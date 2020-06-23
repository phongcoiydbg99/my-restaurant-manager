import React from "react";
import DangNhap from "../screens/dang_nhap";
import axios from "axios";
import {SERVER_ID} from "../config/properties"
import AsyncStorage from '@react-native-community/async-storage';

 export const authContext = React.createContext();

function AuthProvider(){
    const [authInfo,setInfo] =React.useState({
      status: 'pending',
      error: '',
      user: null,
      logged:false
    });

    React.useEffect(()=>{
      switch(authInfo.status){
        case 'pending':
            if(getToken() !== null){
              let user = getUser();
              setInfo({...authInfo,status:'Authenticated',user:user,logged:tabRevenue});
            }
            break;
        case 'Logging':
           
           axios.get(`${SERVER_ID}account/${authInfo.user.username}`).then(res=>{
            if(authInfo.user.username === res.data.username && authInfo.user.password === res.data.password){
                   setInfo({...authInfo,status:'Authenticated',user:res.data, error: '',logged:true})
            }else setInfo({...authInfo,status:'Error', error:'Wrong password'});
           }).catch(err=>{setInfo({...authInfo,status:'Error',error:"User does not exist!"});
                           console.log(authInfo)});
           break;
        case 'Error':
           break;
        case 'Authenticated' :
            if(getToken() == null){
              
            }
            console.log(authInfo);
           break;
        default:
           break;

      }
    },[authInfo])  
    return(
      <authContext.Provider value={{authInfo,setInfo}}>
         <LogInForm/>
      </authContext.Provider>
    )
}

const getToken = async ()=>{
  try{
     const token = await AsyncStorage.getItem('token');
     return token !== null ? token :null;
  }catch(e){
    console.log(e);
  }
}

const getUser = async () =>{
  try{
     const user = await AsyncStorage.getItem('user');
     return user !== null ? JSON.parse(user):null;
  }catch(e){
    console.log(e);
  }
}
const LogInForm = () =>{
  let {authInfo, setInfo}= React.useContext(authContext);
  return(
    <DangNhap status={authInfo.status} setInfo={setInfo} error={authInfo.error}/>
  )
}

export default AuthProvider

