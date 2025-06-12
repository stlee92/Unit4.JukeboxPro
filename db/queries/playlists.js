import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
  INSERT INTO playlists
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

export async function getPlaylistByUserId() {
  const sql = `
  SELECT *
  FROM playlists WHERE id=$1
  `;
  const { rows: playlists } = await db.query(sql, [id]);
  return playlists;
}

export async function getPlaylistByTrackId(id) {
  const sql = `
  SELECT playlists.*
  FROM playlists JOIN playlist_tracks ON playlists.id === playlists_tracks.id
  WHERE playlists_tracks.track_id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}
