import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
// import axios from 'axios';

import {Client} from 'react-native-vdotok-streaming';

const MyButton = () => {
  const [number, setNumber] = useState(0);
  const [user, setUser] = useState({
    auth_token: '37ac384b28a20006c044eb11fe47ec60',
    authorization_token: '4fc1aeebac34645762bf9110f87c594e',
    created_datetime: '1686916164',
    email: 'datamine@test.com',
    full_name: 'dataMine',
    media_server_map: {
      complete_address: 'wss://q-signalling.vdotok.dev:8443/call',
      end_point: 'call',
      host: 'q-signalling.vdotok.dev',
      port: '8443',
      protocol: 'wss',
    },
    message: 'Login Successful',
    messaging_server_map: {
      complete_address: 'wss://q-messaging.vdotok.dev:443',
      host: 'q-messaging.vdotok.dev',
      port: '443',
      protocol: 'wss',
    },
    phone_num: '923752685633',
    process_time: 440,
    profile_pic: '',
    ref_id: '1RN1RP8f0019b9ad6e2a944fee133e93fd178f',
    status: 200,
    stun_server_map: {
      complete_address: 'r-stun1.vdotok.dev:3478',
      host: 'r-stun1.vdotok.dev',
      port: '3478',
    },
    user_id: 22956,
    username: 'dataMine',
  });
  const [client, setClient] = useState(null);

  const initializeSDK = () => {
    let sdkInitParam = {
      host: user.media_server_map.complete_address,
      projectId: '1RN1RP',
      stunHost: user.stun_server_map.complete_address,
    };
    let aclient = new Client(sdkInitParam);

    setClient(aclient);

    aclient.on('connected', res => {
      console.log(aclient, 'clientttttttttyconnected');
      aclient.Register(user.authorization_token, user.ref_id);
    });
  };

  const initiateOneToOneCall = () => {
    client.OneToOneCall({
      to: ['1RN1RP1abce7a1974cee805ea7b869a25becdb'],
      type: 'camera',
    });
  };

  //onRegister enable camera
  useEffect(() => {
    if (client !== null) {
      client.on('registered', response => {
        // console.log("register", response);
        // setLoading("Socket Connected");
        // console.warn(
        //   loading,
        //   '================================================',
        // );
        console.log('sdk connected...');
      });
    }
  }, [client]);

  //   useEffect(() => {
  //     const fetchData = () => {
  //       axios
  //         .post('https://q-tenant.vdotok.dev/API/v0/Login', {
  //           project_id: '1RN1RP',
  //           email: 'dataMine',
  //           password: 'password',
  //         })
  //         .then(response => {
  //           setUser(response.data);
  //           console.log(response);
  //         })
  //         .catch(error => {
  //           console.error('Error fetching data:', error);
  //         });
  //     };
  //     fetchData();
  //   }, []);
  return (
    <>
      <View>
        <Text>{number}</Text>
        <Button
          title="connectSDK"
          onPress={() => {
            //   setNumber(number + 1);
            initializeSDK();
          }}
        />
      </View>
      <View>
        <Text>{number}</Text>
        <Button
          title="call"
          onPress={() => {
            //   setNumber(number + 1);
            initiateOneToOneCall();
          }}
        />
      </View>
    </>
  );
};

export default MyButton;
