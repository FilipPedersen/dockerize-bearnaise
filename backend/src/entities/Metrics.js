"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Metrics = void 0;
var typeorm_1 = require("typeorm");
var RecipeHasIngredients_1 = require("./RecipeHasIngredients");
var Metrics = /** @class */ (function () {
    function Metrics() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], Metrics.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "metric", unique: true, length: 255 })
    ], Metrics.prototype, "metric");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RecipeHasIngredients_1.RecipeHasIngredients; }, function (recipeHasIngredients) { return recipeHasIngredients.metric; })
    ], Metrics.prototype, "recipeHasIngredients");
    Metrics = __decorate([
        (0, typeorm_1.Index)("metrics_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Index)("metrics_metric_key", ["metric"], { unique: true }),
        (0, typeorm_1.Entity)("metrics", { schema: "public" })
    ], Metrics);
    return Metrics;
}());
exports.Metrics = Metrics;
