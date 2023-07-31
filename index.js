import { BingChat } from 'bing-chat';
import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT ||  8080;

// to conver the body to json
app.use(express.json());

// using cors
app.use(cors());

// to get it to a tshirt uri, this will automatically set 
// set up our server with that endpoint
// then it is our job to handle a request to it
// we do it by passing a callback function as the 2nd arg
// the function itself provide access to 2 diff objexts
// request object and response object 
app.get('/ask', (req, res) => {
    res.status(200).send({
        body: 'body'
    })
});

app.post("/ask", async (req, res) => {
    const { cookie } = req.headers;
    const { body } = req.body;

    const api = new BingChat({
        cookie: cookie
    })
     
    const resApi = await api.sendMessage(body, {
        variant: "creative"
    })

    if(!cookie) {
        res.status(418).send({ message: 'We need a logo! '})
    }

    res.send({
        result: resApi.text
    })
})

app.listen( 
    PORT,
    () => console.log(`App's live on https://localhost:${PORT}`)
)