const mongoose = require("mongoose");
const Burst = mongoose.model("Burst");
const User = mongoose.model("User");

exports.getBursts = async (req, res) => {
  const bursts = await Burst.find();

  res.render('bursts', { title: 'Welcome to Burst!', bursts });
};

exports.addBurst = (req, res) => {
  res.render('write', { title: 'Write a Burst.' });
};

exports.getBurstBySlug = async (req, res, next) => {
  const burst = await Burst.findOne({ slug: req.params.slug });

  if (!burst) return next();
  res.render('burst', { title: `${burst.name}`, burst })
}

exports.createBurst = async (req, res) => {
  req.body.author = req.user._id;
  const burst = await (new Burst(req.body)).save();
  req.flash('success', `Successfully created ${burst.title}!`);
  res.redirect(`/burst/${burst.slug}`);
};

exports.getBurstsByAuthor = async (req, res) => {
  const bursts = await Burst.getBurstsFromAuthor();
  res.render('author', { title: 'Author page', bursts});
}
