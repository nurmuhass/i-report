import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { StatusBar } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Button } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

export default function LogIn() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  return (
<>
    <View style={{ flex: 1,backgroundColor:'#ffffff' }}>
    <StatusBar
      translucent
      barStyle="dark-content"
      backgroundColor="rgba(255, 255, 255, 0)" // Transparent white color
  />
         <View style={{marginLeft:15 }}>
        <Stack.Screen
          options={{ title: "Create Account", headerLeft: () => <></> }}
        />
  
  
  <TouchableOpacity style={{backgroundColor:'#f0f0f0',borderRadius:5,width:30,
    marginTop:40,height:28,alignItems:'center',justifyContent:'center'}} onPress={router.back}>
    <Ionicons name="chevron-back" size={18} color="black" />
  </TouchableOpacity>
  
  <View style={{marginTop:20}}>
    <Text style={{fontSize:32,fontWeight:'bold'}}>Hey, </Text>
    <Text style={{fontSize:32,fontWeight:'bold'}}>Welcome Back</Text>
  </View>
  <Text style={{marginTop:40,color:'#555',fontSize:15}}>Please login to continue</Text>
  
  
  <View style={{justifyContent:'center',marginTop:15}}>
  
  
  <View style={{alignContent:'center',}}>
          <TextInput
            placeholder="Enter Your Email"
            nativeID="email"
            onChangeText={(text) => {
              emailRef.current = text;
            }}
            style={{...styles.textInput}}
          />

        <Fontisto name="email" size={18} color="#555" style={styles.icon} />
          
  </View>
  

   <View>
         
          <TextInput
            placeholder="Enter Your Password"
            secureTextEntry={true}
            nativeID="password"
            onChangeText={(text) => {
              passwordRef.current = text;
            }}
            style={styles.textInput}
          />
          <Feather name="lock" size={18} color="#555"  style={styles.icon}/>
   </View>
        </View>
  
<View>
               <Text style={{marginRight:5,fontWeight:'bold',fontSize:14,marginLeft:'65%'}}>Forget Password?</Text>
</View>
       

        <Button
        buttonStyle={{marginTop:10,width:'90%',padding:15,
          backgroundColor:'#00C26F',color:'#fff',borderRadius:20,shadowColor:'#3E3E3E',shadowOffset:{width:0,height:10},shadowOpacity:0.2,shadowRadius:8,elevation:4}}
  
          onPress={async () => {
            const resp = await appSignIn(emailRef.current, passwordRef.current);
            if (resp?.user) {
              router.replace("/(tabs)/home");
            } else {
              console.log(resp.error)
              Alert.alert("Login Error", resp.error?.message)
            }
          }}
        >
          Login
        </Button>


  <View style={{marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text>Don't have an account!</Text>
  <Text
                 onPress={() => {
                  AuthStore.update((s) => {
                    s.isLoggedIn = true;
                  });
                  router.push("/create-account");
                }} style={{color:'#00C26F',marginLeft:3}}
        >
         Sign up
        </Text>
  </View>
  
        </View>
      </View>



    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '92%',
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#555",
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 15,
    paddingLeft:40
  },
  icon:{
    position:'absolute',left:10,top:15
  }
});
