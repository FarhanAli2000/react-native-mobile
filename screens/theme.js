// themes.js
export const colors = {
    primary: {
      primary1: '#2D4495',
      primary2: '#36A680'
    },
    secondary: {
      secondary1: '#F8B81A',
      white: '#FFFFFF',
      black: '#000000'
    },
    background: {
      light: '#FFFFFF',
      dark: '#F0F0F0'
    }
  };
  
  export const theme = {
    colors: colors,
    typography: {
      fontFamily: {
        regular: 'System',
        bold: 'System-Bold'
      },
      sizes: {
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 24
      }
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      round: 50
    },
    components: {
      button: {
        primary: {
          backgroundColor: colors.primary.primary1,
          color: colors.secondary.white
        },
        secondary: {
          backgroundColor: colors.secondary.secondary1,
          color: colors.secondary.black
        }
      },
      input: {
        borderColor: colors.primary.primary2,
        backgroundColor: colors.secondary.white
      }
    }
  };
  
  export const darkTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: colors.secondary.black,
      text: colors.secondary.white
    }
  };