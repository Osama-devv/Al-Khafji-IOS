const en = {
    Common: {
        ViewAll: 'View All',
        ViewMore: 'View More',
        Days: 'days',
        Hours: 'hours',
        Minutes: 'mins',
        Seconds: 'seconds',
        Search: 'Search',
        English: 'English',
        Arabic: 'اللغة',
        Ok: 'OK',
        Speaker: 'Speakers',
        BackTo: 'Back to',
        resetAll: 'Reset All',
        apply: 'Apply',
        organizer: 'ORGANISER',
        corePartners: 'CORE PARTNERS',
        participatingPartners: 'PARTICIPATING PARTNERS',
        mediaPartners: ' MEDIA PARTNERS',
        somethingWentWrong: 'Something went wrong!',
        permissionNotGranted: 'Permission not granted',
        error: 'Error',
        noInternet: 'no internet connection',
        tryAgain: 'please try again',
    },
    MoreScreen: {
        AboutUs: 'About us',
        Partners: 'Partners',
        ContactInfo: 'Contact Info',
        Resources: 'Resources',
        SignUpForNewsLetter: 'Sign up for NewsLetter',
        ModalTitle: 'SUCCESSFUL!',
        ModalMessage: 'Successfully Submitted!.',
        ModalWarning: 'WARNING!',
    },
    BottomTab: {
        Home: 'Home',
        Programs: 'Programs',
        Speakers: 'Speakers',
        Notifications: 'Notifications',
        More: 'More',
    },
    HomeScreen: {
        CultureSummit: 'Al Khafji ‘23',
        ProgramHighlights: 'Programme Highlights',
        ClimateEmergencyCardTitle:
            'CLIMATE EMERGENCY AND DECISION MAKING: A RACE AGAINST TIME',
        EmbraceChangeTitle: 'EMBRACE CHANGE AT THIS YEARS SUMMIT',
        OurSummitTitle: 'OUR SUMMIT',
        OutSummitParagraph:
            'Al Khafji Abu Dhabi is an annual global cultural forum that brings together leaders, experts, and practitioners from around the world to exchange ideas and explore ways to promote culture and cultural understanding. The event also provides a platform for networking and collaboration among cultural professionals and enthusiasts.',
        MatterOfTimeTitle: 'A MATTER OF TIME',
        MatterOfTimeParagraph:
            'The Embracing Change: Navigating a World in Flux theme for the Al Khafji Abu Dhabi is set to explore the transformative power of art and culture in times of unprecedented change. Through a series of thought-provoking discussions, inspiring performances, and interactive workshops, the summit will bring together leading artists, thinkers, and cultural leaders from around the world to examine the role of culture in shaping a more equitable and sustainable future.',
        VenueMapTitle: 'Venue Map',
    },
    ProgramsScreen: {
        title: 'Programme',
        filter: 'Filters',
        dates: {
            Oct29: 'OCT 29',
            Oct30: 'OCT 30',
            Nov1: 'Nov 1',
            AllDays: 'All Days',
        },
        card: {
            Time: 'Time:',
            Location: 'Location:',
            Type: 'Type:',
        },
        programDetails: {
            AddEvent: 'Add Event to Calendar',
            AddedEventToCalender: 'Already added to calender',
            successMessage: 'Event added to calender',
            errorMessage: 'Event Not Added to Calendar',
            successTitle: 'Success',
            errorTitle: 'Cancelled',
        },
        category: 'Session Category',
        Time: 'Time',
        Location: 'Location',
    },
    ContactScreen: {
        firstName: 'E.g Mohammad',
        lastName: 'E.g Ali',
        mobile: '+97 00000 000 00',
        email: 'name@example.com',
        message: 'Write your message here...',
        Heading: 'Countries',
        Inquiry: 'Inquiry here',
        description:
            'We value your input and inquiries as we strive to create an enriching experience for all participants. Whether you have questions about the event, need assistance, or want to share your insights, this is the space where meaningful connections are fostered.',
        labels: {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            valueMessage:
                'We value your input and inquiries as we strive to create an enriching experience for all participants. Whether you have questions about the event, need assistance, or want to share your insights, this is the space where meaningful connections are fostered.',
            Number: 'Number',
            inquiryType: 'Inquiry Type',
            Message: 'Message',
            Characters: 'characters',
            Submit: 'Submit',
        },
        validations: {
            firstNameValid: 'Enter a valid First name',
            firstNameLengthMin:
                'First Name should be of minimum 2 characters length',
            firstNameLengthMax:
                'First Name should be of max 20 characters length',
            firstNameRequired: 'First Name is required',
            lastNameValid: 'Enter a valid Last name',
            lastNameLengthMin:
                'Last Name should be of minimum 2 characters length',
            lastNameLengthMax:
                'Last Name should be of max 20 characters length',
            lastNameRequired: 'Last Name is required',
            NumberRequired: 'Number is required',
            NumberValid: 'Invalid Number',
            EmailRequired: 'Email is required',
            EmailValid: 'Enter a valid email address',
            MessageRequired: 'Message is required',
            MessageValid: 'Character Limit Exceed',
            InquiryRequired: 'Inquiry type is required',
        },
    },
    Partners: {
        para: 'Al Khafji is made possible through the collaboration of passionate individuals and organizations committed to our vision. We extend our gratitude to our esteemed partners who share our values and contribute to the success of this transformative event. Meet the dedicated organizers who have poured their hearts into curating an unforgettable experience.',
    },
    General: {
        noRecordsFound: 'No Records Found.',
    },
};

export default en;
export type Translations = typeof en;
