import express from "express";
const express = express.Router;
export default Router;

import { createUser } from "#db/queries/users";
import { createToken } from "#utils/jwt";
import { requireBody } from "#middleware/requireBody";
import router from "./playlists";

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user)
      return res.status(401).json({ message: "Invalid username or password." });
    const token = await createToken({ id: user.id });
    res.send(token);
  });
