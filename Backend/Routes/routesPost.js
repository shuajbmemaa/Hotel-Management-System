import express from 'express'
import db from '../DB/db.js'
import jwt from 'jsonwebtoken'
import path from 'path';
import multer from 'multer';
import Chat from '../MongoDB/models/Chat.js';


const postRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

postRoutes.post('/login', (req, res) => {
  const { userOrEmail, password } = req.body;
  const sql = "SELECT * FROM users WHERE (name = ? OR email = ?) AND password=? ";

  db.query(sql, [userOrEmail, userOrEmail, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "An error occurred while logging in" });
    }
    if (result.length > 0) {
      req.session.role = result[0].role;
      const accessToken = jwt.sign({ id: result[0].id, role: result[0].role }, 'secretKey', { expiresIn: '1h' })
      const refreshToken = jwt.sign({ email: result[0].email }, 'refreshSecretKey')
      return res.json({ Login: true, userId: result[0].id, accessToken, refreshToken })
    } else {
      return res.json({ Login: false });
    }
  });
})

postRoutes.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const checkEmail = "SELECT * FROM users WHERE email = ?";

  db.query(checkEmail, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Email-i eshte ne perdorim" });
    } else {
      const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(sql, [name, email, password, role], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Gabim ne server" });
        }
        return res.status(201).json({ message: "Regjistrimi u krye me sukses" });
      });
    }
  });
})

postRoutes.post('/krijonjeLlogari', upload.single('image'), (req, res) => {
  const sql = "Insert into users (`name`,`email`,`password`,`role`,`img_url`,`gender`,`date_of_birth`) VALUES (?)"
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role,
    req.file.filename,
    req.body.gender,
    req.body.date_of_birth
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim gjate insertimit te produkteve ne databaze" })
    return res.json({ Status: "Success" })
  })
})

postRoutes.post('/shtonjeAmentie', upload.single('image'), (req, res) => {
  const sql = "Insert into amenties (`name`,`image`,`description`) VALUES (?)"
  const values = [
    req.body.name,
    req.file.filename,
    req.body.description
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim gjate insertimit te produkteve ne databaze" })
    return res.json({ Status: "Success", result: req.body })
  })
})

postRoutes.post('/insertHallTypes', upload.single('image'), (req, res) => {
  const sql = "Insert into hall_type (`title`,`short_code`,`baseOccupancy`,`higherOccupancy`,`amenties_id`,`basePrice`,`image`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.short_code,
    req.body.baseOccupancy,
    req.body.higherOccupancy,
    req.body.amenties_id,
    req.body.basePrice,
    req.file.filename
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err)
    return res.json({ Status: "Success" })
  })
})

postRoutes.post('/shtonjeFloor', (req, res) => {
  const { name, floor_number, description } = req.body;
  const checkNameQuery = "SELECT * FROM floors WHERE name = ?";

  db.query(checkNameQuery, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Emri i floor eshte ne perdorim" });
    } else {
      const sql = "INSERT INTO floors (name, floor_number, description) VALUES (?, ?, ?)";
      db.query(sql, [name, floor_number, description], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Gabim ne server" });
        }
        return res.status(201).json({ message: "Floor u insertua me sukses" });
      });
    }
  });
});



postRoutes.post('/krijoDhome', upload.single('image'), (req, res) => {
  const sql = "Insert into room_types (`title`,`short_code`,`base_occupancy`,`higher_occupancy`,`extra_bed`,`kids`,`amenties_id`,`base_price`,`extra_bed_price`,`image`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.short_code,
    req.body.base_occupancy,
    req.body.higher_occupancy,
    req.body.extra_bed,
    req.body.kids,
    req.body.amenties_id,
    req.body.base_price,
    req.body.extra_bed_price,
    req.file.filename,

  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim gjate insertimit te produkteve ne databaze" })
    return res.json({ Status: "Success" })
  })
})



postRoutes.post('/shtoRoom', (req, res) => {
  const { floor_id, room_type_id, room_number } = req.body;
  const checkRoomNumber = "Select * from room where room_number=?"
  db.query(checkRoomNumber, [room_number], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error" })
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Ky numer i dhomes ekziston!!" })
    } else {
      const sql = "INSERT INTO room (floor_id, room_type_id, room_number) VALUES (?, ?, ?)"
      db.query(sql, [floor_id, room_type_id, room_number], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error" });
        }
        return res.status(201).json({ message: "Dhoma u shtua me sukses!" });
      });
    }
  });
});

postRoutes.post('/createHall', (req, res) => {
  const sql = "Insert into hall (`floor_id`,`hall_type_id`,`hall_number`) VALUES (?)"
  const values = [
    req.body.floor_id,
    req.body.hall_type_id,
    req.body.hall_number
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim ne server" })
    return res.json({ Status: "Success" })
  })
})

postRoutes.post('/shtoService', (req, res) => {
  const sql = "Insert into service (`title`,`room_type_id`,`price_type`,`price`,`description`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.room_type_id,
    req.body.price_type,
    req.body.price,
    req.body.description
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim ne server" })
    return res.json({ Status: "Success" })
  })
})

postRoutes.post('/chat', async (req, res) => {
  const { question, response } = req.body;
  try {
    const chat = await Chat.findOne({ question });
    if (chat) {
      chat.response = response;
      await chat.save();
      res.json({ message: 'Përgjigja u përditësua me sukses.' });
    } else {
      const newChat = new Chat({ question, response });
      await newChat.save();
      res.json({ message: 'Përgjigja u ruajt me sukses.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

postRoutes.post('/shtoHouseK', (req, res) => {
  const sql = "Insert into housekeeping_status (`title`,`short_description`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.short_description,
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim ne server" })
    return res.json({ Status: "Success" })
  })
})

postRoutes.post('/krijoHouseKeeping', (req, res) => {
  const sql = "Insert into housekeeping (`housekeeping_status_id`,`room_id`,`hall_id`,`user_id`,`date`) VALUES (?)"
  const values = [
    req.body.housekeeping_status_id,
    req.body.room_id,
    req.body.hall_id,
    req.body.user_id,
    req.body.date
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim ne server" })
    return res.json({ Status: "Success" })
  })
})

export default postRoutes;