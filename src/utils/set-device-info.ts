import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setStartupDeviceInfo } from '@reducers/startup/startup-slice';
import { getDeviceName, getUniqueId } from 'react-native-device-info';
import { IState } from '@reducers/index';

export function SetDeviceInfo() {
    /** set device info in store
     * return Promise
     */

    const dispatch = useDispatch();
    const { deviceName, deviceId, deviceOS } = useSelector(
        (state: IState) => state.startup.deviceInfo,
    );

    useEffect(() => {
        const prevStateQuery = async (): Promise<void> => {
            const _deviceName = await getDeviceName();
            const _deviceId = await getUniqueId();
            const _deviceOS = Platform.OS;
            dispatch(
                setStartupDeviceInfo({
                    deviceId: _deviceId,
                    deviceName: _deviceName,
                    deviceOS: _deviceOS,
                }),
            );
        };

        if (!deviceName || !deviceId || !deviceOS) {
            prevStateQuery();
        }
    }, [deviceName, deviceId, deviceOS, dispatch]);
}
