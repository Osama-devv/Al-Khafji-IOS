import React, { useMemo, useState, useCallback } from "react";
import {
    View,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    Image,
    Text,
    Linking,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import Sheet from "@components/common/sheet";
import CustomInput from "@components/common/CustomInput";
import ColorFilledButton from "@components/common/ColorFilledButton";
import { colors } from "@theme/colors";
import { LanguageEnum } from "@appTypes/enums";
import { Formik } from "formik";
import * as Yup from "yup";
import RenderCountryPickerScrollView from "@components/common/RenderCountryPickerScrollView";
import { useDebounce } from "@helpers/index";
import { delayExecution } from "@utils/helpers";
import { COUNTRY_CODES_NEW } from "@constants/app-contants";
import { $flexDirection } from "@theme/view";
import { images } from "assets/images";
import DownloadSvg from "@assets/images/svgs/download-black.svg";
import PageSvg from "@assets/images/svgs/page.svg";
import CrossSvg from "@assets/images/svgs/cross.svg";




interface DownloadBrochureSheetProps {
    show: boolean;
    onClose: () => void;
    onDownload?: (data: FormData) => void;
    appLanguage?: LanguageEnum;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required").trim(),
    lastName: Yup.string().required("Last name is required").trim(),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required")
        .trim()
        .matches(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Invalid email format"
        ),
    phoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9]+$/, "Only digits allowed")
        .min(7, "Phone number too short")
        .max(20, "Max 20 characters allowed"),
});


const SNAP_POINTS = ["95%"];
const COUNTRY_PICKER_SNAP_POINTS = ["95%", "95%"];

