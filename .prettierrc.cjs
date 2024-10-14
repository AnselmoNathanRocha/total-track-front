module.exports = {
  singleQuote: false,
  endOfLine: "crlf",
  plugins: [],
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
  ],
};
