// tailwind.config.js
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/**/*.{html, jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom extensions here
      colors: {
        'luxury-blue': '#1e3a8a',
        'premium-indigo': '#3730a3'
      }
    },
  },
  plugins: [
    // Add plugins here
  ],
});
