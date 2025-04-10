import app from './app';

const port = 3004;

const startServer = async () => {
    // await connectDB();

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};

startServer();
