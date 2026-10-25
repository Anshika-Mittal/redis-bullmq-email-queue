import express from 'express';
import emailQueue from './queue';
import { attempt } from 'lodash';
import { Backoffs } from 'bullmq';

const app = express();
app.use(express.json());

app.post("/welcome-email", async (req, res)=>{
    const job = emailQueue.add(
        "send-welcome-email", //name of element
        {
            to: req.body.to,
            name: req.body.name ||"Reciever"
        },
        {//specific configurations
            attempts: 3,
            backoff:{
                type: "exponential",
                delay: 1000
            }
        }
    );
    res.json({message: "Email added", jobId: job.id});
})

app.listen(3000, ()=>{
    console.log("Server listening on the http://localhost:3000");
})
