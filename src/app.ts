import express from 'express';

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.all('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export default app;