module.exports= {
  presets: ['@babel/preset-typescript'],
  plugins: ['@babel/plugin-syntax-jsx',['babel-plugin-typescript-to-proptypes', { typeCheck: true }]]
}
