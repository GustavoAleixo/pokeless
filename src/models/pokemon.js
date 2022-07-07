import mongoose from 'mongoose'

const Pokemon = new mongoose.Schema({
    name: String,
    level: Number
});

export const PokemonModel = mongoose.models.Pokemons || mongoose.model('Pokemons', Pokemon, 'pokemons');