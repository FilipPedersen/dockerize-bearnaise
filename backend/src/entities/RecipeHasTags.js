"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeHasTags = void 0;
var typeorm_1 = require("typeorm");
var Recipes_1 = require("./Recipes");
var Tags_1 = require("./Tags");
var RecipeHasTags = /** @class */ (function () {
    function RecipeHasTags() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "recipe_id", unique: true })
    ], RecipeHasTags.prototype, "recipeId");
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "tag_id", unique: true })
    ], RecipeHasTags.prototype, "tagId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Recipes_1.Recipes; }, function (recipes) { return recipes.recipeHasTags; }),
        (0, typeorm_1.JoinColumn)([{ name: "recipe_id", referencedColumnName: "id" }])
    ], RecipeHasTags.prototype, "recipe");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Tags_1.Tags; }, function (tags) { return tags.recipeHasTags; }),
        (0, typeorm_1.JoinColumn)([{ name: "tag_id", referencedColumnName: "id" }])
    ], RecipeHasTags.prototype, "tag");
    RecipeHasTags = __decorate([
        (0, typeorm_1.Index)("recipe_has_tags_recipe_id_tag_id_key", ["recipeId", "tagId"], {
            unique: true
        }),
        (0, typeorm_1.Entity)("recipe_has_tags", { schema: "public" })
    ], RecipeHasTags);
    return RecipeHasTags;
}());
exports.RecipeHasTags = RecipeHasTags;