const DownloadBrochureSheet: React.FC<DownloadBrochureSheetProps> = ({
    show,
    onClose,
    onDownload,
    appLanguage = LanguageEnum.EN,
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [sheetLoading, setSheetLoading] = useState<boolean>(false);
    const [showDownloadScreen, setShowDownloadScreen] = useState(false);

    const [selectedCountryCode, setSelectedCountryCode] = useState(
        COUNTRY_CODES_NEW && COUNTRY_CODES_NEW.length > 0
            ? COUNTRY_CODES_NEW[0]
            : null
    );

    const [countryCodesNew] = useState(
        COUNTRY_CODES_NEW && COUNTRY_CODES_NEW.length > 0
            ? COUNTRY_CODES_NEW
            : []
    );

    const [filteredCountryList, setFilteredCountryList] =
        useState(countryCodesNew);

    const renderLeftElement = useCallback(() => {
        return (
            <View
                style={[
                    $flexDirection(appLanguage),
                    { height: "100%", alignItems: "center" },
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        setIsVisible(true);
                        setSheetLoading(true);
                        delayExecution(() => {
                            setSheetLoading(false);
                        }, 500);
                    }}
                >
                    <View
                        style={[
                            $flexDirection(appLanguage),
                            {
                                alignItems: "center",
                                gap: 8,
                                paddingRight: appLanguage === LanguageEnum.EN ? 16 : 0,
                                paddingLeft: appLanguage === LanguageEnum.AR ? 16 : 0,
                                borderRightWidth: appLanguage === LanguageEnum.EN ? 1 : 0,
                                borderLeftWidth: appLanguage === LanguageEnum.AR ? 1 : 0,
                                borderColor: "#dcdcdc",
                                height: "100%",
                            },
                        ]}
                    >
                        <Image
                            source={selectedCountryCode?.flag}
                            resizeMode={"cover"}
                            style={{ height: 20, width: 30 }}
                        />
                        <Image
                            source={images.downArrow}
                            resizeMode="center"
                            style={{ height: 8, width: 8 }}
                        />
                    </View>
                </TouchableOpacity>

                <Text
                    style={{
                        paddingLeft: appLanguage === LanguageEnum.EN ? 12 : 0,
                        paddingRight: appLanguage === LanguageEnum.AR ? 12 : 0,
                        fontSize: 22,
                        fontFamily: "Sakkal Majalla",
                        fontWeight: "400",
                    }}
                >
                    {`+${selectedCountryCode?.callingCode}`}
                </Text>
            </View>
        );
    }, [appLanguage, selectedCountryCode]);

    const isCountryPickerVisible = useDebounce(isVisible, 150);

    const handleDownloadPdf = () => {
        const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
        Linking.openURL(pdfUrl).catch((err) => console.error("An error occurred", err));
    };

    const RenderCountryPickerSheet = useMemo(() => {
        return (
            <Sheet
                show={isCountryPickerVisible}
                snapPoints={COUNTRY_PICKER_SNAP_POINTS}
                onSheetClosed={() => setIsVisible(false)}
                onSheetOpened={() => setIsVisible(true)}
                centerHeader={true}
                sheetHeaderText={"Countries"}
            >
                <RenderCountryPickerScrollView
                    setSheetLoading={setSheetLoading}
                    filteredCountryList={filteredCountryList}
                    setSelectedCountryCode={setSelectedCountryCode}
                    setIsVisible={setIsVisible}
                    appLanguage={appLanguage}
                />
            </Sheet>
        );
    }, [appLanguage, filteredCountryList, isCountryPickerVisible]);



    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
            }}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={(values) => {
                onDownload?.(values);
                setShowDownloadScreen(true);
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                setFieldValue,
            }) => {
                // Stable handlers to prevent character duplication
                const handleFirstNameChange = useCallback((text: string) => {
                    setFieldValue('firstName', text);
                }, [setFieldValue]);

                const handleLastNameChange = useCallback((text: string) => {
                    setFieldValue('lastName', text);
                }, [setFieldValue]);

                const handleEmailChange = useCallback((text: string) => {
                    setFieldValue('email', text);
                }, [setFieldValue]);

                const handlePhoneChange = useCallback((text: string) => {
                    setFieldValue('phoneNumber', text);
                }, [setFieldValue]);

                return (
                    <>
                        <Sheet
                            show={show}
                            snapPoints={SNAP_POINTS}
                            index={0}
                            sheetHeaderText="Download Brochure"
                            sheetHeaderDescription={
                                showDownloadScreen ? "" : "Please fill out the form to download the brochure"
                            }
                            onSheetClosed={() => {
                                setShowDownloadScreen(false);
                                onClose();
                            }}
                            appLanguage={appLanguage}
                            centerHeader={true}
                            rightIcon={CrossSvg}
                            backgroundImage={
                                showDownloadScreen ? undefined : images.residenceBg
                            }

                            bgColor={showDownloadScreen ? "#FFFFFF" : "transparent"}
                            headerBackgroundColor={showDownloadScreen ? "#F5F4F1" : undefined}
                            rightIconPress={() => showDownloadScreen ? setShowDownloadScreen(false) : onClose()}
                            FooterComponent={
                                !showDownloadScreen ? (
                                    <View style={styles.footerButton}>
                                        <ColorFilledButton
                                            title="Download PDF"
                                            onPress={handleSubmit}
                                            disabled={!isValid}
                                            backgroundColor={!isValid ? colors.palette.dullText : colors.palette.primaryColor}
                                            titleColor={colors.palette.white}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.footerButton}>
                                        <ColorFilledButton
                                            title="Download brochure (PDF)"
                                            backgroundColor={colors.palette.white}
                                            titleColor={colors.palette.black}
                                            rightIcon={<DownloadSvg width={20} height={20} />}
                                            onPress={() => {
                                                handleDownloadPdf();
                                                setShowDownloadScreen(false);
                                                onClose();
                                            }}
                                        />
                                    </View>
                                )
                            }
                        >
                            <View style={{ paddingBottom: 40, flex: 1 }}>

                                {!showDownloadScreen ? (
                                    <>
                                        <View style={styles.formWrapper}>
                                            <CustomInput
                                                key="firstName"
                                                label="First Name"
                                                required
                                                placeholder="Enter your first name"
                                                value={values.firstName}
                                                onChangeText={handleFirstNameChange}
                                                onBlur={handleBlur("firstName")}
                                                error={touched.firstName && errors.firstName}
                                                isRegisterInterest={true}
                                            />

                                            <CustomInput
                                                key="lastName"
                                                label="Last Name"
                                                required
                                                placeholder="Enter your last name"
                                                value={values.lastName}
                                                onChangeText={handleLastNameChange}
                                                onBlur={handleBlur("lastName")}
                                                error={touched.lastName && errors.lastName}
                                                isRegisterInterest={true}
                                            />

                                            <CustomInput
                                                key="email"
                                                label="Email"
                                                required
                                                placeholder="Enter your email"
                                                keyboardType="email-address"
                                                value={values.email}
                                                onChangeText={handleEmailChange}
                                                onBlur={handleBlur("email")}
                                                error={touched.email && errors.email}
                                                isRegisterInterest={true}
                                            />

                                            <CustomInput
                                                key="phoneNumber"
                                                label="Mobile Number"
                                                required
                                                placeholder="0-000-0000"
                                                keyboardType="phone-pad"
                                                value={values.phoneNumber}
                                                onChangeText={handlePhoneChange}
                                                onBlur={handleBlur("phoneNumber")}
                                                error={touched.phoneNumber && errors.phoneNumber}
                                                InputLeftElement={
                                                    appLanguage === LanguageEnum.EN
                                                        ? renderLeftElement()
                                                        : null
                                                }
                                                InputRightElement={
                                                    appLanguage === LanguageEnum.EN
                                                        ? null
                                                        : renderLeftElement()
                                                }
                                                isRegisterInterest={true}
                                            />
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <View style={styles.centerContent}>
                                            <PageSvg width={24} height={24} />
                                        </View>
                                    </>
                                )}
                            </View>
                        </Sheet>

                        {RenderCountryPickerSheet}
                    </>
                );
            }}
        </Formik>
    );
};

const styles = StyleSheet.create({
    formWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 24,
    },

    footerButton: {
        paddingHorizontal: 16,
        paddingBottom: 30,
        paddingTop: 8,
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
});

export default DownloadBrochureSheet;
