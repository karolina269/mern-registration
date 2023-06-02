const EventModel = require("../models/EventModel");

module.exports = {
  index: (req, res, next) => {
    EventModel.find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error while fetching events",
          error: err,
        });
      });
  },
  create: (req, res, next) => {
    const event = new EventModel({
      name: req.body.name,
      event: req.body.event,
      city: req.body.city,
    });
    event
      .save()
      .then((event) => {
        res.status(201).json(event);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error while creating event",
          error: err,
        });
      });
  },
  delete: (req, res, next) => {
    const id = req.params.id;
    EventModel.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({
          id: id,
          deleted: true,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "error while deleting event",
          error: err,
        });
      });
  },
};

/* na warsztacie
module.exports = {
  index: (req, res, next) => {
    EventModel.find({}, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "error while fetching events",
          error: err,
        });
      }
      res.json(result);
    });
  },
  create: (req, res, next) => {
    const event = new EventModel({
      name: req.body.name,
      event: req.body.event,
      city: req.body.city,
    });
    event.save((err, event) => {
      if (err) {
        return res.status(500).json({
          message: "error while creating event",
          error: err,
        });
      }
      return res.status(201).json(event);
    });
  },
  delete: (req, res, next) => {
    const id = req.params.id;
    EventModel.findByIdAndDelete(id, (err, event) => {
      if (err) {
        return res.status(500).json({
          message: "error while deleting event",
          error: err,
        });
      }
      return res.status(200).json({
        id: id,
        deleted: true,
      });
    });
  },
};
*/
