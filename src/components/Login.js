import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, TouchableWithoutFeedback, FlatList, Button } from "react-native"
import googleLogin from '../images/google_login.png'
import facebookLogin from '../images/facebook_login.png'
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Movies from './Movies'
import Firebase from '../../config/Firebase'


import {
    GoogleSignin,
    GoogleAuth,
    statusCodes,
} from '@react-native-community/google-signin';

function LoginPage({ navigation }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [signInWith, setSignIn] = useState('');
    const [username, setUsername] = useState('Stranger');
    const [imgPath, setImgPath] = useState('data:image/png;base64,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');

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '345288558587-798iv7qo4h1p0f8povojlb5mbgjml95l.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, [])

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn()
                .then((user) => {
                    let details = { user }.user.user
                    // setUser({ user })
                    setImgPath(details.photo)
                    setUsername(details.givenName)
                    setLoggedIn(true)
                    setSignIn("Google")
                });

            // console.log({ user })
        } catch (error) {
            console.log({ error })
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const signInFacebook = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = Firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            const user = await Firebase.auth().signInWithCredential(facebookCredential)
                .then(
                    (user) => {
                        setImgPath(user.user.photoURL)
                        setUsername(user.additionalUserInfo.profile.first_name)
                        setLoggedIn(true)
                        setSignIn('Facebook')
                    });

        } catch (error) {
            console.log({ error })
        }
    }

    const signOut = async () => {
        console.log("kkkkk: ", this.state.signInWith)
        if (this.state.signInWith === 'Google') {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();

                setLoggedIn(false)
            } catch (error) {
                console.error(error);
            }
        }
        else {
            Firebase.auth().signOut().then(function () {
                // Sign-out successful.
            }).catch(function (error) {
                // An error happened.
            });
        }

    };



    return (
        <View>{console.log(isLoggedIn)}
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Welcome {username}!
                </Text>
                <View style={styles.imageBox}>
                    <Image source={{ uri: imgPath }} style={{ width: "100%", height: "100%", resizeMode: 'cover' }} />
                </View>

                <Text style={styles.textStyle}>
                    Please log in to continue
                </Text>

                <View style={{ display: (isLoggedIn ? 'flex' : 'flex'), marginTop: '2%' }}>
                    <Button
                        title={"רשימת סרטים"}
                        color={'green'}
                        onPress={() => {
                            navigation.navigate('Movies')
                        }}
                    />
                </View>


            </View>


            <View style={styles.footer}>

                <TouchableWithoutFeedback
                    onPress={signIn}
                >
                    <View
                        style={{ flex: 5, marginRight: '2%', display: (isLoggedIn ? 'none' : 'flex') }}
                    >
                        <Image source={googleLogin} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={signInFacebook}
                >
                    <View
                        style={{ flex: 6, display: (isLoggedIn ? 'none' : 'flex') }}
                    >
                        <Image source={facebookLogin} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />

                    </View>
                </TouchableWithoutFeedback>

                <View style={{ display: (isLoggedIn ? 'flex' : 'none'), alignSelf: 'center', marginLeft: '40%' }}>
                    <Button
                        title={"log out"}
                        color={'green'}
                        onPress={signOut}
                    />
                </View>
            </View>

        </View>
    );

}

const Stack = createStackNavigator();
function Login() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"  >

                <Stack.Screen options={{ headerShown: false }} name="LoginPage" component={LoginPage} />
                {/* <Stack.Screen name="InfAd" options={{ headerShown: false }}
                component={InfoAdminScreen} /> */}
                <Stack.Screen options={{ headerShown: false }} name="Movies" component={Movies} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

    container: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBox: {
        height: '25%',
        width: '40%',
        margin: '3%'
    },
    footer: {
        height: '20%',
        width: '90%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },

    textStyle: {
        fontSize: 20
    }
});






export default Login;
