/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [{
            protocol: 'https',
            hostname: 'moccasin-worrying-aardvark-868.mypinata.cloud',
            port: '',
            pathname: '/**',
        }],
        
    },
    eslint:{
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
