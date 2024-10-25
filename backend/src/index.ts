import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/extension'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono()

//Middleware For Blogs
app.use('/api/v1/blog/*', async (c, next) => {

  const header = c.req.header("authorization") || " "
  const token = header.split(" ")[1]
  //@ts-ignore
  const response = await verify(token, c.env.JWT_SECRET)
  if (response.id) {
    next();
  }
  else {
    c.status(403)
    return c.json({
      message: "Unauthorized"
    })
  }
})



app.get('/', async (c) => {
  return c.text("Working")
})

app.post('api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore // To Ignore TS Errors
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })

  if (!user) {
    return c.json({
      message: "User Does not Exists"
    })
  }

  //@ts-ignore
  const token = user.sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({
    token
  })

})
app.post('api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore // To Ignore TS Errors
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })

  if (!user) {
    return c.json({
      message: "User Does not Exists"
    })
  }

  //@ts-ignore
  const token = user.sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({
    token
  })
})

app.post('api/v1/blog', (c) => {
  return c.text("Blog")
})

app.put('api/v1/blog/:id', (c) => {
  return c.text("Update")
})

app.get('api/v1/blog/:id', (c) => {
  return c.text("Get Specific Blog")
})
app.get('api/v1/blog/bulk', (c) => {
  return c.text("Get All Blogs")
})



export default app
