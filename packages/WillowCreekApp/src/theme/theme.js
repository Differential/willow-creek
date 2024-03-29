import React from 'react';
import { get } from 'lodash';
import { DefaultCard, HighlightCard } from '@apollosproject/ui-kit';
import Color from 'color';

const cardMapper = (props) => {
  switch (get(props, '__typename')) {
    case 'ContentSeriesContentItem':
    case 'DevotionalContentItem':
      return <HighlightCard {...props} />;
    default:
      return <DefaultCard {...props} />;
  }
};

const colors = {
  primary: '#00A9E0',
  secondary: '#0C2340',
  tertiary: '#F0B323',
  quaternary: '#FA4616',
  screen: '#FCFCFC',
  paper: '#FFFFFF',
  alert: '#c64f55',

  // Dark shades
  darkPrimary: '#303030',
  darkSecondary: '#97999B',
  darkTertiary: '#C9C8C7',

  // Light shades
  lightPrimary: '#FCFCFC',
  lightSecondary: '#C9C8C7',
  lightTertiary: '#97999B',
  // Statics
  wordOfChrist: '#8b0000', // only used in Scripture.
  background: {
    accent: '#F0B323',
  },
  // text: {
  //   link: '#418fde',
  // },
};

const typography = {
  baseFontSize: 16,
  baseLineHeight: 23.04, // 1.44 ratio
  sans: {
    regular: {
      default: 'Montserrat',
      italic: 'Montserrat-Italic',
    },
    medium: {
      default: 'Montserrat',
      italic: 'Montserrat-Italic',
    },
    bold: {
      default: 'Montserrat-ExtraBold',
      italic: 'Montserrat-ExtraBoldItalic',
    },
    black: {
      default: 'SourceSerifPro-SemiBold',
      italic: 'SourceItalicPro-SemiBoldIt',
    },
  },
};

const overrides = {
  'ui-kit.Typography.H1': {
    fontFamily: 'SourceSerifPro-SemiBold',
    fontSize: 43,
    lineHeight: 50,
  },
  'ui-kit.Typography.H2': {
    fontFamily: 'SourceSerifPro-SemiBold',
    fontSize: 36,
    lineHeight: 39,
  },
  'ui-kit.Typography.H3': {
    fontFamily: 'SourceSerifPro-SemiBold',
    fontSize: 24,
    lineHeight: 28,
  },
  ContentCardComponentMapper: {
    Component: () => cardMapper,
  },
  'ui-onboarding.Slide.SlideContent.Title': {
    color: '#FFFFFF',
  },
  'ui-onboarding.Slide.SlideContent.Description': {
    color: '#FFFFFF',
  },
  'ui-kit.inputs.InputUnderline.BlurredUnderline': {
    backgroundColor: '#ffffff',
  },
  'ui-kit.inputs.InputUnderline.FocusedUnderline': {
    backgroundColor: '#ffffff',
  },
  // 'Slide.NavWrapper': {
  //   justifyContent: 'space-around',
  //   alignItems: 'stretch',
  //   flexDirection: 'column',
  // },
  'ui-onboarding.Slide.Slide.PrimaryButton': {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    flex: 1,
    // borderRadius: 8,
  },
  'ui-onboarding.Slide.Slide.SkipButton': {
    // alignSelf: 'flex-end',
  },
  'ui-onboarding.OnboardingSwiper.PaginationDotActive': {
    backgroundColor: '#ffffff',
  },
  'ui-onboarding.OnboardingSwiper.PaginationDot': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  'ui-kit.inputs.DateInput.StyledChip': {
    backgroundColor: 'transparent',
    borderColor: 'white',
  },
  'ui-auth.styles.TitleText': {
    color: '#FFFFFF',
  },
  'ui-auth.styles.RadioLabel': {
    color: '#FCFCFC',
  },
  'ui-kit.Card.Image.Image': {
    resizeMode: 'cover',
  },
  'ui-kit.inputs.Search.styles.InputWrapper': {
    backgroundColor: '#F4F4F5',
  },
  'ui-auth.styles.TabCard': {
    backgroundColor: '#FFFFFF',
  },
  'ui-auth.NextButton': {
    backgroundColor: '#FCFCFC',
    borderColor: '#FCFCFC',
  },
  'ui-auth.styles.PromptText': {
    color: '#FCFCFC',
  },
  'ui-auth.styles.FieldLabel': {
    color: '#FCFCFC',
  },
  'ui-kit.inputs.DateInput.StyledDateTimePicker': {
    textColor: colors.darkPrimary,
  },
  'ui-kit.Avatar.Avatar.NotificationDot': {
    backgroundColor: colors.quaternary,
  },
  'ui-kit.ActionList.FullWidthButton': {
    // backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  // 'ui-kit.Button.ButtonStyles': {
  //   backgroundColor: colors.secondary,
  //   borderColor: colors.secondary,
  // },
  'ui-kit.ButtonLink.ButtonLink': {
    color: colors.primary,
  },
};

const buttons = ({ colors: themeColors }) => ({
  primary: {
    fill: '#ffffff',
    accent: themeColors.action.primary,
  },
  ghost: {
    fill: '#ffffff',
    accent: colors.lightTertiary,
  },
});

const types = {
  light: () => ({
    colors: {
      shadows: {
        default: 'rgba(48, 48, 48, 0.08)',
      },
    },
  }),
  dark: () => ({
    colors: {
      shadows: {
        default: 'rgba(8, 0, 20, 0.25)',
      },
    },
  }),
  onboarding: ({ colors: themeColors, alpha }) => ({
    colors: {
      text: {
        primary: themeColors.lightPrimary,
        secondary: themeColors.lightSecondary,
        tertiary: themeColors.lightTertiary,
        link: themeColors.tertiary,
      },
      background: {
        screen: themeColors.white,
        paper: themeColors.transparent,
        accent: Color(themeColors.darkTertiary)
          .fade(alpha.medium)
          .string(),
        inactive: themeColors.darkTertiary,
      },
      shadows: {
        default: Color(themeColors.darkTertiary)
          .fade(alpha.medium)
          .string(),
      },
      action: {
        default: themeColors.darkTertiary,
        primary: themeColors.primary,
        secondary: themeColors.lightPrimary,
        tertiary: themeColors.tertiary,
      },
    },
  }),
  'auth-entry': ({ colors: themeColors, alpha }) => ({
    colors: {
      text: {
        primary: themeColors.darkPrimary,
        secondary: 'white',
        tertiary: themeColors.lightTertiary,
        link: themeColors.tertiary,
      },
      background: {
        screen: 'white',
        paper: themeColors.paper,
        accent: Color(themeColors.darkTertiary)
          .fade(alpha.medium)
          .string(),
        inactive: themeColors.darkTertiary,
      },
      shadows: {
        default: Color(themeColors.darkTertiary)
          .fade(alpha.medium)
          .string(),
      },
      action: {
        default: themeColors.darkTertiary,
        primary: themeColors.primary,
        secondary: themeColors.lightPrimary,
        tertiary: themeColors.tertiary,
      },
    },
  }),
};
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
  types,
};
