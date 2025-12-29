// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
    primaryColor: "#00646E",
    secondaryColor: "#EEECE8",
    tabInactive: "#fff",
    white: "#ffffff",
    textPrimary: "#000000",
    textSecondary: "#262C2C",
    subtitle: "#666",
    dullText: "#333A3B",
    greyBorderColor: "#b0acacff",
    sliderBackground: '#D9D9D9',
    outerCircle: '#8B8B8B4D',
    innerCircle: "#dbdbdbff",
    borderColor: "#00000033",
    timeLineBackground: '#BDD6DA',
    destinationCardColor: '#1F386C',
    factBackground: '#00646E',
    black: '#000000',
    buttonBackground: '#F5F4F1',
    placeholder: '#ABA6A3'
}


export const colors = {
    /**
     * The palette is available to use, but prefer using the name.
     * This is only included for rare, one-off cases. Try to use
     * semantic names as much as possible.
     */
    palette,
    /**
     * A helper for making something see-thru.
     */
    transparent: 'rgba(0, 0, 0, 0)',
    /**
     * The default text color in many components.
     */
    textPrimary: palette.textPrimary,
    /**
     * Secondary text information.
     */
    textSecondary: palette.textSecondary,
    placeholder: palette.placeholder,
    /**
    /**
     * The default border color.
     */
    borderColor: palette.borderColor,
    /**
     * Error Background.
     *
     */
    // errorBackground: palette.angry100,
    tabactive: palette.primaryColor,
    tabinactive: palette.tabInactive,
};
