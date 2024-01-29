const path = require("path");

// Use the existing dishes data to validate 
const dishes = require(path.resolve("src/data/dishes-data"));
const validate = require("../utils/validate");

// function to assign ID's when necessary
const nextId = require("../utils/nextId");
const { isIdMatchingWithRouteId } = require("../utils/validate");

// create new dish, call nextId, call 
function create(req, res, next) {
    const { data } = req.body;
    const newDish = {
        id: nextId(),
        ...data
    }
    dishes.push(newDish);
    res.status(201).json({data: newDish});
}

function isExists(req, res, next) {
    const {dishId} = req.params
    const dishFound = dishes.find(dish => dish.id === dishId)
    if (dishFound) {
        res.locals.dish = dishFound;
        next()
    } else {
        next({
            status: 404,
            message: `Dish does not exist: ${dishId}.`
        })
    }
}

function read(req, res) {
    const dish = res.locals.dish;
    res.status(200).json({data: dish})
}

function list(req, res) {
    res.status(200).json({data: dishes})
}

function update(req, res) {
    const dish = res.locals.dish;
    const body = req.body.data;
        let id;
        if (body.id) {
            id = body.id;
        } else {
            id = dish.id
        }
        res.json({ data: { ...body, id} });
}

module.exports = {
    create: [
        validate.validateObjectStringKeys('name', 'Dish'),
        validate.validateObjectStringKeys('description', 'Dish'),
        validate.validateObjectStringKeys('image_url', 'Dish'),
        validate.validateObjectIntegerKeys('price', 'Dish'),
        create
    ],
    list,
    read: [
        isExists,
        read
    ],
    update: [
        isExists,
        isIdMatchingWithRouteId('dishId', 'Dish'),
        validate.validateObjectStringKeys('name', 'Dish'),
        validate.validateObjectStringKeys('description', 'Dish'),
        validate.validateObjectStringKeys('image_url', 'Dish'),
        validate.validateObjectIntegerKeys('price', 'Dish'),
        update
    ]
}
