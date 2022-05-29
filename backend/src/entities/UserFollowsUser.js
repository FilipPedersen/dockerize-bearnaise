"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserFollowsUser = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("./Users");
var UserFollowsUser = /** @class */ (function () {
    function UserFollowsUser() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "user_id", unique: true })
    ], UserFollowsUser.prototype, "userId");
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "follower_id", unique: true })
    ], UserFollowsUser.prototype, "followerId");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", {
            name: "created_at",
            nullable: true,
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], UserFollowsUser.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.userFollowsUsers; }),
        (0, typeorm_1.JoinColumn)([{ name: "follower_id", referencedColumnName: "id" }])
    ], UserFollowsUser.prototype, "follower");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.userFollowsUsers2; }),
        (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }])
    ], UserFollowsUser.prototype, "user");
    UserFollowsUser = __decorate([
        (0, typeorm_1.Index)("user_follows_user_user_id_follower_id_key", ["followerId", "userId"], {
            unique: true
        }),
        (0, typeorm_1.Entity)("user_follows_user", { schema: "public" })
    ], UserFollowsUser);
    return UserFollowsUser;
}());
exports.UserFollowsUser = UserFollowsUser;
