import { LanguageEnum } from '@appTypes/enums';
import { IState } from '@reducers/index';
import { $flexDirection, $textAlign } from '@theme/view';
import {images} from 'assets/images';
import {Image, StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';

const Education = () => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  
  return (
    <View>
      <View style={styles.imgContainer}>
        <Image 
        source={images.education} 
        style={{height: 182, width: '100%'}} />
        <Text style={[styles.title , $textAlign(appLanguage)]}>Learning for every journey</Text>
        <Text style={[styles.desc , $textAlign(appLanguage)]}>
          National and international schools give families{'\n'}access to
          high-quality learning, from early years{'\n'}through to higher
          education.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    marginTop:24,
    marginBottom:55,
    marginHorizontal:16,
  },
  title: {
    paddingVertical:16,
    fontSize:18,
    fontFamily:'Charter'
  },
  desc: {
    fontSize:22,
    fontFamily:'Sakkal Majalla',
    fontWeight:400,
    lineHeight: 22,
  }
});

export default Education;
