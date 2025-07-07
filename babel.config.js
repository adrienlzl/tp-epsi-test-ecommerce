module.exports = {
    presets: [
        // pour Next.js, ce preset gère TS, JSX, React, etc.
        'next/babel'
        // ou, si vous préférez expliciter :
        // '@babel/preset-typescript',
        // ['@babel/preset-react', { runtime: 'automatic' }],
    ],
}