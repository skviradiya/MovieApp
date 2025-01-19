import {pencilIcon, profileIcon} from '@App/assets/icons';
import CTButton from '@App/components/common/CTButton';
import CTHeader from '@App/components/common/CTHeader';
import CTIcon from '@App/components/common/CTIcon';
import CTImagePickerModal from '@App/components/common/CTImagePickerModal';
import CTKeyboardAvoidScrollView from '@App/components/common/CTKeyboardAvoidScrollView';
import CTTextInput from '@App/components/common/CTTextInput';
import colors from '@App/constants/colors';
import {firebaseCollections} from '@App/constants/firebase';
import {UserNavigationProps} from '@App/types/navigation';
import {scale} from '@App/utils/fontScaling';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Yup from 'yup';

import CTLoader from '@App/components/common/CTLoader';
import {userActions} from '@App/redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '@App/redux/store';
import {IUserDetails} from '@App/types/firebase';
import {saveUserInfo} from '@App/utils/asyncActions';
import firestore from '@react-native-firebase/firestore';

interface FormValues {
  firstName: string;
  lastName: string;
  address: string;
  profileImageBase64: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  address: Yup.string().required('Address is required'),
});

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(data => data.user.userDetails);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const firestoreRef = firestore()
    .collection(firebaseCollections.users)
    .doc(userData?.uid);
  const navigation = useNavigation<UserNavigationProps>();
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      address: userData?.address || '',
      profileImageBase64: userData?.profileImageBase64 || '',
    },
    validationSchema: validationSchema,
    onSubmit: values => onUpdate(values),
  });
  const onUpdate = async (values: FormValues) => {
    try {
      setIsLoading(true);
      await firestoreRef.update(values);
      const storableUserInfo = {...userData, ...values} as IUserDetails;
      dispatch(userActions.setUserDetails(storableUserInfo));
      await saveUserInfo(storableUserInfo);
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      console.log('🚀 ~ onUpdate ~ error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <CTHeader onBackPress={() => navigation.goBack()} title={'Profile'} />
      <View style={styles.flexContainer}>
        <CTKeyboardAvoidScrollView style={styles.scrollViewContent}>
          <TouchableOpacity
            onPress={() => setIsPickerVisible(true)}
            style={styles.imageContainer}>
            <Image
              source={
                formik.values.profileImageBase64
                  ? {uri: formik.values.profileImageBase64}
                  : profileIcon
              }
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

          <CTButton
            title="Update"
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid}
            style={{marginTop: 20, opacity: formik.isValid ? 1 : 0.5}}
          />
        </CTKeyboardAvoidScrollView>
      </View>
      {isPickerVisible ? (
        <CTImagePickerModal
          visible={isPickerVisible}
          onClose={() => setIsPickerVisible(false)}
          onSelectImage={async image => {
            const imageData = image.data
              ? `data:${image.mime};base64,${image.data}`
              : '';
            formik.handleChange('profileImageBase64')(imageData);
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
  flexContainer: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
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

  inputSpacing: {
    marginTop: 20,
  },
});
