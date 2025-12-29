import React from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, StyleSheet, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import { ICustomTextArea } from '@appTypes/type';
import { LanguageEnum } from '@appTypes/enums';
import { $textAlign } from '@theme/view';

const CustomTextArea = ({
  placeholder,
  isInvalid,
  isDisabled,
  headerPlacholder,
  errorMessage,
  InputLeftElement,
  InputRightElement,
  value,
  onChangeText,
  isReadOnly,
  keyboardType,
  onPress,
  isFocused,
  multiline,
  numberOfLines,
  maxLimit,
  height = 199,
  enablesReturnKeyAutomatically = false,
}: ICustomTextArea) => {
  const {options} = useSelector((state: IState) => state.startup);
  const appLanguage: LanguageEnum =
    options?.language ?? LanguageEnum.AR;

  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{width: '100%'}}>
        {/* Header Label */}
        {headerPlacholder && (
          <Text
            style={[
              $textAlign(appLanguage),
              styles.headerText,
            ]}>
            {headerPlacholder}
          </Text>
        )}

        {/* Textarea Container */}
        <View
          style={[
            styles.container,
            // $baseInput,
            // isInvalid ? $invalidBorder : null,
            {height},
          ]}>
          <TextInput
            style={[
              $textAlign(appLanguage),
              styles.textInput,
              {
                height,
                width:
                  InputLeftElement && InputRightElement
                    ? '100%'
                    : InputLeftElement || InputRightElement
                    ? '80%'
                    : '100%',
              },
            ]}
            placeholderTextColor={'#A3A3A3'}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            editable={!isDisabled && !isReadOnly}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLimit}
            textAlignVertical="top"
          />
        </View>

        {/* Error Message */}
        {errorMessage && (
          <Text
            style={[
              $textAlign(appLanguage),
              styles.errorText,
              isInvalid && {color: '#ff4d4d'},
            ]}>
            {errorMessage}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomTextArea;

const styles = StyleSheet.create({
  headerText: {
   fontSize: 22,
    fontFamily: 'Sakkal Majalla',
    // marginTop: 16,
    marginBottom: Platform.OS === 'ios' ?  6 : 10,
    // marginHorizontal: 20,
    fontWeight: '400',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.40)',
    borderRadius: 2,
  },
  textInput: {
    color: '#000',
    padding: 16,
    fontFamily: 'Sakkal Majalla',
    fontSize: 22,
    lineHeight: 22
  },
  errorText: {
    color: 'red',
    marginHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Sakkal Majalla',
  },
});
