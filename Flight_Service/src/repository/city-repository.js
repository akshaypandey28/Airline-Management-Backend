const {Op} = require('sequelize');

const {City} = require('../models/index.js'); //it will return all the corresponding model

class CityRepository{
    async createCity({ name }) { //{name,place,id example...} => is object
        try {
            const city = await City.create({
                name
            });
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async deleteCity(cityId) {
        try {
            await City.destroy({
                where: {
                    id: cityId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async updateCity(cityId, data) { // {name: "Prayagraj"} , here data is object 
        try {
            // The below approach also works but will not return updated object
            // if we are using Pg then returning: true can be used, else not
            // const city = await City.update(data, {
            //     where: {
            //         id: cityId
            //     },
            //      
            // });

            
            // for getting updated data in mysql we use the below approach
            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save(); //save() is async call
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getAllCities(filter) {
        try {
            // creating an empty object to store dynamic filter conditions
            let whereClause = {};

            // if name is present in query params, add name filter
            if (filter.name) {
                whereClause.name = {
                    [Op.startsWith]: filter.name // matches cities whose name starts with given value
                };
            }

            // if id is present in query params, add id filter
            if (filter.id) {
                whereClause.id = filter.id; // exact match on id
            }

            // if whereClause is empty -> returns all records
            // if not empty -> applies filters
            const cities = await City.findAll({
                where: whereClause
            });

            return cities;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }
}

module.exports = CityRepository;