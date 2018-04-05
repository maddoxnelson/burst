const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const burstSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a Burst title.'
  },
  slug: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  },
  content: {
    type: String,
    required: 'Go on... write!'
  },
  genre: {
    type: String,
    required: 'Choose a genre.'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

burstSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    console.log('checking for modification... finding an identical one')
    return next(); // move along, don't redo the slug if name hasn't changed
  }
  // slugifies the name
  this.slug = slug(this.name);
  // find other stores with similar slug or slug-1
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const burstsWithSlug = await this.constructor.find({ slug: slugRegex });

  if(burstsWithSlug.length) {
    this.slug = `${this.slug}-${burstsWithSlug.length + 1}`;
  }

  // moves things along to the next part
  next();

});

function autopopulate(next) {
  this.populate('author');
  next()
};

burstSchema.pre('find', autopopulate);
burstSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Burst', burstSchema);
