import { Text, View, TextInput, StyleSheet, StatusBar } from "react-native";
import { useRef, useState } from "react";
import { AuthStore } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Button } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config.js";
import Loader from "../../components/Loader.js";
import { Alert } from "react-native";

export default function CreateAccount() {
  const router = useRouter();
  const emailRef = useRef("");
  const fullNameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const appSignUp = async (email, password, displayName) => {
    try {
      setLoading(true);
      // this will trigger onAuthStateChange to update the store..
      const resp = await createUserWithEmailAndPassword(auth, email, password);
  
      AuthStore.update((store) => {
        store.user = auth.currentUser;
        store.isLoggedIn = true;
      });
  
      return { user: auth.currentUser };
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return { error: e };
    }
  };


  return (
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
  <Text style={{fontSize:32,fontWeight:'bold'}}>Let's </Text>
  <Text style={{fontSize:32,fontWeight:'bold'}}>Get Started</Text>
</View>
<Text style={{marginTop:40,color:'#555',fontSize:15}}>Please fill the details to create an account</Text>


<View style={{justifyContent:'center',marginTop:15}}>


<View style={{alignContent:'center'}}>
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
          placeholder="Enter Your FullName"
          nativeID="FullName"
          onChangeText={(text) => {
            fullNameRef.current = text;
          }}
          style={styles.textInput}
        />

        <FontAwesome5 name="user" size={18} color="#555"  style={styles.icon}/>
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

      {loading ? 
  <View style={{marginTop:10,width:'90%',padding:15,
      backgroundColor:'#fff',color:'#00C26F',borderRadius:20,shadowColor:'#3E3E3E',
      shadowOffset:{width:0,height:10},shadowOpacity:0.2,shadowRadius:8,elevation:4,alignItems:'center',justifyContent:'center'}}>
        <Loader/>
    </View>
:


      <Button
      buttonStyle={{marginTop:10,width:'90%',padding:15,
        backgroundColor:'#00C26F',color:'#fff',borderRadius:20,shadowColor:'#3E3E3E',shadowOffset:{width:0,height:10},shadowOpacity:0.2,shadowRadius:8,elevation:4}}

        onPress={async () => {
          const resp = await appSignUp(
            emailRef.current,
            passwordRef.current,
            fullNameRef.current 
          );
          if (resp?.user) {
            router.replace("/(tabs)/home");
          } else {
            console.log(resp.error);
            Alert.alert("Sign Up Error", resp.error?.message);
          }
        }}
      >
        Sign up
      </Button>

}
<View style={{marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
  <Text>Already have an account!</Text>
<Text
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = false;
          });
          router.back();
        }} style={{color:'#00C26F',marginLeft:3}}
      >
        Login
      </Text>
</View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    width: '90%',
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
