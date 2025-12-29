import { LanguageEnum } from '@appTypes/enums';
import { ICustomInputProps } from '@appTypes/type';
import { IState } from '@reducers/index';
import { $flexDirection, $textAlign } from '@theme/view';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import Necessary from '@assets/images/svgs/Necessary.svg';
import SvgRenderer from '../SvgRenderer/SvgRender';

interface IProps extends ICustomInputProps {
  InputLeftElement?: React.ReactNode;
  InputRightElement?: React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  onBlur?: (e: any) => void;
}

const CustomInput = ({
  label,
  required,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  error,
  InputLeftElement,
  InputRightElement,
  onPressLeft,
  onPressRight,
  isReadOnly = false,
  isRegisterInterest = false,
  onBlur,
}: IProps) => {
  const { options } = useSelector((state: IState) => state.startup);
  const { language } = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  return (
    <View style={{ width: '100%' }}>
      {label && (
        <View style={[$flexDirection(appLanguage), { gap: 2 }]}>
          <Text style={[styles.label, $textAlign(appLanguage)]}>
            {label}
          </Text>
          {required ? (
            <SvgRenderer src={Necessary} style={{ width: 4, height: 4 }} />
          ) : null}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          isRegisterInterest && {
            backgroundColor: 'rgba(255, 255, 255, 0.40)',
            borderWidth: 0.5,
            borderColor: error ? 'red' : 'rgba(0, 0, 0, 0.40)',
          },
          appLanguage === LanguageEnum.AR && !isReadOnly && {
            justifyContent: 'flex-end',
          },
        ]}
      >
        {InputLeftElement && (
          <TouchableOpacity
            onPress={onPressLeft}
            style={styles.leftElement}
            activeOpacity={0.7}
          >
            {InputLeftElement}
          </TouchableOpacity>
        )}

        <TextInput
          style={[
            styles.input,
            $textAlign(appLanguage),
            { flex: 1 },
            Platform.OS === 'android' && { top: 0.5 },
          ]}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          value={value}
          editable={!isReadOnly}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          textAlignVertical="center"
        // includeFontPadding={false}
        />

        {InputRightElement && (
          <TouchableOpacity
            onPress={onPressRight}
            style={styles.rightElement}
            activeOpacity={0.7}
          >
            {InputRightElement}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.error, $textAlign(appLanguage)]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    fontFamily: 'Sakkal Majalla',
    marginBottom: Platform.OS === 'ios' ? 6 : 10,
    fontWeight: '400',
  },
  inputContainer: {
    width: '100%',
    height: 48,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    borderRadius: 2,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftElement: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rightElement: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontFamily: 'Sakkal Majalla',
    fontWeight: '400',
    color: '#000',
    paddingHorizontal: 6,
    paddingVertical: 0,
  },
  error: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Sakkal Majalla',
  },
});

export default React.memo(CustomInput);
// 