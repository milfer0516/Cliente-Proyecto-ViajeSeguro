/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'color-pantalla': '#F5F5F5',
        'gris-plata': '#DDE6ED',
        'cielo-celeste': '#2271b3',
        'amarillo-mostaza': '#E49B0F',
        'azul-oscuro': '#162b4e ',
        'verde-menta': '#20603d',
        'color-primario-nav': '#001F3F',
        'color-btn-reservar': '#D9534F',
        'color-btn-registrar': '#0074D9',
      },
      fontFamily: {
        'fuente-principal': "'Roboto', 'sans-serif'"
      },
      fontWeight: {
        'roboto-light-300': ['Roboto', 'sans-serif', '300'],
        'roboto-normal-400': ['Roboto', 'sans-serif', '400'],
        'roboto-medium-500': ['Roboto', 'sans-serif', '500'],
        'roboto-bold-700': ['Roboto', 'sans-serif', '700'],
        'roboto-sbold-900': ['Roboto', 'sans-serif', '900'],
      }
    },
  },
  variants: {
    extend: {
      display: ['hover', 'focus', 'group-hover', 'group-focus', 'md'],
    },
  },
  plugins: [],
}

