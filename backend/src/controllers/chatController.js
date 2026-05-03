const { processChat } = require('../services/geminiService');
const { generateMapsLink, generateCalendarLink } = require('../services/mapsService');

const handleMessage = async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 1. Process via Gemini to get structured intent and response
    const aiResponse = await processChat(message, history || []);

    // 2. Augment the response based on intent and extracted data
    let augmentedResponse = { ...aiResponse };

    if (aiResponse.quickAction === 'FIND_LOCATION') {
      const zip = aiResponse.extractedData?.zipCode || aiResponse.extractedData?.state;
      if (zip) {
        augmentedResponse.actionLink = generateMapsLink(zip);
      } else {
        augmentedResponse.followUp = "Could you please provide your ZIP code or city so I can find your polling location?";
        augmentedResponse.quickAction = "NONE";
      }
    } else if (aiResponse.quickAction === 'ADD_TO_CALENDAR') {
      // Hardcoding next major election date for demonstration MVP
      augmentedResponse.actionLink = generateCalendarLink('Election Day', '20241105', 'Remember to vote today!');
    } else if (aiResponse.quickAction === 'CHECK_REGISTRATION') {
      augmentedResponse.actionLink = 'https://vote.gov';
    }

    // Return the final response
    res.status(200).json(augmentedResponse);
  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ error: 'Internal server error processing chat' });
  }
};

module.exports = { handleMessage };
