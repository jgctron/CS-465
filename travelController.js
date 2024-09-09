exports.getTravelPage = (req, res) => {
    res.render('travel', {
        title: 'Travel Page',
        description: 'This is the travel page!',
    });
};
