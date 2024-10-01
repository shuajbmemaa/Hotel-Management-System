import express from 'express'
import db from '../DB/db.js'
import jwt from 'jsonwebtoken'
import path from 'path';
import multer from 'multer';
import Chat from '../MongoDB/models/Chat.js';
import Review from '../MongoDB/models/Review.js';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
const stripe = Stripe('yourSecretKey');
import { sendResetEmail } from '../Email/emailService.js'


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
      return res.json({ Login: true, userId: result[0].id, role: result[0].role, accessToken, refreshToken })
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

postRoutes.post('/shtoReview', async (req, res) => {
  const { userId, rating, comment } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const newReview = new Review({ userId, rating, comment });
  try {
    await newReview.save();
    res.json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save review' });
  }
});

postRoutes.post('/importData', (req, res) => {
  const data = req.body.data;

  for (let i = 1; i < data.length; i++) {
    const [name, floor_number, description] = data[i];

    db.query('INSERT INTO floors (name, floor_number, description) VALUES (?, ?, ?)', [name, floor_number, description], (err, result) => {
      if (err) {
        console.error('Error inserting row:', err);
      } else {
        console.log('Row inserted successfully:', result);
      }
    });
  }
  res.status(200).json({ message: 'Data imported successfully.' });
});


postRoutes.post('/importDataToRooms', (req, res) => {
  const data = req.body.data;

  let errors = false;

  for (let i = 1; i < data.length; i++) {
    const [floor_id, room_type_id, room_number] = data[i];

    db.query('INSERT INTO room (floor_id, room_type_id, room_number) VALUES (?, ?, ?)', [floor_id, room_type_id, room_number], (err, result) => {
      if (err) {
        console.error('Error inserting row:', err);
        errors = true;
      } else {
        console.log('Row inserted successfully:', result);
      }

      if (i === data.length - 1) {
        if (errors) {
          return res.status(500).json(err);
        } else {
          return res.status(200).json(err);
        }
      }
    });
  }
});


const endpointSecret = 'yourEndpointSecret';

postRoutes.post('/create-checkout-session', async (req, res) => {
  const {
    userId,
    total,
    name,
    email,
    phone,
    roomId,
    nights,
    checkInDate,
    checkOutDate
  } = req.body;

  try {
    const sql = `INSERT INTO booking (userId, room_id, name, email, phone, total, nights, status, checkIn, checkOut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      userId,
      roomId,
      name,
      email,
      phone,
      total,
      nights,
      'pending',
      checkInDate,
      checkOutDate
    ];

    db.query(sql, values, async (err, result) => {
      if (err) {
        console.error('Error saving to database:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const bookingId = result.insertId;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `http://localhost:5173/success?bookingId=${bookingId}`,
        cancel_url: 'http://localhost:5173/',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Booking for Room ${roomId}`,
              },
              unit_amount: total * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          name,
          email,
          phone,
          roomId,
          nights,
          checkInDate,
          checkOutDate,
          total
        }
      });

      const updateSql = `UPDATE booking SET StripeSessionId = ? WHERE id = ?`;
      db.query(updateSql, [session.id, bookingId], (updateErr) => {
        if (updateErr) {
          console.error('Error updating StripeSessionId in database:', updateErr);
          return res.status(500).json({ error: 'Database update error' });
        }
        res.json({ url: session.url });
      });
    });
  } catch (error) {
    console.error('Error creating checkout session', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

postRoutes.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('Event received:', event.type);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log('Checkout session completed:', session);

    if (!session.metadata) {
      console.error('Session metadata is missing');
      return res.status(400).send('Session metadata is missing');
    }

    console.log('Session metadata:', session.metadata);

    const sql = `
      INSERT INTO booking (
        userId,
        room_id,
        name,
        email,
        phone,
        total,
        nights,
        status,
        checkIn,
        checkOut,
        StripeSessionId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      session.metadata.userId,
      session.metadata.roomId,
      session.metadata.name,
      session.metadata.email,
      session.metadata.phone,
      session.metadata.total,
      session.metadata.nights,
      'completed',
      session.metadata.checkInDate,
      session.metadata.checkOutDate,
      session.id
    ];

    console.log('Values to insert into database:', values);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
      } else {
        console.log('Booking inserted successfully:', result);
      }
    });
  } else {
    console.log('Unhandled event type:', event.type);
  }

  res.status(200).send();
});

postRoutes.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).send('Gabim gjate kontrollimit te perdoruesit');
    if (result.length === 0) return res.status(404).send('Perdoruesi nuk u gjet');

    const token = jwt.sign({ email }, "secretKey", { expiresIn: '1h' });
    //const base64Token = Buffer.from(token).toString('base64');
    //const token = jwt.sign({ email: result[0].email }, 'refreshSecretKey', { expiresIn: '3h' })
    console.log(token);


    sendResetEmail(email, token).then(() => {
      res.send('Email-i per resetimin e fjalekalimit u dergua');
    }).catch((error) => {
      res.status(500).send('Gabim gjate dergimit te email-it');
      console.log(error);
    });
  });
});

postRoutes.post('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  console.log(token);

  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, "secretKey");
    const email = decoded.email;

    db.query('UPDATE users SET password = ? WHERE email = ?', [password, email], (err, result) => {
      if (err) return res.status(500).send('Gabim gjate perditesimit te fjalekalimit');
      res.send('Fjalekalimi u resetua me sukses');
    });
  } catch (error) {
    res.status(400).send('Token i pavlefshem ose i skaduar');
  }
});

postRoutes.post('/checkAvailability', (req, res) => {
  const { id, checkInDate, numberOfNights } = req.body;

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + parseInt(numberOfNights));

  const query = `
    SELECT * FROM booking
    WHERE room_id = ? 
    AND (checkIn <= ? AND checkOut >= ?)
  `;

  db.query(query, [id, checkOut, checkIn], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ isAvailable: false });
    }

    if (results.length > 0) {
      res.json({ isAvailable: false });
    } else {
      res.json({ isAvailable: true });
    }
  });
});

postRoutes.post('/importJsonData', (req, res) => {
  const data = req.body.data;

  if (!Array.isArray(data)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
  }

  for (let i = 0; i < data.length; i++) {
    const { title, room_type_id, price_type, price, description } = data[i];

    db.query('INSERT INTO service (title, room_type_id, price_type, price, description) VALUES (?, ?, ?, ?, ?)',
      [title, room_type_id, price_type, price, description],
      (err, result) => {
        if (err) {
          console.error('Error inserting row:', err);
        } else {
          console.log('Row inserted successfully:', result);
        }
      });
  }
  res.status(200).json({ message: 'Data imported successfully.' });
});

export default postRoutes;