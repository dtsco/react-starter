const spaceValue = {};
for (let i = -50; i < 600; i++) {
  spaceValue[`${i}`] = `${i}px`;
}

module.exports = {
  purge: false,
  theme: {
    borderWidth: spaceValue,
    borderRadius: {
      none:'0px',
      xs: '6px',
      small:'8px',
      md: '12px',
      lg: '20px',
      full: '100px',
    },
    spacing: spaceValue,
    inset:  spaceValue,
    fontSize:spaceValue,
    backgroundColor: {
      primary:'#4B97E9',
      white: '#fff',
      darkGray:'#CACACE',
      lightGray:'#F1F0F0',
      online: '#4cd964',
      'btn-small': 'rgba(75, 151, 233, 0.1);',
      gray: '#f4f4f4',
      bluebox: '#f4f8fb',
      ghostred:'rgba(255, 19, 19, 0.62)',
      ghostGreen:'#ECFFEF',
      ghost:'transparent',
      ghostblue:'#E0E7EF',
      red:'#FF3D3D',
      clientMessage:'#ECECEC',
      pink:'#FFEDED',
      'btn-small-dis': 'rgba(180, 148, 148, 0.1)'

    },
    borderColor: {
      gray: '#9F9F9F',
      linkLine: '#4b97e9',
      lightGray: '#ECECED',
      'input-border': '#e2e2e3',
      red: '#FF3D3D',
      black:'black'
    },
    colors: {
      graytext: '#9F9F9F',
      black: '#000000',
      primary: '#4B97E9',
      white: '#fff',
      red: '#FF3D3D',
      green:'#4CD964',
      yellow:'#F6A326'
    },
    boxShadow: {
      boxShadowHover: '0px 0px 4px #218cff',
      standart: '0px 2px 12px rgba(0, 0, 0, 0.05)',
      none:'none'
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
