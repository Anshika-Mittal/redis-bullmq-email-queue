import {Worker} from 'bullmq';
import {connection} from './queue.js';

const emailWorker = new Worker(
    "emails", //name of the queue
    async (job)=>{
        console.log("Processing.."), //Processing
        (await new Promise((resolve)=>setTimeout(resolve, 1500)),
        console.log("Completed: ", job.id, job.name, job.data));

    },
    {connection}
);

emailWorker.on("completed", (job)=>{
    console.log("Completed", job.id, job.name, job.data);
})

emailWorker.on("failed", (job, err)=>{
    console.log("Failed", job.id, job.name, job.data, err);
})