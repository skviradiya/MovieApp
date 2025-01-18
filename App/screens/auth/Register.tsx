/* eslint-disable react-native/no-inline-styles */
import {pencilIcon, profileIcon} from '@App/assets/icons';
import CTButton from '@App/components/common/CTButton';
import CTHeader from '@App/components/common/CTHeader';
import CTIcon from '@App/components/common/CTIcon';
import CTImagePickerModal from '@App/components/common/CTImagePickerModal';
import CTKeyboardAvoidScrollView from '@App/components/common/CTKeyboardAvoidScrollView';
import CTLoader from '@App/components/common/CTLoader';
import CTTextInput from '@App/components/common/CTTextInput';
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import {scale} from '@App/utils/fontScaling';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image as ImageDataProps} from 'react-native-image-crop-picker';
import * as Yup from 'yup';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebaseCollections} from '@App/constants/firebase';
import {IUserDetails} from '@App/types/firebase';
import {screens} from '@App/constants/screens';
import {saveUserInfo} from '@App/utils/asyncActions';
import {AuthNavigationProps} from '@App/types/navigation';
import {useAppDispatch} from '@App/redux/store';
import {userActions} from '@App/redux/slices/userSlice';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  address: Yup.string().required('Address is required'),
});

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProps>();
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState<ImageDataProps | null>(null);
  const user = firestore().collection(firebaseCollections.users);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => onRegister(values),
  });

  const onRegister = async (formDetails: FormValues) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(formDetails.email, formDetails.password)
      .then(data => {
        createUserInFirestoreDB(data, formDetails);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.log(error);
      });
  };
  const createUserInFirestoreDB = (
    data: FirebaseAuthTypes.UserCredential,
    formDetails: FormValues,
  ) => {
    const userDetails = {
      firstName: formDetails.firstName,
      lastName: formDetails.lastName,
      address: formDetails.address,
      email: formDetails.email,
      profileImageBase64: imageData
        ? `data:${imageData.mime};base64,${imageData.data}`
        : '',
    } as IUserDetails;
    user
      .doc(data.user.uid)
      .set(userDetails)
      .then(async () => {
        setIsLoading(false);
        const storableUserInfo = {...userDetails, uid: data.user.uid};
        await saveUserInfo(storableUserInfo);
        dispatch(userActions.setUserDetails(storableUserInfo));
        navigation.replace(screens.UserStack);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('🚀 ~ RegisterScreen ~ error:', error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <CTHeader onBackPress={() => navigation.goBack()} title="SIGN UP" />
      <CTKeyboardAvoidScrollView>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => setIsPickerVisible(true)}
            style={styles.imageContainer}>
            <Image
              source={imageData ? {uri: imageData.path} : profileIcon}
              style={styles.profileImage}
            />
            <CTIcon
              source={pencilIcon}
              iconSize={15}
              style={styles.profileEditIcon}
              disabled
            />
          </TouchableOpacity>
          <CTTextInput
            label="First Name"
            onChangeText={formik.handleChange('firstName')}
            onBlur={formik.handleBlur('firstName')}
            value={formik.values.firstName}
            errorMessage={
              formik.touched.firstName ? formik.errors.firstName : undefined
            }
            containerStyle={styles.inputSpacing}
          />

          <CTTextInput
            label="Last Name"
            onChangeText={formik.handleChange('lastName')}
            onBlur={formik.handleBlur('lastName')}
            value={formik.values.lastName}
            errorMessage={
              formik.touched.lastName ? formik.errors.lastName : undefined
            }
            containerStyle={styles.inputSpacing}
          />
          <CTTextInput
            label="Address"
            onChangeText={formik.handleChange('address')}
            onBlur={formik.handleBlur('address')}
            value={formik.values.address}
            errorMessage={
              formik.touched.address ? formik.errors.address : undefined
            }
            containerStyle={styles.inputSpacing}
          />

          <CTTextInput
            label="Email"
            onChangeText={text => {
              formik.handleChange('email')(text.toLocaleLowerCase());
            }}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            keyboardType="email-address"
            errorMessage={
              formik.touched.email ? formik.errors.email : undefined
            }
            containerStyle={styles.inputSpacing}
          />

          <CTTextInput
            label="Password"
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            isPassword
            errorMessage={
              formik.touched.password ? formik.errors.password : undefined
            }
            containerStyle={styles.inputSpacing}
          />

          <CTTextInput
            label="Confirm Password"
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            value={formik.values.confirmPassword}
            isPassword
            errorMessage={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
            containerStyle={styles.inputSpacing}
          />

          <CTButton
            title="Register"
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid}
            style={{marginTop: 20, opacity: formik.isValid ? 1 : 0.5}}
          />
          <Text style={styles.signTextStyle}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.goBack()}
              style={{color: colors.primary}}>
              Sign In
            </Text>
          </Text>
        </View>
      </CTKeyboardAvoidScrollView>
      {isPickerVisible ? (
        <CTImagePickerModal
          visible={isPickerVisible}
          onClose={() => setIsPickerVisible(false)}
          onSelectImage={async image => {
            setImageData(image);
          }}
        />
      ) : null}
      <CTLoader isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inputSpacing: {
    marginTop: 20,
  },
  signTextStyle: {
    color: colors.textPrimary,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    width: scale(100),
    height: scale(100),
  },
  profileEditIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 100,
    padding: 10,
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
  },
});
