import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bars3BottomLeftIcon,
  CheckBadgeIcon,
} from 'react-native-heroicons/solid';
import {RFValue} from 'react-native-responsive-fontsize';
import MetaAILogo from '../assets/logo_s.jpeg';
import CustomText from './CustomText';
import { useDispatch } from 'react-redux';
import { clearAllChats } from '../redux/reducers/chatSlice';

export default function CustomHeader(): JSX.Element {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.subContainer}>
          <TouchableOpacity>
            <Bars3BottomLeftIcon size={RFValue(20)} color="white" />
          </TouchableOpacity>

          <View style={styles.flexRow}>
            <Image source={MetaAILogo} style={styles.img} />
            <View>
              <CustomText fontWeight="bold">
                Meta AI <CheckBadgeIcon color="#27d366" size={16} />
              </CustomText>
              <CustomText fontWeight={'500'} opacity={0.7} style={12}>
                With Llama 3
              </CustomText>
            </View>
          </View>

          <TouchableOpacity onPress={() => {
            dispatch(clearAllChats())
          }}>
            <CustomText size={14}>Clear</CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(20,25,46,1)',
    borderBottomWidth: 0.18,
    borderBottomColor: 'rgba(62,62,63,1)',
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  img: {
    height: 38,
    width: 38,
    borderRadius: 40,
  },
});
