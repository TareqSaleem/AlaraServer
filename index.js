const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = 80;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log('We are live on port 80');
});


app.get('/', (req, res) => {
  res.send('Welcome to my api');
})

app.post('/sendEmail', (req,res) => {
    var data = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user: 'alaralukagrohr@gmail.com',
        clientId: '359568023238-7gv4450on3svg1vn531p0fkt6a429tvq.apps.googleusercontent.com',
        clientSecret: '8UTP_ocxltoP5I7pPpQA7Ide',
        refreshToken: '1/WKJax3Hu7oenN3P249A0BvVJVDCRQ_0XwvuObt-gTfZh_k8fG5Tdldwd0c05DVJK',
        accessToken: 'ya29.GlsrByhvXV5P-iv1Xv-HRNv1293W1zjTjIgylCtA_NRqPTFpv9wCl5p9JvsbENNYS6B4SXQdNFFfPyNFRxFBICaJfrBpLHRmd-Jvqtr1lORXJcOaf-Js1-5EIKVF',
        },
    });

        var mailOptions = {
        from: 'Alara <alaralukagrohr@gmail.com>',
        to: 'tareqy2003@hotmail.com',
        subject: 'Test',
        text: data.description,
        
        }
        if (data.image){
            mailOptions["attachments"] = [
                {
                    path:data.image
                }
            ]    
        }
    transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error');
    } else {
        console.log('Email Is Sent');
    }
    })
})