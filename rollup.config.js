// rollup.config.js


import babel from 'rollup-plugin-babel';

import typescript from 'rollup-plugin-typescript2';

import resolve from "@rollup/plugin-node-resolve";

import commonjs from '@rollup/plugin-commonjs'; 


import myLess from "./plugins/test.js"




export default {

    input: 'src/main.js',

    output: {
        file: 'dist/app.js',
        format: 'umd',
        name: "MyLibs",
        intro: "//####ddd",
        paths: {
            d3: 'https://d3js.org/d3.v4.min'
        }
    },
    //import { selectAll } from 'd3';
    //selectAll('p').style('color', 'purple');
    // define(['https://d3js.org/d3.v4.min'], function (d3) { 
    //     d3.selectAll('p').style('color', 'purple');
    //     // ... 
    // });

    // sourcemap: true,
    // globals: {
    //     jquery: '$'
    // },


    external: ["jquery"],




    plugins: [

        myLess({
            output:"dist/app.css",
            minify:false,
        }),
        typescript(),
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),

        resolve(),
        commonjs({ extensions: [".ts", ".js"] })
    ]
};