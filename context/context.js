import React from "react";
import DangNhap from "../screens/dang_nhap";
import axios from "axios";
import {SERVER_ID} from "../config/properties"
import AsyncStorage from "@react-native-community/async-storage"
export const authContext = React.createContext();

function AuthProvider(){
    const [authInfo,setInfo] =React.useState({
      status: 'pending',
      error: '',
      user: null,
      logged:false,
      
    });

    React.useEffect(()=>{
      console.log(authInfo);
      // 
      switch(authInfo.status){
        
        case 'pending':
           AsyncStorage.removeItem("token");
           AsyncStorage.getItem('token').then( token => {
             if(token !== null){
              //  console.log(token);
                 AsyncStorage.getItem('user').then(user =>{

                   setInfo({...authInfo,status:'Authenticated',user:JSON.parse(user),logged:true});
                 })
             }
           });
           //cai nay dung de xoa token di. Khi co cai nay thi moi lan vao app deu phai dang nhap
           //muon k phai dang nhap lai thi comment out 
            break;
        case 'Logging':
           
           axios.get(`${SERVER_ID}account/${authInfo.user.username}`).then(res=>{
            if(authInfo.user.username === res.data.username && authInfo.user.password === res.data.password){
                   setInfo({...authInfo,status:'Authenticated',user:res.data, error: '',logged:true})
            }else setInfo({...authInfo,status:'Error', error:'Wrong password'});
           }).catch(err=>{setInfo({...authInfo,status:'Error',error:"User does not exist!"});
                          //  console.log(authInfo)
                           });
           break;
        case 'Error':
           break;
        case 'Authenticated' :
          // AsyncStorage.removeItem("token");
          AsyncStorage.getItem('token').then(token =>{
            if(token === null){
              let token1 = authInfo.user.username + '@@' + authInfo.user.password;
              let item = [['token',token1],['user',JSON.stringify(authInfo.user)]];
              AsyncStorage.multiSet(item);
            }
          }).finally(()=>setInfo({...authInfo,status:'Logged'}));
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

const LogInForm = () =>{
  let {authInfo, setInfo}= React.useContext(authContext);
  return(
    <DangNhap status={authInfo.status} setInfo={setInfo} error={authInfo.error}/>
  )
}

export default AuthProvider

