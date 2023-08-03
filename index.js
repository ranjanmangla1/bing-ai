import { BingChat } from 'bing-chat';
import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT ||  8080;

// to conver the body to json
app.use(express.json());

const corsOptions = {
    origin: '*', // Change this to the specific URL of your client-side app if known
    allowedHeaders: ['Content-Type', 'Authorization', 'cookie'], // Add 'cookie' to the allowedHeaders
  };
  
  app.use(cors(corsOptions));
  

// const corsOptions = {
//   allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
// };

// app.use(cors(corsOptions));

// to get it to ask uri, this will automatically set 
// set up our server with that endpoint
// then it is our job to handle a request to it
// we do it by passing a callback function as the 2nd arg
// the function itself provide access to 2 diff objexts
// request object and response object 
app.get('/ask', (req, res) => {
    res.status(200).send({
        body: 'you made a successful get request!'
    })
});

// app.post("/ask/query", async (req, res) => {
//     const { apikey } = req.headers;
//     const { body } = req.body;

//     if(!apikey) {
//         res.status(418).send({ message: 'We need a cookie! '})
//     }

//     const api = new BingChat({
//         cookie: apikey
//     })
     
//     const resApi = await  api.sendMessage(body, {
//         variant: "creative"
//     })

//     // console.log(resApi);

//     res.send({
//         result: resApi.text
//     })

//     // console.log(res)
// })

app.post("/ask/query", async (req, res) => {
    const { cookie } = req.headers;
    const { body } = req.body;
  
    if (!cookie) {
      res.status(418).send({ message: 'We need a cookie!' });
      return;
    }
  
    try {
      const api = new BingChat({ cookie: cookie });
      const resApi = await api.sendMessage(body, { variant: "creative" });
  
      res.send({ result: resApi.text });
    } catch (error) {
      console.error("Error occurred while processing the request:", error);
      res.status(500).send({ message: `Error occurred while processing the request. ${error}` });
    }
  });  

app.listen( 
    PORT,
    () => console.log(`App's live on https://localhost:${PORT}`)
)