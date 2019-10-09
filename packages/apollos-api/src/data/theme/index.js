import { gql } from 'apollo-server';

import colorScalarType from './colorScalarType';

export const schema = gql`
  type Theme {
    type: ThemeType
    colors: ThemeColors
  }

  enum ThemeType {
    LIGHT
    DARK
  }

  scalar Color

  type ThemeColors {
    primary: Color
    secondary: Color
    screen: Color
    paper: Color
    alert: Color
  }
`;

export const resolver = {
  Color: colorScalarType,
};

export class model {} // todo
