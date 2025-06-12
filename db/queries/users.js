import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const sql =
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
  const user = await db.query(sql, [username, password]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `SELECT * FROM users WHERE username = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username, password]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}
