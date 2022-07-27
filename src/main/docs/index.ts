import { addBookPath } from './paths/add-book-path'
import { signinPath } from './paths/signin-path'
import { signupPath } from './paths/signup-path'
import { bookSchema } from './schemas/book-schema'
import { errorSchema } from './schemas/error-schema'
import { loginSchema } from './schemas/login-schema'
import { userSchema } from './schemas/user-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Library API',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development'
    }
  ],
  paths: {
    '/signup': signupPath,
    '/signin': signinPath,
    '/books': addBookPath
  },
  schemas: {
    userSchema: userSchema,
    errorSchema: errorSchema,
    loginSchema: loginSchema,
    bookSchema: bookSchema
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}
