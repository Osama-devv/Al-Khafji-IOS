import { LanguageEnum } from '@appTypes/enums';
import BottomCard from '@components/BottomCard/BottomCard';
import Separator from '@components/common/Separator';
import SvgRenderer from '@components/common/SvgRenderer/SvgRender';
import { IState } from '@reducers/index';
import { $flexDirection } from '@theme/view';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import InputArrow from '@assets/images/svgs/inputArrow.svg';
import { useState } from 'react';
import Sheet from '@components/common/sheet';
import phone from '@assets/images/svgs/phone.svg';
import MessageField from '@components/MessageField/MessageField';

const ContactField = ({ data }: any) => {
  const { options } = useSelector((state: IState) => state.startup);
  const { language } = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  const [showSheet, setShowSheet] = useState(false);

  const links = data?.links || [];

  return (
    <View>
      {links.map((link: any, index: number) => {
        const alias = link?.alias;
        const title = link?.properties?.label
        const svg = link?.properties?.svg?.src

        // -------------------------------------------
        if (alias === 'LabelWithSvgWithCta') {
          return (
            <BottomCard
              key={index}
              title={title}
              svg={svg}
            />
          );
        }

        if (alias === 'mobileGetInTouchFormPopup') {
          return (
            <View key={index}>
              <BottomCard
                title={title}
                svg={svg}
                onPress={() => setShowSheet(true)}
              />

              {showSheet && (
                <Sheet
                  show={showSheet}
                  snapPoints={['80%', '98%']}
                  onSheetClosed={() => setShowSheet(false)}
                  bgColor="#EFEDE9"
                  centerHeader={true}
                  sheetHeaderText={title}
                  leftIcon={InputArrow}
                  appLanguage={appLanguage}
                  leftIconPress={() => setShowSheet(false)}
                >
                  <MessageField  data ={link?.properties}/>
                </Sheet>
              )}
            </View>
          );
        }

        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontFamily: 'Charter',
    fontSize: 20,
  },
});

export default ContactField;
