const CustomerRepository = require('../repository/sequelize/CustomerRepository');
const authUtils = require('../util/authUtils');

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    CustomerRepository.findByEmail(email)
        .then(customer =>{
            if(!customer){
                res.render('index',{
                    navLocation: '',
                    loginError: "incorrect email or password"
                })
            } else if(authUtils.comparePasswords(password, customer.password) === true){ 
                req.session.loggedUser = customer;
                res.redirect('/');
            }else {
                res.render('index',{
                    navLocation: '',
                    loginError:"incorrect email or password"
                })
            }
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.logout  = (req,res,next) =>{
    req.session.loggedUser = undefined;
    res.redirect('/');
}