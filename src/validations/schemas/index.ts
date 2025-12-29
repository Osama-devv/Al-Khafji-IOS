import { translate } from '@i18n/translate';
import * as Yup from 'yup';

export const contactFormValidationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, `${translate('ContactScreen.validations.firstNameLengthMin')}`)
        .max(20, `${translate('ContactScreen.validations.firstNameLengthMax')}`)
        .required(
            `${translate('ContactScreen.validations.firstNameRequired')}`,
        ),
    lastName: Yup.string()
        .min(2, `${translate('ContactScreen.validations.lastNameLengthMin')}`)
        .max(20, `${translate('ContactScreen.validations.lastNameLengthMax')}`)
        .required(`${translate('ContactScreen.validations.lastNameRequired')}`),
    number: Yup.string()
        .required(`${translate('ContactScreen.validations.NumberRequired')}`)
        .matches(
            /^\+[0-9 ]{8,14}$/,
            `${translate('ContactScreen.validations.NumberValid')}`,
        ),
    email: Yup.string()
        .required(`${translate('ContactScreen.validations.EmailRequired')}`)
        .email(`${translate('ContactScreen.validations.EmailValid')}`)
        .matches(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            `${translate('ContactScreen.validations.EmailValid')}`,
        ),
    message: Yup.string()
        .required(`${translate('ContactScreen.validations.MessageRequired')}`)
        .test(
            'characterLimit',
            `${translate('ContactScreen.validations.MessageValid')}`,
            function (value) {
                return value.length <= 500;
            },
        ),
    generalInquiry: Yup.object().shape({
        id: Yup.string().required(
            `${translate('ContactScreen.validations.InquiryRequired')}`,
        ),
        name: Yup.string().required(
            `${translate('ContactScreen.validations.InquiryRequired')}`,
        ),
        description: Yup.string().required(
            `${translate('ContactScreen.validations.InquiryRequired')}`,
        ),
    }),
});

export const newsletterSchema = Yup.object({
    email: Yup.string()
        .required(`${translate('ContactScreen.validations.EmailRequired')}`)
        .email(`${translate('ContactScreen.validations.EmailValid')}`)
        .matches(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            `${translate('ContactScreen.validations.EmailValid')}`,
        ),
});
