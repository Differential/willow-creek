import Color from 'color';

const dark = ({ colors, alpha }) => ({
  colors: {
    text: {
      primary: colors.lightPrimary,
      secondary: colors.lightSecondary,
      tertiary: colors.lightTertiary,
      link: colors.secondary,
    },
    background: {
      screen: colors.screen,
      paper: colors.paper,
      accent: Color(colors.darkTertiary)
        .fade(alpha.high)
        .string(),
      inactive: colors.darkTertiary,
    },
    shadows: {
      default: Color(colors.darkTertiary)
        .fade(alpha.medium)
        .string(),
    },
    action: {
      default: colors.darkTertiary,
      primary: colors.primary,
      secondary: colors.secondary,
      tertiary: colors.tertiary,
    },
  },
});

export default dark;
