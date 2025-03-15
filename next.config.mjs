/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [{
            protocol: 'https',
            hostname: 'moccasin-worrying-aardvark-868.mypinata.cloud',
            port: '',
            pathname: '/**',
        }],
        
    }
};

export default nextConfig;
