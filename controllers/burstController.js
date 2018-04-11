const mongoose = require("mongoose");
const Burst = mongoose.model("Burst");
const User = mongoose.model("User");

const confirmOwner = (burst, user) => {
  if (!burst.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it.');
  }
};

exports.getBursts = async (req, res) => {
  const bursts = await Burst.find();

  res.render('bursts', { title: 'Welcome to Burst!', bursts });
};

exports.addBurst = (req, res) => {
  res.render('write', { title: 'Write a Burst.' });
};

exports.editBurst = async (req, res) => {
  // 1. Find the burst given the ID
  const burst = await Burst.findOne({ _id: req.params.id });
  // 2. Confirm they are the owner of the store.
  confirmOwner(burst, req.user);

  // 3. render out the edit form so user can update their burst.
  res.render('editBurst', { title: `Edit ${burst.name}`, burst })
}

exports.updateBurst = async (req, res) => {
  console.log(req.params.id)

  const burst1 = await Burst.findOne({ _id: req.params.id })

  console.log(req.body)

  const burst = await Burst.findOneAndUpdate(
    { _id: req.params.id }, // query
    req.body, // data
    { // options
      new: true,          // return new burst, not old burst
      runValidators: true // force our model to run required validators against this
    }
  ).exec();

  //console.log(burst)

  req.flash('success', `Successfully updated ${burst.name}.<a href="/burst/${burst.slug}">View burst -></a>`);
  res.redirect(`/bursts/${burst._id}/edit`)
  // redirect them the store and tell them it worked
};

exports.getBurstBySlug = async (req, res, next) => {
  const burst = await Burst.findOne({ slug: req.params.slug });

  if (!burst) return next();
  res.render('burst', { title: `${burst.name}`, burst })
}

exports.createBurst = async (req, res) => {
  // TODO carry through burst bits to give users a second chance to finish
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
