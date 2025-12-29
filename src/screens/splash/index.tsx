import { ImageBackground, View } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '@assets/images/svgs/LogoSplash.svg';
import { logCustomEvent } from '@utils/helpers';
import { useSelector } from 'react-redux';

import { IState } from '@reducers/index';

const Splash = () => {
    useEffect(() => {
        logCustomEvent('Splash').then(() => {});
    }, []);
    const { options: authOptions } = useSelector((state: IState) => state.auth);
    const { loggedIn } = authOptions;

    return (
      <ImageBackground
        source={require('@assets/images/splashbackground.png')} // Change to your background image path
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EFEDE9',
        }}
        resizeMode={'cover'}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Logo />
        </View>
        {/* <Spinner
                color="singletons.white"
                size={'lg'}
                position={'absolute'}
                top={'65%'}
            /> */}
      </ImageBackground>
    );
};

export default Splash;
