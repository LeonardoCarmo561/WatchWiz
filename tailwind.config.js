// tailwind.config.js

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/shared/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: 'Roboto_700Bold',
        subtitle: 'Roboto_500Medium',
        body: 'Roboto_400Regular',
      },
    },
  },
  plugins: [],
}