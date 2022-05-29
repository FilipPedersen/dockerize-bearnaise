"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserFollowsTag = void 0;
var typeorm_1 = require("typeorm");
var Tags_1 = require("./Tags");
var Users_1 = require("./Users");
var UserFollowsTag = /** @class */ (function () {
    function UserFollowsTag() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "user_id", unique: true })
    ], UserFollowsTag.prototype, "userId");
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "tag_id", unique: true })
    ], UserFollowsTag.prototype, "tagId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tags_1.Tags; }, function (tags) { return tags.userFollowsTags; }),
        (0, typeorm_1.JoinColumn)([{ name: "tag_id", referencedColumnName: "id" }])
    ], UserFollowsTag.prototype, "tag");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.userFollowsTags; }),
        (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }])
    ], UserFollowsTag.prototype, "user");
    UserFollowsTag = __decorate([
        (0, typeorm_1.Index)("user_follows_tag_user_id_tag_id_key", ["tagId", "userId"], {
            unique: true
        }),
        (0, typeorm_1.Entity)("user_follows_tag", { schema: "public" })
    ], UserFollowsTag);
    return UserFollowsTag;
}());
exports.UserFollowsTag = UserFollowsTag;
