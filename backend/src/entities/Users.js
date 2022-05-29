"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var RecipeComments_1 = require("./RecipeComments");
var Recipes_1 = require("./Recipes");
var UserFollowsTag_1 = require("./UserFollowsTag");
var UserFollowsUser_1 = require("./UserFollowsUser");
var UserLikesRecipe_1 = require("./UserLikesRecipe");
var UserRoles_1 = require("./UserRoles");
var Users = /** @class */ (function () {
    function Users() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], Users.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "username", unique: true, length: 50 })
    ], Users.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "display_name",
            nullable: true,
            length: 50
        })
    ], Users.prototype, "displayName");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "email", unique: true, length: 255 })
    ], Users.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "password", length: 255 })
    ], Users.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "avatar_url",
            nullable: true,
            length: 255,
            "default": function () { return "NULL::character varying"; }
        })
    ], Users.prototype, "avatarUrl");
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "description",
            nullable: true,
            length: 255,
            "default": function () { return "NULL::character varying"; }
        })
    ], Users.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "location",
            nullable: true,
            length: 40,
            "default": function () { return "NULL::character varying"; }
        })
    ], Users.prototype, "location");
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "website",
            nullable: true,
            length: 40,
            "default": function () { return "NULL::character varying"; }
        })
    ], Users.prototype, "website");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", {
            name: "created_at",
            nullable: true,
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], Users.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", { name: "banned_at", nullable: true })
    ], Users.prototype, "bannedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RecipeComments_1.RecipeComments; }, function (recipeComments) { return recipeComments.user; })
    ], Users.prototype, "recipeComments");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Recipes_1.Recipes; }, function (recipes) { return recipes.user; })
    ], Users.prototype, "recipes");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return UserFollowsTag_1.UserFollowsTag; }, function (userFollowsTag) { return userFollowsTag.user; })
    ], Users.prototype, "userFollowsTags");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return UserFollowsUser_1.UserFollowsUser; }, function (userFollowsUser) { return userFollowsUser.follower; })
    ], Users.prototype, "userFollowsUsers");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return UserFollowsUser_1.UserFollowsUser; }, function (userFollowsUser) { return userFollowsUser.user; })
    ], Users.prototype, "userFollowsUsers2");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return UserLikesRecipe_1.UserLikesRecipe; }, function (userLikesRecipe) { return userLikesRecipe.user; })
    ], Users.prototype, "userLikesRecipes");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserRoles_1.UserRoles; }, function (userRoles) { return userRoles.users; }),
        (0, typeorm_1.JoinColumn)([{ name: "role_id", referencedColumnName: "id" }])
    ], Users.prototype, "role");
    Users = __decorate([
        (0, typeorm_1.Index)("users_email_key", ["email"], { unique: true }),
        (0, typeorm_1.Index)("users_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Index)("users_username_key", ["username"], { unique: true }),
        (0, typeorm_1.Entity)("users", { schema: "public" })
    ], Users);
    return Users;
}());
exports.Users = Users;
