const mongoose = require("mongoose");
const Burst = mongoose.model("Burst");

exports.getBursts = (req, res) => {
  res.render('bursts', { title: 'Welcome to Burst!' });
};

exports.addBurst = (req, res) => {
  res.render('write', { title: 'Write a Burst.' });
};

exports.createBurst = async (req, res) => {
  const burst = await (new Burst(req.body)).save();
  req.flash('success', `Successfully created ${burst.title}!`);
  res.redirect(`/write/${burst.slug}`);
};
