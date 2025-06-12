import express from "express";
const router = express.Router();
export default router;

import { getPlaylistsByTrackId } from "#db/queries/playlists";
import { getTracks, getTrackById } from "#db/queries/tracks";

import requireUser from "#middleware/requireUser";

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  req.track = track;
  next();
});

router.route("/:id").get(async (req, res) => {
  res.send(req.track);
});

router.route("/:id/playlists").get(requireUser, async (req, res) => {
  const playlists = await getPlaylistsByTrackId(req.track.id);
  res.send(playlists);
});
