import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {RTCView} from 'react-native-vdotok-streaming';
// import axios from 'axios';

import {Client} from 'react-native-vdotok-streaming';

const MyButton = () => {
  const [number, setNumber] = useState(0);
  const [user, setUser] = useState({
    auth_token: '545baedaaaafdb006bc68f9aea2a3bf0',
    authorization_token: '7d4d82d2d8bf5194d905cc1b4a1cc39a',
    created_datetime: '1686842902',
    email: 'manan@test.com',
    full_name: 'Manan',
    media_server_map: {
      complete_address: 'wss://q-signalling.vdotok.dev:8443/callV1',
      end_point: 'callV1',
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
    phone_num: '923192602920',
    process_time: 31,
    profile_pic: '',
    ref_id: '1RN1RP9413268c492efb757b5f2feb2934ae31',
    status: 200,
    stun_server_map: {
      complete_address: 'r-stun1.vdotok.dev:3478',
      host: 'r-stun1.vdotok.dev',
      port: '3478',
    },
    user_id: 22393,
    username: 'Manan',
  });
  const [client, setClient] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

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
      //data mine2
      to: ['1RN1RP111213a660d0bd8ad903c6adfc86aa50'],
      type: 'camera',
    });

    client.on('call', res => {
      if (res.type == 'CALL_RECEIVED') {
      }
      if (res.type == 'CALL_ENDED') {
        console.log(
          'call endedddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
        );
        setStream(null);
        setRemoteStream(null);
      }
      if (res.type == 'MISSED_CALL') {
        setRemoteStream(null);
        setStream(null);
      }
    });
  };

  const dissconnectSocket = () => {
    client.Disconnect();
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
      client.on('local_stream', res => {
        setStream(res.stream);
      });
      client.on('remote_stream', res => {
        setRemoteStream(res.stream);
      });
      client.on('error', res => {
        console.log(res, 'ressssssssssssssssssssssssssssssss');
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
      {stream !== null ? (
        <>
          <View
            style={{
              position: 'absolute',
              height: 170,
              width: 130,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 15,
              bottom: 100,
              right: 20,
              zIndex: 2,
              overflow: 'hidden',
            }}>
            <RTCView
              zOrder={2}
              zIndex={2}
              streamURL={stream.toURL()}
              style={{
                height: '100%',
                width: '100%',
                zIndex: 2,
                borderRadius: 15,
              }}></RTCView>
          </View>
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: 1,
            }}>
            {remoteStream !== null ? (
              <RTCView
                objectFit={'cover'}
                zOrder={1}
                zIndex={1}
                streamURL={remoteStream.toURL()}
                style={{height: '100%', width: '100%', zIndex: 1}}></RTCView>
            ) : (
              <Text>remoteStream</Text>
            )}
          </View>
        </>
      ) : (
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
          <View>
            <Text>{number}</Text>
            <Button
              title="dissconnect socket"
              onPress={() => {
                dissconnectSocket();
              }}></Button>
          </View>
        </>
      )}
    </>
  );
};

export default MyButton;
