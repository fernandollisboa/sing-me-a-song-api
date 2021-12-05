import './setup.js';
import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`DB_NAME=${process.env.DB_NAME}`);
});
