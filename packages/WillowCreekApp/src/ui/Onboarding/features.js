import React from 'react';
import { View, Image, Text } from 'react-native';
import {
  styled,
} from '@apollosproject/ui-kit';

export const FeatureRow = styled(({ theme }) => ({ flexDirection: 'row', color: 'grey', paddingVertical: theme.sizing.baseUnit }))(View);
export const FeatureText = styled({ color: 'rgba(255, 255, 255, 0.6)', fontSize: 16 })(Text);
export const FeatureImage = styled(({ theme }) => ({ marginRight: theme.sizing.baseUnit, width: theme.sizing.baseUnit * 1.5, height: theme.sizing.baseUnit * 1.5 }))(Image)
export const Features = styled(({ theme }) =>({ flex: 1, alignSelf: 'flex-start', paddingVertical: theme.sizing.baseUnit * 4 }))(View)