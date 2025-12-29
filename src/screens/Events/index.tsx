import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {IState} from '@reducers/index';

import {Screen} from '@components/common/Screen/Screen';
import Splash from '@screens/splash';

import {delayExecution} from '@utils/helpers';
import {setStartupOptions} from '@reducers/startup/startup-slice';

import {emptySplitApi} from '@services/emptySplitApi';
import {SERVICE_TAGS} from '@constants/index';
import {changeLanguage} from '@i18n/translate';

import {LanguageEnum} from '@appTypes/enums';
import {useNavigation} from '@react-navigation/native';
import type {AppNavigationProps} from '@navigators/app-stack-params';
import {ABOUT_SCREEN} from '@navigators/navigation-routes';

const Events = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AppNavigationProps>();

  const {options} = useSelector((state: IState) => state.startup);

  const {isLanguageProcessing, language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  // Static sections
  const staticSections = {
    en: [
      {id: 1, title: 'About GCDC'},
      {id: 2, title: 'Events'},
      {id: 3, title: 'Masterplan'},
    ],
    ar: [
      {id: 1, title: 'عن مركز التنمية'},
      {id: 2, title: 'الفعاليات'},
      {id: 3, title: 'المخطط العام'},
    ],
  };

  // Available language options
  const availableLanguages: { code: LanguageEnum; name: string }[] = [
    { code: LanguageEnum.EN, name: 'English' },
    { code: LanguageEnum.AR, name: 'عربي' },
  ];

  // Handle list item click
  const handleItemPress = (item: {id: number}) => {
    switch (item.id) {
      case 1:
        navigation.navigate(ABOUT_SCREEN);
        break;
      default:
        break;
    }
  };

  // Artificial loading handler
  const handleLoading = () => {
    delayExecution(() => {
      dispatch(setStartupOptions({isLanguageProcessing: false}));
    }, 1500);
  };

  // Toggle language
  const languageToggle = (langCode: LanguageEnum) => {
    dispatch(emptySplitApi.util?.resetApiState());
    dispatch(emptySplitApi.util.invalidateTags(SERVICE_TAGS));

    handleLoading();

    dispatch(
      setStartupOptions({
        language: langCode,
        isLanguageProcessing: true,
      }),
    );

    changeLanguage(langCode);
  };

  // Show splash while switching language
  if (isLanguageProcessing) {
    return <Splash />;
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      {/* Language Switcher */}
      <View style={styles.languageBar}>
        {availableLanguages.map((lang, i) => (
          <React.Fragment key={i}>
            <TouchableOpacity
              disabled={appLanguage === lang.code} // disable current language
              onPress={() => languageToggle(lang.code)}
            >
              <Text
                style={[
                  styles.langText,
                  appLanguage === lang.code && {opacity: 0.5},
                ]}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>

            {i < availableLanguages.length - 1 && (
              <Text style={styles.separator}> | </Text>
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Section List */}
      {/* <FlatList
        data={staticSections[appLanguage]}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemPress(item)}
          >
            <Text
              style={[
                styles.title,
                {textAlign: appLanguage === LanguageEnum.AR ? 'right' : 'left'},
              ]}
            >
              {item.title || 'Untitled'}
            </Text>
          </TouchableOpacity>
        )}
      /> */}
    </Screen>
  );
};

export default Events;

// -----------------------------------
// Styles
// -----------------------------------
const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  languageBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  langText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0066cc',
  },
  separator: {
    color: '#ccc',
    fontSize: 16,
    marginHorizontal: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
});
