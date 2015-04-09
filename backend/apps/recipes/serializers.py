from rest_framework import serializers
from models import *


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            try:
                ingredient = Ingredient.objects.get(name=ingredient_data["name"])
            except Ingredient.DoesNotExist:
                ingredient = Ingredient.objects.create(**ingredient_data)
            recipe.ingredients.add(ingredient)
        return recipe