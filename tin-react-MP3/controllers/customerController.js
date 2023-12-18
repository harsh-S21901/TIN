const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showCustomersList = (req, res, next) => {
    CustomerRepository.getCustomers()
        .then(customers => {
            res.render('pages/customers/list', {
                customers: customers,
                navLocation: 'customers'
            });
        });
}

exports.showCustomersFormNew = (req, res, next) => {
    res.render('pages/customers/form', {
    customer: {},
    pageTitle: req.__('customers.new'),
    formMode: 'createNew',
    btnLabel: 'Add Customer',
    formAction: '/customers/add',
    navLocation: 'customers',
    validationErrors: []
});
}


exports.showCustomersFormEdit = (req, res, next) => {
    const customerId = req.params.customerId;
    
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customers/form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: req.__('customers.edit'),
                btnLabel: 'Edit Customer',
                formAction: '/customers/edit',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}

exports.showCustomersDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customers/form', {
                customer: customer,
                formMode: 'showDetails',
                pageTitle: req.__('customers.details'),
                formAction: '',
                navLocation: 'customers',
                validationErrors: []
            });
        });
}

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    
    CustomerRepository.createCustomer(customerData)
        .then( result => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('pages/customers/form', {
                customer: customerData,
                pageTitle: req.__('customers.details'),
                formMode: 'createNew',
                btnLabel: 'Add Customer',
                formAction: '/customers/add',
                navLocation: 'customers',
                validationErrors: err.errors
            })
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    let error;
    
    CustomerRepository.updateCustomer(customerId, customerData)
        .then(result => {
            res.redirect('/customers');
        })
        .catch(err => {
            error = err;
            return CustomerRepository.getCustomerById(customerId)
        })
        .then(customer => {
            res.render('pages/customers/form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: req.__('customers.edit'),
                btnLabel: 'Edit Customer',
                formAction: '/customers/edit',
                navLocation: 'customers'
            })
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.customerId;
    const customerData = { ...req.body };
    
    CustomerRepository.deleteCustomer(customerId)
        .then( () => {
            res.redirect('/customers');
        })
        .catch(err => {
            res.render('pages/customers/form', {
                customer: customerData,
                formMode: 'delete',
                pageTitle: req.__('customers.edit'),
                btnLabel: 'Delete Customer',
                formAction: '/customers/delete',
                navLocation: 'customers',
                validationErrors: []
            })
        });
};


