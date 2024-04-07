const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "one of the most famous sky screper in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlacesById = (req, res, next) => {
  const placeId = req.params.pid;
  const places = DUMMY_PLACES.filter((p) => p.id === placeId);

  if (!places || places.length === 0) {
    throw new HttpError("Could not find places for the provided id.", 404);
  }
  res.json({ places });
};

const getPlaceByUserId = (req, res) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => userId === p.creator);

  if (!place) {
    // const error = new Error("Could not find a place for the provided user id.");
    // error.code = 404;
    // return next(error);
    throw new HttpError(
      "Could not find a place for the provided user id.",
      404
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed,please check your data.", 422);
  }
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatePlace = { ...DUMMY_PLACES.find((p) => placeId === p.id) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => placeId === p.id);
  updatePlace.title = title;
  updatePlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};
const deletePlace = (req, res) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "deleted place" });
};

exports.getPlacesById = getPlacesById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
