// types.d.ts

interface ImportMeta {
    env: {
        [key: string]: string;
        NODE_ENV: 'development' | 'production';
    };
}