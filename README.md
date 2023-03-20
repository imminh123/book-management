# Disclaimer

Thanks Peter for this opportunity, not just for the interview but also for the challenge that I believe I can do much better than this. There're always things to learn even from this test project. Whether or not this meets 3IPK’s standard, I would love to hear your feedback if possible. Have a nice day!

---

# Documentation

## Demo

Here's a demo video on how the app should work

[![Watch the video](https://i.postimg.cc/5ykDLxgG/thumbnail.jpg)](https://youtu.be/-iU7erGQwZc)

## Technologies

### Client

Framework: ReactJS <br/>
CSS: TailwindCSS & HeadlessUI <br/>
Dev server: ViteJS <br/>

### Backend

DB: MongoDB <br/>
Framework: NestJS <br/>
Authentication method: Discord OAuth <br/>
Unit test: ✅ (book module)

<br/>

## How to run

```
docker-compose up
```

Client: http://127.0.0.1:5173 <br/>
Swagger: http://127.0.0.1:3000/docs/book

<br />

## Improvement

Tbh, there’s lots of room for improvement with this open task if there is enough effort.
<br/>1. The app has unit test covered for BE (Book module) but not for FE (can be improved with Jest for UT & Cypress for e2e)
<br/>2. Search function
<br/>3. More ways for authentication, I'm going with discord to ease the pain of signing up.
<br/>4. Deployment: I want to save you some time having to dockerize this but sadly my AWS account got suspended for overdue payment (I forgot to terminate a bunch of services so the bill went through the roof). 😢
