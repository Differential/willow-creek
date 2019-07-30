const colors = {
  primary: '#243E85',
  secondary: '#022C71',
  tertiary: '#8AA7C5',
  screen: '#FCFCFC',
  paper: '#FFFFFF',
  alert: '#c64f55',

  // Dark shades
  darkPrimary: '#303030',
  darkSecondary: '#999899',
  darkTertiary: '#C9C8C7',

  // Light shades
  lightPrimary: '#FCFCFC',
  lightSecondary: '#C9C8C7',
  lightTertiary: '#999899',
  // Statics
  wordOfChrist: '#8b0000', // only used in Scripture.
  background: {
    accent: '#9BCBEB',
  },
};

const typography = {
  baseFontSize: 16,
  baseLineHeight: 23.04, // 1.44 ratio
  // sans: {
  //   regular: {
  //     default: 'Gotham-Book',
  //     italic: 'Gotham-BookItalic',
  //   },
  //   medium: {
  //     default: 'Gotham-Medium',
  //     italic: 'Gotham-Medium',
  //   },
  //   bold: {
  //     default: 'Gotham-Medium',
  //     italic: 'Gotham-Medium',
  //   },
  //   black: {
  //     default: 'Gotham-Bold',
  //     italic: 'Gotham-BoldItalic',
  //   },
  // },
};

const overrides = {
  H1: {
    fontFamily: 'Gotham-Bold',
    fontSize: 43,
    lineHeight: 50,
  },
  H2: {
    fontFamily: 'Gotham-Bold',
    fontSize: 36,
    lineHeight: 39,
  },
  H3: {
    fontFamily: 'Gotham-Bold',
    fontSize: 24,
    lineHeight: 28,
  },
  'Onboarding.SlideContent.Title': {
    color: '#FFFFFF',
  },
  'Onboarding.SlideContent.Description': {
    color: '#FFFFFF',
  },
  'InputUnderline.blurred': {
    backgroundColor: '#ffffff',
  },
  'InputUnderline.focused': {
    backgroundColor: '#ffffff',
  },
  // 'Slide.NavWrapper': {
  //   justifyContent: 'space-around',
  //   alignItems: 'stretch',
  //   flexDirection: 'column',
  // },
  'Onboarding.Slide.PrimaryButton': {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    flex: 1,
    // borderRadius: 8,
  },
  'Onboarding.Slide.SkipButton': {
    // alignSelf: 'flex-end',
  },
  'Onboarding.Swiper.PaginationDot.Active': {
    backgroundColor: '#ffffff',
  },
  'Onboarding.Swiper.PaginationDot': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  'DateInput.Chip': {
    backgroundColor: 'transparent',
    borderColor: 'white',
  },
  'ui-auth.TitleText': {
    color: '#FFFFFF',
  },
  'ui-auth.PromptText': {
    color: '#FFFFFF',
  },
  // H4: {
  //   lineHeight: 16,
  // },
  // H5: {
  //   textTransform: 'uppercase',
  //   color: colors.darkSecondary,
  // },
  // H6: {
  //   lineHeight: 16,
  //   fontFamily: typography.sans.regular.default,
  // },
  'Card.Image': {
    resizeMode: 'cover',
  },
};

const buttons = () => ({
  primary: {
    fill: '#ffffff',
    accent: '#00368f', // this should be a global color?
  },
  ghost: {
    fill: '#ffffff',
    accent: '#989A98',
  },
});

/* Base overlays. These are used as configuration for LinearGradients across the app */
// export const overlays = () => ({});

/* Overrides allow you to override the styles of any component styled using the `styled` HOC.
 * For example, this component:
 * const SomeComponent = styled({ margin: 10, padding: 20 }, 'SomeComponent');
 * can have its styles overriden by including in overrides:
 * {
 *   overides: {
 *     SomeComponent: {
 *       margin: 5,
 *       padding: 15,
 *     },
 *   },
 * }
 */
// const overrides = {};

export default {
  colors,
  typography,
  overrides,
  buttons,
};
