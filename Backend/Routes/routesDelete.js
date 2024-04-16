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
  
export default deleteRoutes;