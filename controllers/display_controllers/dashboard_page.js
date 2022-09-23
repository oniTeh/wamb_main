const dashboardPage = (req, res,done) => {
 return  res.render('dashboard', {
    title: 'Dashboard',
    user: req.user,
    // message: req.flash('message'),
  });
  
};

module.exports = {
  dashboardPage,
};