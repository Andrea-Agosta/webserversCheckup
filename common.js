function getUserById(id) {
  return db.find((dev) => dev.id == id);
}

function idExistInDb(id) {
  const dev = getUserById(id);
  return dev ? true : false;
}

module.exports = { getUserById, idExistInDb };
