import {LanguageEnum} from '@appTypes/enums';
import {IState} from '@reducers/index';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {$flexDirection, $textAlign} from '@theme/view';
import Card from './Card';
import {IsValidArray} from '@utils/helpers';

const Experience = ({data}: any) => {
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  // const experienceData = [
  //   {id: 1, svg: Waves, title: 'Sea & Sun', backgroundColor: '#7DA8D9'},
  //   {id: 2, svg: Sparks, title: 'Entertainment', backgroundColor: '#1F386C'},
  //   {id: 3, svg: Shoping, title: 'Lifestyle', backgroundColor: '#A0805C'},
  //   {
  //     id: 4,
  //     svg: Community,
  //     title: 'Culture & Heritage',
  //     backgroundColor: '#3A5935',
  //   },
  //   {
  //     id: 5,
  //     svg: Tennis,
  //     title: 'Sport & Adventure',
  //     backgroundColor: '#00646E',
  //   },
  //   {
  //     id: 6,
  //     svg: Shoping,
  //     title: 'Wellness & Relaxation',
  //     backgroundColor: '#8CA654',
  //   },
  // ];

  return (
    <View>
      {data?.title && (
        <View style={[styles.container, $flexDirection(appLanguage)]}>
          <Text style={styles.txt}>{data?.title}</Text>
        </View>
      )}

      {/* Experience Cards */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 16,
          paddingBottom: 32,
          gap: 8,
        }}>
        {IsValidArray(data?.events) &&
          data?.events?.map((item: any, index :number) => {
            const c = item?.properties;
            return (
              <Card
                key={index}
                svg={c?.mobileIcon?.src}
                title={c?.displayText}
                backgroundColor={c.backgroundColor}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
  },
  imgtxt: {
    marginVertical: 20,
    marginHorizontal: 12,
  },
  imgtxt1: {
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.40)',
    height: 32,
    width: 114,
    color: 'white',
    fontWeight: 700,
    textAlign: 'center',
    paddingVertical: 4,
  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 18,
    fontWeight: '400',
  },
  imageContainer: {
    marginVertical: 16,
    // marginHorizontal:8,
  },
  smartCity: {
    width: 325,
    height: 172,
    // marginHorizontal: 12,
  },
  container1: {
    // marginHorizontal: 12,
    backgroundColor: '#f8f9fa',
    width: 325,
    height: 108,
    paddingHorizontal: 12,
    // paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    // fontWeight: 700,
    fontFamily: 'Charter',
    lineHeight: 23,
  },
  svgTxt: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  date: {
    paddingHorizontal: 9,
    fontWeight: 400,
    fontFamily: 'Sakkal Majalla',
    fontSize: 22,
    color: '#333A3B',
  },
});

export default Experience;
