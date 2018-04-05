const mongoose = require("mongoose");
const Burst = mongoose.model("Burst");
const User = mongoose.model("User");

exports.getBurstsByAuthor = async (req, res) => {
  const user = await User.findOne({ slug: req.params.slug });
  const bursts = await Burst.find({ author: user._id })

  console.log(user)
  console.log(bursts)

  res.render('author', { title: 'Author page', user, bursts });
}
