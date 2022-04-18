export enum Theme {
  White = 0,
  Blue = 1,
  // Grey = 'grey',
}

type ThemedModel = {
  theme: Theme;
};

export enum ThemeName {
  White = 'white',
  Blue = 'blue',
}

export const getThemeName = (theme: Theme) => {
  switch (theme) {
    case Theme.Blue:
      return ThemeName.Blue;

    default:
      return ThemeName.White;
  }
};

export enum Color {
  White = '#fff',
  OffWhite = '#eee',
  Blue = '#24316f',
  Grey = '#818181',
  LightGrey = '#bbb',
  DarkGrey = '#555',
  Black = '#000',
}

export const themeToColor = (theme: Theme) => {
  switch (theme) {
    case Theme.Blue:
      return Color.Blue;
    /* case GREY:
      return Color.Grey; */
    default:
      return Color.White;
  }
};

export default ThemedModel;
