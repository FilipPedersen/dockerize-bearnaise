"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tags = void 0;
var typeorm_1 = require("typeorm");
var RecipeHasTags_1 = require("./RecipeHasTags");
var UserFollowsTag_1 = require("./UserFollowsTag");
var Tags = /** @class */ (function () {
    function Tags() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" })
    ], Tags.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("character varying", { name: "tag", unique: true, length: 40 })
    ], Tags.prototype, "tag");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RecipeHasTags_1.RecipeHasTags; }, function (recipeHasTags) { return recipeHasTags.tag; })
    ], Tags.prototype, "recipeHasTags");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return UserFollowsTag_1.UserFollowsTag; }, function (userFollowsTag) { return userFollowsTag.tag; })
    ], Tags.prototype, "userFollowsTags");
    Tags = __decorate([
        (0, typeorm_1.Index)("tags_pkey", ["id"], { unique: true }),
        (0, typeorm_1.Index)("tags_tag_key", ["tag"], { unique: true }),
        (0, typeorm_1.Entity)("tags", { schema: "public" })
    ], Tags);
    return Tags;
}());
exports.Tags = Tags;
