"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeSteps = void 0;
var typeorm_1 = require("typeorm");
var Recipes_1 = require("./Recipes");
var RecipeSteps = /** @class */ (function () {
    function RecipeSteps() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], RecipeSteps.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("smallint", { name: "step", nullable: true, "default": function () { return "1"; } })
    ], RecipeSteps.prototype, "step");
    __decorate([
        (0, typeorm_1.Column)("boolean", {
            name: "optional",
            nullable: true,
            "default": function () { return "false"; }
        })
    ], RecipeSteps.prototype, "optional");
    __decorate([
        (0, typeorm_1.Column)("text", { name: "content", nullable: true })
    ], RecipeSteps.prototype, "content");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Recipes_1.Recipes; }, function (recipes) { return recipes.recipeSteps; }),
        (0, typeorm_1.JoinColumn)([{ name: "recipe_id", referencedColumnName: "id" }])
    ], RecipeSteps.prototype, "recipe");
    RecipeSteps = __decorate([
        (0, typeorm_1.Index)("recipe_steps_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Entity)("recipe_steps", { schema: "public" })
    ], RecipeSteps);
    return RecipeSteps;
}());
exports.RecipeSteps = RecipeSteps;
