const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, './src')
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: ['file-loader'],
            options: {
                disable: true,
                outputPath: 'images/',
                name: '[name].[ext]',
                emitFile: true
            }
        }]
    },
    devServer: {
        inline: true,
        publicPath: './',
        contentBase: './',
        port: 3000,
        historyApiFallback: true,
        writeToDisk: true
    },
};
