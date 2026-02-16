import express from 'express'
import { env } from './config/env.config.js'
import { error } from './middlewares/errormiddlewares.js';
import cors from 'cors'
import morgan from 'morgan'
import { authRouter } from './router/auth.router.js';
import { notFound } from './middlewares/notfoundmiddlewares.js';
import cookieParser from 'cookie-parser'

const app = express();


app.use(cors({origin: [env.FRONTEND_URL], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());//read cookie middlewares

app.use('/auth', authRouter)

app.use(notFound);
app.use(error);

const PORT = env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is runnig on Port http://localhost:${PORT}`)
})