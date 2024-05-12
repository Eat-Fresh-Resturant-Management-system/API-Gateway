const ROUTES = [
    {
        url: '/user',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:5000",
            changeOrigin: true,
            pathRewrite: {
                [`^/user`]: '',
            },
        },
        resolver: 'getAllTableBookings' // Map to the corresponding resolver function

    },
    {
        url: '/admin',
        auth: true,
        creditCheck: true,
        proxy: {
            target: "http://localhost:5000/graphql",
            changeOrigin: true,
            pathRewrite: {
                [`^/admin`]: '',
            },
        },
        resolver: 'getAllTables' // Map to the corresponding resolver function

    }
]

export default ROUTES;
