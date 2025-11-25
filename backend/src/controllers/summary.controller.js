exports.generateSummary = (req, res) => {
  const { title, description, attendees = [] } = req.body;

  // mock summary
  const summary = `Summary: ${title}. Attendees: ${attendees.length}. Notes: ${description?.slice(0, 120)}...`;

  res.json({ summary });
};
