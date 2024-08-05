import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

import DatePicker from 'react-native-modern-datepicker';
import DocumentPicker from 'react-native-document-picker';
// form validation
import * as Yup from 'yup';
import {Formik} from 'formik';
import axios, {toFormData} from 'axios';

//images
const bg = require('../src/assets/bagrounds/login_Bg.png');

import axiosClient from './utils/axiosClient';

// console.log(back,"kjbn")
const formSchema = Yup.object().shape({
  email: Yup.string()
    .email('Plese Enter Valid Email')
    .required('Your Email Required'),

  name: Yup.string()
    .min(4, 'Name Must Be 4 Cherecters')
    .required('Enter Your Name'),

  contact: Yup.number().required('Contact is Required'),
});

export default App = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [show, setShow] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');

  const formData = new FormData();

  const [data, setData] = useState({
    name: '',
    contact: '',
    email: '',
    dob: selectedDate,
    image: '',
  });

  const imgPicker = async () => {
    try {
      const img = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
      });
      //  console.log(img)
      formData.append('image', img);
      data.image = formData;
      console.log(formData.getParts("image"));
    } catch (error) {
      console.log(error);
    }
  };



  const [img, setImg] = useState(null);
  const [reseve, setResve] = useState([]);
  const pickImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
      },
      response => {
        if (!response.didCancel && !response.error) {
          setImg(response);
        }
      },
    );
  };


  const sendData = async () => {
    console.log('send');
    if (!img) {
      console.log('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: img.assets[0].uri,
      name: img.assets[0].name,
      type: img.assets[0].type,
    });

   
    console.log(img.assets[0]);

    try {
      // console.log('ab try me h');
      const response = await axiosClient.post('/api/v2/create/', img.assets[0], {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.info.image);
    } catch (error) {
      console.log('ab catch me', error);
    }
  };
  

  const getData = async () => {
    try {
      console.log('ab get try me h');
      const response = await axios.get(
        'https://forms-3n00.onrender.com/api/v2/readall/',
      );
      const mydata = response.data.data;
      setResve(mydata);
      console.log(reseve);
    } catch (error) {
      console.log('ab get catch me h', error);
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#03B4EE'} />
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.bgImage}>
          <Text style={styles.loginText}>Fill Your Data</Text>
           <View style={styles.formBox}>
            <Formik
              initialValues={{contact: '', email: '', name: ''}}
              validationSchema={formSchema}
              onSubmit={values => {
                data.name=values.name
                data.email=values.email                
                data.contact=values.contact
                sendData(data);
              }}>
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                touched,
                setFieldTouched,
                isValid,
              }) => (
                <View>
                  <View style={styles.inputBox}>
                    <TextInput
                      onChangeText={handleChange('name')}
                      value={values.name}
                      placeholder="Name"
                      placeholderTextColor="#242424"
                      color="#000"
                      autoCapitalize="none"
                      // textContentType="Name"
                      underlineColorAndroid="#fff"
                      onBlur={() => setFieldTouched('name')}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput
                      style={{color: '#242424'}}
                      onChangeText={handleChange('email')}
                      value={values.email}
                      placeholder="Your Email"
                      autoCapitalize="none"
                      underlineColorAndroid="#fff"
                      placeholderTextColor="#242424"
                      onBlur={() => setFieldTouched('email')}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput
                      onChangeText={handleChange('contact')}
                      value={values.id}
                      placeholder="Contact"
                      placeholderTextColor="#242424"
                      color="#000"
                      autoCapitalize="none"
                      // textContentType="Name"
                      underlineColorAndroid="#fff"
                      onBlur={() => setFieldTouched('contact')}
                    />
                    {touched.contact && errors.contact && (
                      <Text style={styles.errorText}>{errors.contact}</Text>
                    )}
                  </View>

                  <View style={[styles.inputBox, {justifyContent: 'center'}]}>
                    <Pressable onPress={imgPicker}>
                      <Text style={{color: '#000'}}>
                        {data.image ? (
                          <Image
                            source={{
                              uri: data.image.uri,
                            }}
                            height={40}
                            width={40}
                          />
                        ) : (
                          'Profile Photo'
                        )}
                      </Text>
                    </Pressable>
                    {touched.file && errors.file && (
                      <Text style={styles.errorText}>{errors.file}</Text>
                    )}
                  </View>

                  <View style={[styles.inputBox, {justifyContent: 'center'}]}>
                    <Pressable onPress={() => setShow(!show)}>
                      <Text style={{color: '#000'}}>
                        {selectedDate ? selectedDate : 'Select DOB'}
                      </Text>
                    </Pressable>
                  </View>
                  <Modal
                    transparent={true}
                    animationType="slide"
                    visible={show}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          margin: 20,
                          backgroundColor: '#fff',
                          borderRadius: 20,
                          width: '90%',
                          padding: 10,
                          alignItems: 'center',
                          elevation: 5,
                        }}>
                        <DatePicker
                          mode="calendar"
                          // current={selectedDate}

                          onDateChange={date => {
                            setSelectedDate(date);
                            // data.dob = date;
                          }}
                        />

                        <Pressable
                          onPress={() => setShow(!show)}
                          style={[styles.button, {width: '100%'}]}>
                          <Text style={styles.buttonText}>Close</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>

                  <Pressable
                    onPress={() => {
                      handleSubmit();

                      // navigation.navigate('Home');
                    }}
                    disabled={touched.email && !isValid}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Send Data</Text>
                  </Pressable>
                </View>
              )}
            </Formik>

            <Pressable onPress={sendData} style={styles.button}>
              <Text style={styles.buttonText}>BTN</Text>
            </Pressable>
          </View> 

          <View>
            {img && (
              <Image
                source={{uri: img.assets[0].uri}}
                style={{width: 200, height: 200}}
              />
            )}
            <Button title="Pick Image" onPress={pickImage} />
            <Button title="Send Data" onPress={sendData} />
            {/* <Button title="Get Data" onPress={getData} /> */}
            {reseve[0] ? (
              <View style={{border: 1, borderWidth: 1, borderColor: '#242424'}}>
                <Image
                  // source={{uri: reseve[1].image.uri}}
                  source={{
                    uri: `data:image/jpeg;base64,${reseve[0].image.data[0]}`,
                  }}
                  style={{width: 200, height: 200, objectFit: 'contain'}}
                />
              </View>
            ) : (
              ''
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilBox: {
    borderRadius: 100,
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

  loginText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    elevation: 5,
    marginVertical: 10,
    textAlign: 'left',
  },
  formBox: {
    width: '100%',
    padding: 20,
  },
  inputBox: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: '#faad14',
  },
  button: {
    backgroundColor: '#faad14',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  forget: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  forgetText: {
    color: '#fff',
  },
  loginWithBox: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    flexDirection: 'row',
  },
  logoBox: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faad14',
    width: 50,
    height: 50,
  },
});
