const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: process.env.NODE_MAILER_HOST,
    port: process.env.NODE_MAILER_PORT,
    secure: process.env.NODE_MAILER_SECURE,
    auth: {
        user: process.env.NODE_MAILER_AUTH_USER,
        pass: process.env.NODE_MAILER_AUTH_PASS
    }
});


const sendWelcomeMail = async (email, username)=>{

    try{
        const mailOptions = {
            from: process.env.NODE_MAILER_AUTH_USER,
            to: email,
            subject: 'Confirmation de la création de votre compte SoundNation',
            html: `  <div style="font-family:Tahoma, sans-serif;">
                        <div style='background-color: black; width: 100%; display: flex; flex-direction: row; justify-content: center;'>
                            <img style="width: 5em; padding: 4px;" src="cid:logo" alt="Logo du festival sound nation">
                        </div>
                        <div style="background-color: #023E33;">
                            <h1 style="color: white; margin-top: 0; padding: 1em; text-align: center;">Bienvenu au Festival Sound Nation</h1>
                            <p style="color: white; font-size: 1.2rem; padding-left: 1em; text-align: center;">Merci ${username} d'avoir crée ton compte</p>
                            <p style="color: white; padding: 1em; margin: 0; text-align: center; ">Tu as des questions ? n'hésite pas à te rendre dans la rubrique FAQ du site!</p>
                            <p style="text-align: center; margin: 0; padding-bottom: 1em;"><a style="color: white;" href="www.https://sound-nation.vercel.app/InformationsFaq">Aller sur le site</a></p>
                        </div>
                        <div  style="background-color: black;">
                            <h2 style="color: white; margin: 0; padding: 1em; text-align: center;">Ils ont déjà répondu présent :</h2>
                            <div style="display:flex; flex-wrap: wrap; flex-direction: row; gap: 3em; justify-content: center;">
                                <div>
                                    <img style="width: 8em; border-radius: 4px;" src="cid:Hermit" alt="Image du groupe Hermit">
                                    <p style="color: white; text-align: center;">Hermit</p>
                                </div>
                                <div>
                                    <img style="width: 8em; border-radius: 4px;" src="cid:Awoga" alt="image du groupe Awoga">
                                    <p style="color: white; text-align: center;">Awoga</p>
                                </div>
                                <div>
                                    <img style="width: 8em; border-radius: 4px;" src="cid:Ondubground" alt="Image du groupe Ondubground">
                                    <p style="color: white; text-align: center;">On Dub Ground</p>
                                </div>

                            </div>
                        </div>
                        <div style="background-color: black;">
                            <p style="color: white; padding: 1em; text-align: center; margin: 0; padding-top: 2em;">© 2024 Sound Nation. Tous droits réservés.</p>
                        </div>
                    </div> `,
            headers: {
                'X-No-Reply': 'true',
            },
            attachments: [
                {
                    filename: "logo.jpg",
                    path: path.resolve(__dirname, "../images/logo.jpg"),
                    cid: "logo",
                },
                {
                    filename: "Hermit.png",
                    path: path.resolve(__dirname, "../images/Hermit.png"),
                    cid: "Hermit",
                },
                {
                    filename: "Awoga.jpg",
                    path: path.resolve(__dirname, "../images/Awoga.jpg"),
                    cid: "Awoga",
                },
                {
                    filename: "Ondubground.png",
                    path: path.resolve(__dirname, "../images/Ondubground.png"),
                    cid: "Ondubground",
                },
            ],

        }


        await transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
            }else {
                console.log('Email sent: ' + info.response);
            }
        })

    }catch (error){ 
        console.log(error);
    }
}

module.exports = {sendWelcomeMail};
