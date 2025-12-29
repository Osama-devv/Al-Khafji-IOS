import {images} from 'assets/images';
import {Image, StyleSheet, Text, View} from 'react-native';
import SvgRenderer from '../common/SvgRenderer/SvgRender';
import Clock from '../../../assets/images/svgs/clock.svg';
import { useSelector } from 'react-redux';
import { IState } from '@reducers/index';
import { LanguageEnum } from '@appTypes/enums';
import { $flexDirection, $textAlign } from '@theme/view';


type ActivityCard = {
  image?: any;
  title?: string;
  date?: string;
  desc?: string;
};


const Card = ({image,title, date, desc}: ActivityCard) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  
  return (
    <View style={[styles.main , $flexDirection(appLanguage)]}>
      {image && <Image source={{uri: image}} style={{height: 100, width: 123 , borderTopLeftRadius:2 , borderBottomLeftRadius:2}}  />}
      <View style={styles.txt}>
        {title && <Text style={[styles.title , $textAlign(appLanguage)]}>{title}</Text>}
        <View style={[styles.dateContent ,$flexDirection(appLanguage)]}>
          <SvgRenderer
            src={Clock}
            style={
            {height: 16, width: 16, marginTop:6}}
          />
          {date && <Text style={styles.date}>{date}</Text>}
          <Image
            source={images.line}
            style={{width: 1, height: 14, marginHorizontal: 4, marginTop:6}}
          />
          {desc && <Text style={styles.desc}>{desc}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // paddingHorizontal:16,
    // marginTop:12,
    // marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor:'#FFFFFF',
    borderRadius:2,
  },
  txt: {
    paddingTop:22,
    paddingHorizontal:12,
  },
  title: {
    fontSize:16,
    // fontWeight:700,
    fontFamily:'Charter',
  },
  dateContent: {
    paddingTop:12,
  },
  date: {
    fontSize:20,
    fontWeight:'400',
    paddingHorizontal:6,
    fontFamily:'Sakkal Majalla',
    color: '#333A3B'
  },
  desc: {
    paddingHorizontal:4,
    fontSize:20,
    fontWeight:'400',
    fontFamily:'Sakkal Majalla',
    color: '#333A3B'
}
})

export default Card;
