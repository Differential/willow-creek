import { Icon, withTheme } from '@apollosproject/ui-kit';


const BrandIcon = withTheme(({ theme, color }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 3,
  ...(color ? { fill: color } : {}),
  style: {
    marginBottom: theme.sizing.baseUnit,
  },
}))(Icon);

export default BrandIcon