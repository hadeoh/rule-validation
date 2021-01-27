import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/Rule'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

// Handles
app.use('/', routes);

app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    status: 'error',
    data: null,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;