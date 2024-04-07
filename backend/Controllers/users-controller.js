const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "anikat",
    email: "test@gg",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => (u.email = email));

  if (hasUser) {
    throw new HttpError("could not create user, email already exists", 422);
  }

  const createUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createUser);
  res.status(200).json({ user: createUser });
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify the user, credential seems to be wrong",
      401
    );
  }
  res.json({ message: "logged in" });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
