import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('api/v1/user/signup', (c) => {
  return c.text("Signup")
})
app.post('api/v1/user/signin', (c) => {
  return c.text("Signin")
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
