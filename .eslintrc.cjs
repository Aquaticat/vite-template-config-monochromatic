module.exports = {
  extends: ['monochromatic'],

  overrides: [
    {
      files: [
        '*.ts',
        '*.mts',
        '*.cts',
        '*.tsx',
      ],

      extends: ['monochromatic-typescript'],

      parserOptions:{
        // tsconfigRootDir: __dirname,
        // project: './tsconfig.eslint.json'
      }
    },
  ],
};
