import express from 'express'
import db from '../DB/db.js'

const deleteRoutes=express.Router();

deleteRoutes.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së përdoruesit" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Pajisja nuk u gjet" });
        }
        return res.status(200).json({ Status: "Success", Message: "Pajisja u fshi me sukses" });
    });
})

deleteRoutes.delete('/deleteAmenties/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM amenties WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së përdoruesit" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Pajisja nuk u gjet" });
        }
        return res.status(200).json({ Status: "Success", Message: "Pajisja u fshi me sukses" });
    });
  })
  deleteRoutes.delete('/deleteFloors/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM floors WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së floor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Floor nuk u gjet" });
        }
        return res.status(200).json({ Status: "Success", Message: "Floor u fshi me sukses" });
    });
  });
  
  deleteRoutes.delete('/deleteHallType/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM hall_type WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së hall type" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Hall Type nuk u gjet" });
        }
        return res.status(200).json({ Status: "Success", Message: "Hall Type u fshi me sukses" });
    });
  });

  deleteRoutes.delete('/deleteRoomT/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM room_types WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së dhomës!" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Dhoma nuk u gjet!" });
        }
        return res.status(200).json({ Status: "Success", Message: "Dhoma u fshie me sukses!" });
    });
  });
  
  deleteRoutes.delete('/deleteRoom/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM room WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së dhomës!" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Dhoma nuk u gjet!" });
        }
        return res.status(200).json({ Status: "Success", Message: "Dhoma u fshie me sukses!" });
    });
  });

  deleteRoutes.delete('/deleteHall/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM hall WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së hall" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Hall nuk u gjet" });
        }
        return res.status(200).json({ Status: "Success", Message: "Hall u fshi me sukses" });
    });
  });

  deleteRoutes.delete('/deleteService/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM service WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së service!" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Service nuk u gjet!" });
        }
        return res.status(200).json({ Status: "Success", Message: "Service u fshie me sukses!" });
    });
  });

  deleteRoutes.delete('/deleteHouseKs/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM housekeeping_status WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së housekeepingS!" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "HousekeepingS nuk u gjet!" });
        }
        return res.status(200).json({ Status: "Success", Message: "HousekeepingS u fshie me sukses!" });
    });
  });
  
export default deleteRoutes;