const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
var nodemailer = require('nodemailer');
const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;


app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function Detail(agent) {
        console.log(`intent  =>  details`);

        const { person, email, number, type, age, address } = agent.parameters

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'itsrazaalishah303@gmail.com',
                pass: "nyqgwvimxmuadhwy"
            }
        });
        agent.add(`
        Congratuation your order has been recorded.
        `)

        var mailOptions = {
            from: 'itsrazaalishah303@gmail.com',
            to: ['itsrazaalishah303@gmail.com',"hammadn788@gmail.com", email],
            subject: 'Cow details',
            html: `
       Thanks for using our service 
       Congratulation ${person.name} your order has been recorded here is your detailed information: 
               <p>Person name: ${person.name}</p>
               <p>In budget: ${number}</p>
               <p>Cow type: Male</p>
               <p>Age requirement: ${age}</p>
               <p>On this Adddress: ${address}</p>
               `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    let intentMap = new Map();
    intentMap.set('Detail', Detail);
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
