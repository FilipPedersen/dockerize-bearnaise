"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRoles = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("./Users");
var UserRoles = /** @class */ (function () {
    function UserRoles() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], UserRoles.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "role", unique: true, length: 20 })
    ], UserRoles.prototype, "role");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Users_1.Users; }, function (users) { return users.role; })
    ], UserRoles.prototype, "users");
    UserRoles = __decorate([
        (0, typeorm_1.Index)("user_roles_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Index)("user_roles_role_key", ["role"], { unique: true }),
        (0, typeorm_1.Entity)("user_roles", { schema: "public" })
    ], UserRoles);
    return UserRoles;
}());
exports.UserRoles = UserRoles;
