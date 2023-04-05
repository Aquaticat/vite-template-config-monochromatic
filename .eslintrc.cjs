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
    },
  ],
};
