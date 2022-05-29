"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeHasIngredients = void 0;
var typeorm_1 = require("typeorm");
var Ingredients_1 = require("./Ingredients");
var Metrics_1 = require("./Metrics");
var Recipes_1 = require("./Recipes");
var RecipeHasIngredients = /** @class */ (function () {
    function RecipeHasIngredients() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "recipe_id", unique: true })
    ], RecipeHasIngredients.prototype, "recipeId");
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "ingredient_id", unique: true })
    ], RecipeHasIngredients.prototype, "ingredientId");
    __decorate([
        (0, typeorm_1.PrimaryColumn)("integer", { name: "metric_id", unique: true })
    ], RecipeHasIngredients.prototype, "metricId");
    __decorate([
        (0, typeorm_1.Column)("numeric", { name: "amount", nullable: true })
    ], RecipeHasIngredients.prototype, "amount");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Ingredients_1.Ingredients; }, function (ingredients) { return ingredients.recipeHasIngredients; }),
        (0, typeorm_1.JoinColumn)([{ name: "ingredient_id", referencedColumnName: "id" }])
    ], RecipeHasIngredients.prototype, "ingredient");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Metrics_1.Metrics; }, function (metrics) { return metrics.recipeHasIngredients; }),
        (0, typeorm_1.JoinColumn)([{ name: "metric_id", referencedColumnName: "id" }])
    ], RecipeHasIngredients.prototype, "metric");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Recipes_1.Recipes; }, function (recipes) { return recipes.recipeHasIngredients; }),
        (0, typeorm_1.JoinColumn)([{ name: "recipe_id", referencedColumnName: "id" }])
    ], RecipeHasIngredients.prototype, "recipe");
    RecipeHasIngredients = __decorate([
        (0, typeorm_1.Index)("recipe_has_ingredients_recipe_id_ingredient_id_metric_id_key", ["ingredientId", "metricId", "recipeId"], {
            unique: true
        }),
        (0, typeorm_1.Entity)("recipe_has_ingredients", { schema: "public" })
    ], RecipeHasIngredients);
    return RecipeHasIngredients;
}());
exports.RecipeHasIngredients = RecipeHasIngredients;
