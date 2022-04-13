const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  entry: path.resolve(__dirname, "src", "index.tsx"), // define o arquivo de entrada independente do sistema operacional
  output: {
    path: path.resolve(__dirname, "dist"), // define o diretório de saída da aplicação
    filename: "bundle.js", // define o nome do arquivo de saída da aplicação
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // define os tipos de extensões de arquivos que o webpack vai ler
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"), // define o novo build do webpack definindo o conteudo estatico da aplicação
    },
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // define o arquivo de template
    }), // define o plugin para gerar o arquivo html
  ].filter(Boolean), // filtra os plugins para remover os falsy
  module: {
    // como a aplicação vai se comportar quando importar algum tipo de arquivo
    rules: [
      {
        test: /\.(j|t)sx$/, // define o tipo de arquivo Javascript
        exclude: /node_modules/, // define os arquivos que não devem ser convertidos
        use: {
          loader: "babel-loader", // define o loader que vai ser usado para converter o arquivo
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
