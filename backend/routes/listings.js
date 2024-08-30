const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/scrape', async (req, res) => {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  const urlToScrape = 'https://www.zillow.com/homes/for_sale/';

  try {
    const response = await axios.post('https://firecrawl.dev', {
      url: urlToScrape,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Accept': 'application/json',  
      },
    });

    console.log('Firecrawl response headers:', response.headers);
    console.log('Firecrawl response content-type:', response.headers['content-type']);
    console.log('Firecrawl response data:', response.data);

    if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
     
      const listings = Array.isArray(response.data) ? response.data.map(listing => ({
        title: listing.title || 'N/A',
        price: listing.price || 'N/A',
        location: listing.location || 'N/A',
        url: listing.url || 'N/A',
      })) : [];

      res.status(200).json({ message: 'Scraping successful', listings });
    } else {
      
      res.status(200).send(response.data);
    }
  } catch (error) {
    console.error('Scraping failed:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Scraping failed', details: error.message });
  }
});

module.exports = router;
