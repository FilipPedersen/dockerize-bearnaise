"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Recipes = void 0;
var typeorm_1 = require("typeorm");
var RecipeComments_1 = require("./RecipeComments");
var RecipeHasIngredients_1 = require("./RecipeHasIngredients");
var RecipeHasTags_1 = require("./RecipeHasTags");
var RecipeSteps_1 = require("./RecipeSteps");
var Languages_1 = require("./Languages");
var Users_1 = require("./Users");
var UserLikesRecipe_1 = require("./UserLikesRecipe");
var Recipes = /** @class */ (function () {
    function Recipes() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], Recipes.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "user_id" })
    ], Recipes.prototype, "userId");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "title", length: 100 })
    ], Recipes.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "slug", length: 100 })
    ], Recipes.prototype, "slug");
    __decorate([
        (0, typeorm_1.Column)("text", { name: "description", nullable: true })
    ], Recipes.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)("character varying", {
            name: "cover_image",
            nullable: true,
            length: 255
        })
    ], Recipes.prototype, "coverImage");
    __decorate([
        (0, typeorm_1.Column)("boolean", { name: "public", nullable: true, "default": function () { return "true"; } })
    ], Recipes.prototype, "public");
    __decorate([
        (0, typeorm_1.Column)("integer", { name: "estimated_time", nullable: true })
    ], Recipes.prototype, "estimatedTime");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", {
            name: "created_at",
            nullable: true,
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], Recipes.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", {
            name: "edited_at",
            nullable: true,
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], Recipes.prototype, "editedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RecipeComments_1.RecipeComments; }, function (recipeComments) { return recipeComments.recipe; })
    ], Recipes.prototype, "recipeComments");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RecipeHasIngredients_1.RecipeHasIngredients; }, function (recipeHasIngredients) { return recipeHasIngredients.recipe; })
    ], Recipes.prototype, "recipeHasIngredients");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RecipeHasTags_1.RecipeHasTags; }, function (recipeHasTags) { return recipeHasTags.recipe; })
    ], Recipes.prototype, "recipeHasTags");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RecipeSteps_1.RecipeSteps; }, function (recipeSteps) { return recipeSteps.recipe; })
    ], Recipes.prototype, "recipeSteps");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Languages_1.Languages; }, function (languages) { return languages.recipes; }),
        (0, typeorm_1.JoinColumn)([{ name: "language_id", referencedColumnName: "id" }])
    ], Recipes.prototype, "language");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.recipes; }),
        (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }])
    ], Recipes.prototype, "user");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return UserLikesRecipe_1.UserLikesRecipe; }, function (userLikesRecipe) { return userLikesRecipe.recipe; })
    ], Recipes.prototype, "userLikesRecipes");
    Recipes = __decorate([
        (0, typeorm_1.Index)("recipes_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Entity)("recipes", { schema: "public" })
    ], Recipes);
    return Recipes;
}());
exports.Recipes = Recipes;
