import { BingChat } from 'bing-chat';
import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 8080;

// to convert the body to JSON
app.use(express.json());

const corsOptions = {
  origin: '*', // Change this to the specific URL of your client-side app if known
  allowedHeaders: ['Content-Type', 'Authorization'], // Add 'Authorization' to the allowedHeaders
};

app.use(cors(corsOptions));

app.get('/ask', (req, res) => {
    res.status(200).send({
        body: 'you made a successful get request!'
    })
});

app.post("/ask/query", async (req, res) => {
  try {
    const { authorization } = req.headers; // Get the Authorization header (which contains the "bing" cookie)
    const { body } = req.body;

    if (!authorization) {
      return res.status(418).send({ message: 'Authorization header with bing cookie is required!' });
    }

    // Extract the "bing" cookie from the Authorization header
    const bingCookie = authorization.split(' ')[1]; // Assuming the Authorization header is in the format: "Bearer <bing-cookie>"

    const api = new BingChat({ cookie: bingCookie });
    const resApi = await api.sendMessage(body, { variant: "creative" });

    res.send({ result: resApi.text });
  } catch (error) {
    console.error("Error occurred while processing the request:", error);
    res.status(500).send({ message: 'Error occurred while processing the request.' });
  }
});

// app.listen(PORT, () => console.log(`App's live on https://localhost:${PORT}`));

  

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
// app.get('/ask', (req, res) => {
//     res.status(200).send({
//         body: 'you made a successful get request!'
//     })
// });

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

// app.post("/ask/query", async (req, res) => {
//     const { cookie } = req.headers;
//     const { body } = req.body;
  
//     if (!cookie) {
//       res.status(418).send({ message: 'We need a cookie!' });
//       return;
//     }
  
//     try {
//       const api = new BingChat({ cookie: cookie });
//       const resApi = await api.sendMessage(body, { variant: "creative" });
  
//       res.send({ result: resApi.text });
//     } catch (error) {
//       console.error("Error occurred while processing the request:", error);
//       res.status(500).send({ message: `Error occurred while processing the request. ${error}` });
//     }
//   });  

app.listen( 
    PORT,
    () => console.log(`App's live on https://localhost:${PORT}`)
)