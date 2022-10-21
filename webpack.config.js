const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env) => {
    return {
        mode: env.mode,
        entry: {
            index: './src/scripts/index.ts',
            presentations: './src/scripts/presentations.ts',
            // add more entries for each script here
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist', 'scripts'),
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: {
                        loader: 'ts-loader'
                    },
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "src"),
                        to: path.resolve(__dirname, "dist"),
                        globOptions: {
                            ignore: [
                                '**/scripts/**'
                            ]
                        }
                    },
                    {
                        from: path.resolve(__dirname, "CNAME"),
                        to: path.resolve(__dirname, "dist"),
                    }
                ]
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            historyApiFallback: {
                rewrites: [
                    {from: /./, to: '/404.html'},
                ],
            },
        },
        performance: {
            hints: false, // TOOO: more elegant solution
        }
    };

};
