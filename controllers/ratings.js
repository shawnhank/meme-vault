
const Rating = require('../models/rating');


async function createOrUpdate(req, res) {

  try {
    await Rating.findOneAndUpdate(
      { 
        user: req.session.user._id,    
        meme: req.params.id            
      },
      { 
        value: req.body.value         
      },
      {
        upsert: true,                  
        new: true,                     
        runValidators: true            
      }
    );

 
    req.flash('success', 'Your rating has been saved.');
    res.redirect(`/memes/${req.params.id}`);

  } catch (err) {
    
    req.flash('error', 'Unable to save rating');
    res.redirect(`/memes/${req.params.id}`);
  }
}
async function remove(req, res) {
  try {
    // Find and delete the rating
    await Rating.findOneAndDelete({
      user: req.session.user._id,      
      meme: req.params.id              
    });

  
  req.flash('info', 'Your rating has been removed.');
  res.redirect(`/memes/${req.params.id}`);

  } catch (err) {
    
    req.flash('error', 'Unable to remove rating');
    res.redirect(`/memes/${req.params.id}`);
  }
}

module.exports = { createOrUpdate, remove };