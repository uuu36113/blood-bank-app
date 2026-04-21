exports.askHelp = async (req, res) => {
  try {
    const { message } = req.body;
    let reply = "I'm sorry, I don't understand that. Please use our search page or emergency button to find blood.";
    
    const msgLower = message.toLowerCase();
    
    if (msgLower.includes('how to donate') || msgLower.includes('donate blood')) {
      reply = "To donate blood, please register as a donor from the top menu and fill out your medical history.";
    } else if (msgLower.includes('where') && msgLower.includes('find')) {
      reply = "You can find nearby blood by visiting the 'Search Blood' page and allowing your location to be read.";
    } else if (msgLower.includes('eligible') || msgLower.includes('eligibility')) {
      reply = "Typically, you must be 18-65 years old, weigh at least 50kg, and be in good health to donate.";
    } else if (msgLower.includes('emergency')) {
      reply = "If this is a medical emergency, please use the red 'Find Blood Urgently' button on the Maps page to instantly find the 5 nearest hospitals.";
    } else if (msgLower.includes('hello') || msgLower.includes('hi')) {
      reply = "Hello! Welcome to the Global Online Blood Bank. How can I assist you today?";
    }

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
