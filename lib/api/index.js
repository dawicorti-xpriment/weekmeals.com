module.resources = {
    session: require('./session')
};

exports.register = function (prefix, app) {
    Object.keys(module.resources).forEach(function (name) {
        module.resources[name].register(prefix + '/' + name, app);
    });
};