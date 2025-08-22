import express from  "express";
import {google} from "googleapis"

const routern= express.Router();
 // OAuth2 set up

 const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:5000/oauth2callback"
 );


 //book a session

 routern.post("book-session", async(req, res) =>{
    try{
        const{title, start, end,accessToken}=req.body;

        oAuth2Client.setCredentials({access_token:accessToken});

        const calendar = google.calendar({version:"v3", auth: oAuth2Client });

    const event = {
      summary: title,
      start: { dateTime: start, timeZone: "Africa/Johannesburg" },
      end: { dateTime: end, timeZone: "Africa/Johannesburg" },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.json({ eventId: response.data.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
