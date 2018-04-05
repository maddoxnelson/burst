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

exports.showBurstsByGenre = async (req, res) => {
  const genre = req.params.genre;
  const bursts = await Burst.find({ genre: genre });
  res.render('bursts', { title: `${genre} bursts`, bursts})
}

exports.getBurstsByAuthor = async (req, res) => {
  const user = await User.findOne({ slug: req.params.slug });
  const bursts = await Burst.find({ author: user._id })

  res.render('author', { title: 'Author page', user, bursts });
}
