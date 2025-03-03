import User from '../models/user.js'
import axios from 'axios';

export { 
        show,
        getById 
    };

async function show(req, res) {
  try {
    // console.log('in show')
    const { type, location, token } = req.body;
    // console.log(req.body)
    const response = await axios.get(
      "https://api.petfinder.com/v2/animals",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: type,
          location: location, 
        },
      }
    );
      // console.log(response.data)
    res.json(response.data.animals);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ success: false, message: 'Error fetching pets from Petfinder API' });
  }
}

async function getById(req, res) {
    // console.log(req.params.id, req.headers.authorization)
    try {
      const response = await axios.get(
        `https://api.petfinder.com/v2/animals/${req.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching pets by Id:', error);
      res.status(500).json({ success: false, message: 'Error fetching pets by Id' });
    }
}
