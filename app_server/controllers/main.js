// app_server/controllers/main.js

// Controller function for the home page (index)
module.exports.index = function (req, res) {
    res.render('index', { title: 'Travlr Getaways' });
};

// Controller function for the travel page
module.exports.travel = function (req, res) {
    res.render('travel', { title: 'Travel with Us' });
};

// You can create similar functions for other pages like 'about', 'contact', etc.
