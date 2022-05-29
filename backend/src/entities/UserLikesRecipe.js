"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserLikesRecipe = void 0;
var typeorm_1 = require("typeorm");
var Recipes_1 = require("./Recipes");
var Users_1 = require("./Users");
var UserLikesRecipe = /** @class */ (function () {
    function UserLikesRecipe() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "recipe_id", unique: true })
    ], UserLikesRecipe.prototype, "recipeId");
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "user_id", unique: true })
    ], UserLikesRecipe.prototype, "userId");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", {
            name: "created_at",
            nullable: true,
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], UserLikesRecipe.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Recipes_1.Recipes; }, function (recipes) { return recipes.userLikesRecipes; }),
        (0, typeorm_1.JoinColumn)([{ name: "recipe_id", referencedColumnName: "id" }])
    ], UserLikesRecipe.prototype, "recipe");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.userLikesRecipes; }),
        (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }])
    ], UserLikesRecipe.prototype, "user");
    UserLikesRecipe = __decorate([
        (0, typeorm_1.Index)("user_likes_recipe_recipe_id_user_id_key", ["recipeId", "userId"], {
            unique: true
        }),
        (0, typeorm_1.Entity)("user_likes_recipe", { schema: "public" })
    ], UserLikesRecipe);
    return UserLikesRecipe;
}());
exports.UserLikesRecipe = UserLikesRecipe;
