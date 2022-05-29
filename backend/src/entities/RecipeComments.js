"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeComments = void 0;
var typeorm_1 = require("typeorm");
var Recipes_1 = require("./Recipes");
var Users_1 = require("./Users");
var RecipeComments = /** @class */ (function () {
    function RecipeComments() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], RecipeComments.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("text", { name: "comment" })
    ], RecipeComments.prototype, "comment");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", {
            name: "created_at",
            nullable: true,
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], RecipeComments.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)("timestamp with time zone", {
            name: "edited_at",
            nullable: true,
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], RecipeComments.prototype, "editedAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Recipes_1.Recipes; }, function (recipes) { return recipes.recipeComments; }),
        (0, typeorm_1.JoinColumn)([{ name: "recipe_id", referencedColumnName: "id" }])
    ], RecipeComments.prototype, "recipe");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.recipeComments; }),
        (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }])
    ], RecipeComments.prototype, "user");
    RecipeComments = __decorate([
        (0, typeorm_1.Index)("recipe_comments_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Entity)("recipe_comments", { schema: "public" })
    ], RecipeComments);
    return RecipeComments;
}());
exports.RecipeComments = RecipeComments;
