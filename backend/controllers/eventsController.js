import Events from "../models/eventsModel.js";
import expressAsync from "express-async-handler";


export const getEvents = expressAsync(async (req, res) => {
    
      const events = await Events.find()
        .sort({ createdAt: -1 })
        .populate("user")
        
  
      res.json({ events });
    
  });