const nextjs = () => {
    const author = 'Noppakorn K.';
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <h1
                style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                }}
            >
                Welcome to Next.js with {author}
            </h1>
        </div>
    );
};

export default nextjs;
