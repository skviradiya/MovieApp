/* eslint-disable react-native/no-inline-styles */
import CTButton from '@App/components/common/CTButton';
import CTKeyboardAvoidScrollView from '@App/components/common/CTKeyboardAvoidScrollView';
import CTLoader from '@App/components/common/CTLoader';
import CTTextInput from '@App/components/common/CTTextInput';
import colors from '@App/constants/colors';
import {firebaseCollections} from '@App/constants/firebase';
import {fonts} from '@App/constants/fonts';
import {screens} from '@App/constants/screens';
import {userActions} from '@App/redux/slices/userSlice';
import {useAppDispatch} from '@App/redux/store';
import {IUserDetails} from '@App/types/firebase';
import {AuthNavigationProps} from '@App/types/navigation';
import {saveUserInfo} from '@App/utils/asyncActions';
import {fontScale} from '@App/utils/fontScaling';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function SignInScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProps>();
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = firestore().collection(firebaseCollections.users);
  const formik = useFormik<FormValues>({
    initialValues: {email: '', password: ''},
    validationSchema: validationSchema,

    onSubmit: values => {
      userLogin(values);
    },
  });
  const userLogin = (values: FormValues) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(data => {
        fetchUserDetailsFromDB(data);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/invalid-credential') {
          setAuthErrorMessage('Please enter valid credentials');
        } else {
          setAuthErrorMessage(error.message);
        }
        console.log('🚀 ~ .userLogin ~ error:', error);
      });
  };
  const fetchUserDetailsFromDB = async (
    data: FirebaseAuthTypes.UserCredential,
  ) => {
    setIsLoading(false);
    try {
      const userDoc = await user.doc(data.user.uid).get();
      const userData = userDoc.data() as IUserDetails;
      const storableUserInfo = {...userData, uid: data.user.uid};
      dispatch(userActions.setUserDetails(storableUserInfo));
      await saveUserInfo(storableUserInfo);
      navigation.replace(screens.UserStack);
    } catch (error) {
      console.log('🚀 ~ fetchUserDetailsFromDB ~ error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <CTKeyboardAvoidScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>SIGN IN</Text>

          <CTTextInput
            label="Email"
            onChangeText={text => {
              formik.handleChange('email')(text.toLocaleLowerCase());
              setAuthErrorMessage('');
            }}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            keyboardType="email-address"
            errorMessage={
              formik.touched.email ? formik.errors.email : undefined
            }
          />

          <CTTextInput
            label="Password"
            onChangeText={text => {
              formik.handleChange('password')(text);
              setAuthErrorMessage('');
            }}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            isPassword
            containerStyle={styles.passContainer}
            errorMessage={
              formik.touched.password ? formik.errors.password : undefined
            }
          />
          {authErrorMessage ? (
            <Text style={styles.errorMessage}>{authErrorMessage}</Text>
          ) : null}

          <CTButton
            title="Sign In"
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid}
            style={{marginTop: 20, opacity: formik.isValid ? 1 : 0.5}}
          />
          <Text style={styles.signUpTextStyle}>
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate(screens.RegisterScreen)}
              style={{color: colors.primary}}>
              Sign Up
            </Text>
          </Text>
        </View>
      </CTKeyboardAvoidScrollView>
      <CTLoader isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleText: {
    fontSize: fontScale(30),
    fontFamily: fonts.ExtraBold,
    color: colors.primary,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  passContainer: {
    marginTop: 20,
  },
  signUpTextStyle: {
    color: colors.textPrimary,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    marginTop: 20,
  },
  errorMessage: {
    color: colors.warning,
    fontFamily: fonts.Medium,
    fontSize: fontScale(11),
    marginLeft: 10,
  },
});

export default SignInScreen;
