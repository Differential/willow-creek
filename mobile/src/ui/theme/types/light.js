import Color from 'color';

const light = ({ colors, alpha }) => ({
  colors: {
    text: {
      primary: colors.darkPrimary,
      secondary: colors.darkSecondary,
      tertiary: colors.darkTertiary,
      link: colors.secondary,
    },
    background: {
      screen: colors.screen,
      paper: colors.paper,
      accent: Color(colors.lightTertiary)
        .fade(alpha.high)
        .string(),
      inactive: colors.lightTertiary,
    },
    shadows: {
      default: Color(colors.darkTertiary)
        .fade(alpha.medium)
        .string(),
    },
    action: {
      default: colors.lightTertiary,
      primary: colors.primary,
      secondary: colors.secondary,
      tertiary: colors.tertiary,
    },
  },
});

export default light;
