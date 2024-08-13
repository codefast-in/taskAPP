// import {
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Button,
//   Pressable,
//   StatusBar,
//   SafeAreaView,
//   Modal,
// } from 'react-native';
// import React, {useState} from 'react';
// import DatePicker from 'react-native-modern-datepicker';
// import DocumentPicker from 'react-native-document-picker';
// // form validation
// import * as Yup from 'yup';
// import {Formik} from 'formik';
// import axios from 'axios';

// //images
// const bg = require('../src/assets/bagrounds/login_Bg.png');

// import Snackbar from 'react-native-snackbar';

// export default App = ({navigation}) => {
//   const [show, setShow] = useState(false);
//   const [data, setData] = useState({
//     name: '',
//     contact: '',
//     email: '',
//     dob: '',
//     image: '',
//   });

//   console.log(data);

//   const imgPicker = async () => {
//     try {
//       const img = await DocumentPicker.pickSingle({
//         type: DocumentPicker.types.images,
//       });

//       setData({...data, image: img});
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const sendData = async () => {
//     if (
//       !data.image &&
//       data.contact.length == 0 &&
//       data.dob.length == 0 &&
//       data.email.length == 0 &&
//       data.name.length == 0
//     ) {
//       Snackbar.show({
//         text: 'All feilds are required',
//         duration: Snackbar.LENGTH_SHORT,
//       });
//       console.log('All feilds are required');
//       return;
//     }

//     const formData = new FormData();

//     formData.append('name', data.name);
//     formData.append('contact', data.contact);
//     formData.append('dob', data.dob);
//     formData.append('email', data.email);
//     formData.append('image', data.image);
//     try {
//       const response = await axios.post(
//         'https://forms-3n00.onrender.com/api/v2/create',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );
//       console.log('succes', response.data);
//     } catch (error) {
//       console.log({...error});
//     }
//   };

//   return (
//     <>
//       <StatusBar barStyle={'dark-content'} backgroundColor={'#03B4EE'} />
//       <SafeAreaView style={styles.container}>
//         <ImageBackground source={bg} resizeMode="cover" style={styles.bgImage}>
//           <Text style={styles.loginText}>Fill Your Data</Text>
//           <View style={styles.formBox}>
//             <View style={styles.inputBox}>
//               <TextInput
//                 onChangeText={e => setData({...data, name: e})}
//                 value={data.name}
//                 placeholder="Name"
//                 placeholderTextColor="#242424"
//                 color="#000"
//                 autoCapitalize="none"
//                 underlineColorAndroid="#fff"
//               />
//             </View>
//             <View style={styles.inputBox}>
//               <TextInput
//                 onChangeText={e => setData({...data, contact: e})}
//                 value={data.contact}
//                 placeholder="Contact"
//                 placeholderTextColor="#242424"
//                 color="#000"
//                 autoCapitalize="none"
//                 underlineColorAndroid="#fff"
//                 textContentType="telephoneNumber"
//               />
//             </View>
//             <View style={styles.inputBox}>
//               <TextInput
//                 onChangeText={e => setData({...data, email: e})}
//                 value={data.email}
//                 placeholder="Email"
//                 placeholderTextColor="#242424"
//                 color="#000"
//                 autoCapitalize="none"
//                 underlineColorAndroid="#fff"
//                 textContentType="emailAddress"
//               />
//             </View>
//             <View style={[styles.inputBox, {justifyContent: 'center'}]}>
//               <Pressable onPress={() => setShow(!show)}>
//                 <Text style={{color: '#000'}}>
//                   {data.dob ? data.dob : 'Select DOB'}
//                 </Text>
//               </Pressable>
//             </View>
//             <Modal transparent={true} animationType="slide" visible={show}>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <View
//                   style={{
//                     margin: 20,
//                     backgroundColor: '#fff',
//                     borderRadius: 20,
//                     width: '90%',
//                     padding: 10,
//                     alignItems: 'center',
//                     elevation: 5,
//                   }}>
//                   <DatePicker
//                     mode="calendar"
//                     // current={selectedDate}

//                     onDateChange={date => {
//                       // setSelectedDate(date);
//                       setData({...data, dob: date});
//                       setShow(!show);
//                     }}
//                   />
//                 </View>
//               </View>
//             </Modal>
//             <View style={[styles.inputBox, {justifyContent: 'center'}]}>
//               <Pressable onPress={imgPicker}>
//                 <Text style={{color: '#000'}}>
//                   {data.image ? (
//                     <Image
//                       source={{
//                         uri: data.image.uri,
//                       }}
//                       height={40}
//                       width={40}
//                     />
//                   ) : (
//                     'Profile Photo'
//                   )}
//                 </Text>
//               </Pressable>
//             </View>
//             <Pressable
//               onPress={() => {
//                 sendData();
//               }}
//               style={styles.button}>
//               <Text style={styles.buttonText}>Submit</Text>
//             </Pressable>
//           </View>
//         </ImageBackground>
//       </SafeAreaView>
//     </>
//   );
// };

import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  StatusBar,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import DocumentPicker from 'react-native-document-picker';
import * as Yup from 'yup';
import {Formik} from 'formik';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

// Images
const bg = require('../src/assets/bagrounds/login_Bg.png');

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, 'Contact must be exactly 10 digits')
    .required('Contact is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  dob: Yup.string().required('Date of Birth is required'),
  image: Yup.mixed().required('Profile photo is required'),
});
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
export default App = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgPicker = async setFieldValue => {
    try {
      const img = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
      });

      setFieldValue('image', img);
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async values => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('contact', values.contact);
    formData.append('dob', values.dob);
    formData.append('email', values.email);
    formData.append('image', {
      uri: values.image.uri,
      name: values.image.name || values.image.uri.split('/').pop(),
      type: values.image.type,
    });

    try {
      const response = await axios.post(
        'https://forms-3n00.onrender.com/api/v2/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'X',
          textColor: 'red',
          onPress: () => Snackbar.dismiss,
        },
      });
      setIsSubmitted(true);
      setIsLoading(false);
      console.log('Success', response.data);
    } catch (error) {
      setIsLoading(false);
      console.log({...error});
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#03B4EE'} />
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bg} resizeMode="cover" style={styles.bgImage}>
          {isLoading && (
            <Modal transparent={true} animationType="slide" visible={isLoading}>
              <View
                style={{
                  height: ScreenHeight,
                  width: ScreenWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:"rgba(86, 86, 86, 0.5)",
                  
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    height: 100,
                    width: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#faad14',
                    borderRadius: 12,
                  }}>
                  <Text style={{color: '#242424', fontSize: 20}}>
                    Loading...
                  </Text>
                </View>
              </View>
            </Modal>
          )}
          {isSubmitted ? (
            <View>
              <Text style={styles.loginText}>Youre form is submitted</Text>
              <TouchableOpacity
                onPress={() => setIsSubmitted(false)}
                style={styles.button}>
                <Text style={styles.buttonText}>Fill another form</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.loginText}>Fill Your Data</Text>
              <Formik
                initialValues={{
                  name: '',
                  contact: '',
                  email: '',
                  dob: '',
                  image: '',
                }}
                validationSchema={validationSchema} 
                onSubmit={sendData}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <View style={styles.formBox}>
                    <View style={styles.inputBox}>
                      <TextInput
                        onChangeText={handleChange('name')}
                        value={values.name}
                        placeholder="Name"
                        placeholderTextColor="#242424"
                        color="#000"
                        autoCapitalize="none"
                        underlineColorAndroid="#fff"
                      />
                      {touched.name && errors.name && (
                        <Text style={styles.errorText}>{errors.name}</Text>
                      )}
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        onChangeText={handleChange('contact')}
                        value={values.contact}
                        placeholder="Contact"
                        placeholderTextColor="#242424"
                        color="#000"
                        autoCapitalize="none"
                        underlineColorAndroid="#fff"
                        textContentType="telephoneNumber"
                        maxLength={10}
                      />
                      {touched.contact && errors.contact && (
                        <Text style={styles.errorText}>{errors.contact}</Text>
                      )}
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        onChangeText={handleChange('email')}
                        value={values.email}
                        placeholder="Email"
                        placeholderTextColor="#242424"
                        color="#000"
                        autoCapitalize="none"
                        underlineColorAndroid="#fff"
                        textContentType="emailAddress"
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={[styles.inputBox, {justifyContent: 'center'}]}>
                      <Pressable onPress={() => setShow(!show)}>
                        <Text style={{color: '#000'}}>
                          {values.dob ? values.dob : 'Select DOB'}
                        </Text>
                      </Pressable>
                      {touched.dob && errors.dob && (
                        <Text style={styles.errorText}>{errors.dob}</Text>
                      )}
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
                            selected={selectedDate}
                            onDateChange={date => {
                              setFieldValue('dob', date);
                              setSelectedDate(date);
                              setShow(!show);
                            }}
                          />
                        </View>
                      </View>
                    </Modal>
                    <View style={[styles.inputBox, {justifyContent: 'center'}]}>
                      <Pressable onPress={() => imgPicker(setFieldValue)}>
                        <Text style={{color: '#000'}}>
                          {values.image ? (
                            <Image
                              source={{
                                uri: values.image.uri,
                              }}
                              style={{height: 40, width: 40}}
                            />
                          ) : (
                            'Profile Photo'
                          )}
                        </Text>
                      </Pressable>
                      {touched.image && errors.image && (
                        <Text style={styles.errorText}>{errors.image}</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.button}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </>
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};


let errorTextSt= {
  fontSize: 16,
  color: '#faad14',
  marginTop: 5,
}

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
    fontSize: 16,
    color: '#faad14',
    marginTop: 5,
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
