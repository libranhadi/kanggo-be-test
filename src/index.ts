import app from './config/app';
import sequelize from './config/database';
require("dotenv").config()

const PORT = process.env.PORT || 3000;
import authRoutes from './routes/authRoute';


app.use('/api/auth', authRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error : any) => {
    console.error('Unable to connect to the database:', error);
  });