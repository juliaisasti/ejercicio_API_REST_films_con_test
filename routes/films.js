const router = require("express").Router();
const fetchFilm = require("../utils/fetchFilms");

router.get("/:title?", async (req, res) => {
  try {
    let data = await fetchFilm(req.params.title);
    if (data == null) {
        res.status(404).json({message:'Film not found'});
    } else {
        res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({message:'Film not found'});
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: `Se ha guardado ${req.body.title}`
  });
});

router.put("/", (req, res) => {
  res.status(200).json({
    id: "0",
    message: `Se ha actualizado ${req.body.title}`
  });
});

router.delete("/:id?", (req, res) => {
  res.status(200).json({id: 123, message: "Se ha borrado la película con ID: 123"});
});

module.exports = router;