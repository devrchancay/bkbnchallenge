"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var faker_1 = require("@faker-js/faker");
var axios_1 = require("axios");
var user = Array.from({ length: 30 })
    .fill(null)
    .map(function () { return ({
    firstName: faker_1.faker.name.firstName(),
    lastName: faker_1.faker.name.lastName(),
    email: faker_1.faker.internet.email(),
    phone: faker_1.faker.phone.phoneNumber("##########")
}); })
    .map(function (us) {
    return axios_1["default"].post("https://bkbnchallenge.herokuapp.com/contacts", __assign({}, us));
});
Promise.all(user)
    .then(function (res) {
    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
        var response = res_1[_i];
        console.log("created: ", response.data.firstName, response.data.lastName);
    }
})["catch"](function (err) {
    console.log("error", JSON.stringify(err.response.data));
});
