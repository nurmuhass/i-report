import { Text, View, TextInput, StyleSheet } from "react-native";
import { useRef } from "react";
import { AuthStore, appSignUp } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CreateAccount() {
  const router = useRouter();
  const emailRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const passwordRef = useRef("");

  return (
    <View style={{ flex: 1,backgroundColor:'#ffffff' }}>
       <View style={{marginLeft:15 }}>
      <Stack.Screen
        options={{ title: "Create Account", headerLeft: () => <></> }}
      />


<View style={{backgroundColor:'grey',borderRadius:5,width:28,marginTop:30}}>
  <Ionicons name="chevron-back" size={22} color="black" />
</View>

<View style={{marginTop:20}}>
  <Text style={{fontSize:32,fontWeight:'bold'}}>Let's </Text>
  <Text style={{fontSize:32,fontWeight:'bold'}}>Get Started</Text>
</View>
<Text style={{marginTop:40}}>Please fill the details to create an account</Text>

      <View style={{marginTop:10}}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="firstName"
          nativeID="firstName"
          onChangeText={(text) => {
            firstNameRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="lastName"
          nativeID="lastName"
          onChangeText={(text) => {
            lastNameRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          nativeID="password"
          onChangeText={(text) => {
            passwordRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>

      <Text
        style={{ marginBottom: 8 }}
        onPress={async () => {
          const resp = await appSignUp(
            emailRef.current,
            passwordRef.current,
            firstNameRef.current + " " + lastNameRef.current
          );
          if (resp?.user) {
            router.replace("/(tabs)/home");
          } else {
            console.log(resp.error);
            Alert.alert("Sign Up Error", resp.error?.message);
          }
        }}
      >
        SAVE NEW USER
      </Text>

      <Text
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = false;
          });
          router.back();
        }}
      >
        CANCEL
      </Text>
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
    width: 250,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
});
