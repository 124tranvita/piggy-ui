import resolveConfig from 'tailwindcss/resolveConfig';

const tailwindConfig = () => {
  // Taiwind config
  return resolveConfig('./tailwind.config.js');
};

export default tailwindConfig;
