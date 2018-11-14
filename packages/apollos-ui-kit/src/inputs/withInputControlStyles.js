import styled from '../styled';

export const baseStyle = ({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
  height: 30 + theme.sizing.baseUnit / 2,
});

export const textStyle = ({ theme }) => ({
  ...baseStyle({ theme }),
  paddingVertical: 0,
  fontSize: theme.helpers.rem(0.875),
  fontFamily: theme.typography.sans.bold.default,
  color: theme.colors.text.primary,
});

const withInputControlTextStyles = styled(textStyle, 'Input.Control');
const withInputControlViewStyles = styled(baseStyle);

export { withInputControlTextStyles as default, withInputControlViewStyles };
