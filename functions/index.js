const functions = require("firebase-functions")
const bodyParser = require('body-parser');
const express = require("express")
const nodemailer = require('nodemailer');
const cors = require('cors');

/* Express */
const app1 = express()
app1.use(bodyParser.json({limit: '50mb'}));
app1.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app1.use(cors());
app1.post('/sendEmail', (req,res) => {
    let hasBeenCalled = false;
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
        to: 'm.mostert@alara-lukagro.com',
        subject: 'Alara PWA App Hogeschool Rotterdam',
        text: data.description
        
        }
        if (data.image){
            mailOptions["attachments"] = [
                {
                    path:data.image
                }
            ]    
        }
    
    if (!hasBeenCalled){
        transporter.sendMail(mailOptions, function (err, res) {
            if(err){
                this.hasBeenCalled = true;
                console.log('Error');
            } else {
                this.hasBeenCalled = true;
                console.log('Email Is Sent');
            }
        })
    }
    
})

const api1 = functions.https.onRequest(app1)

module.exports = {
  api1
}