import express from 'express'
import db from '../DB/db.js';
import Review from '../MongoDB/models/Review.js';

const getRoutes = express.Router();

getRoutes.get('/logout', (req, res) => {
  req.session.destroy();
  return res.json("Success");
})

getRoutes.get('/', (req, res) => {
  if (req.session.role) {
    return res.json({ valid: true, role: req.session.role })
  } else {
    return res.json({ valid: false })
  }
})

getRoutes.get('/getUseret', (req, res) => {
  const sql = "Select id,name,email,img_url,gender,date_of_birth from users";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getAmenties', (req, res) => {
  const sql = "Select id,name,image,description from amenties";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getUsers/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select name,email,role,img_url,date_of_birth from users where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getProfile/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select name,email,password,img_url from users where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getUserProfile/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select name,email,password,img_url,gender,date_of_birth from users where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ Status: "Success", Result: result })
  })
})
getRoutes.get('/getAmenties/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select name,description from amenties where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getFloors', (req, res) => {
  const sql = "Select id,name,floor_number,description from floors";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getFloor/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select name,floor_number,description from floors where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getHallTypes/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select title,short_code,amenties_id,basePrice from hall_type where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getHallTypes', (req, res) => {
  const sql = "Select hall_type.id,hall_type.title,hall_type.short_code,hall_type.baseOccupancy,hall_type.higherOccupancy,amenties.name as amenties,hall_type.basePrice,hall_type.image from hall_type INNER JOIN amenties on hall_type.amenties_id=amenties.id "
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ Error: "Gabim ne Server" })
    return res.json({ Status: "Success", Result: result });
  })
})

getRoutes.get('/getRoomT', (req, res) => {
  const sql = "Select room_types.id,room_types.title,room_types.short_code,amenties.name as amentie,room_types.image,room_types.base_occupancy,room_types.higher_occupancy,room_types.kids,room_types.base_price from room_types inner join amenties on amenties.id=room_types.amenties_id";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getRoommT', (req, res) => {
  const sql = "Select room_types.id,room_types.title,room_types.short_code,amenties.name as amentie,room_types.image from room_types inner join amenties on amenties.id=room_types.amenties_id";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})




getRoutes.get('/getRooms', (req, res) => {
  const sql = "Select room.id,room.room_number,room_types.title as roomm,floors.name as floors from floors inner join room on floors.id=room.floor_id inner join room_types on room.room_type_id=room_types.id   ";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ Status: "Success", Result: result })
  })
})


getRoutes.get('/getRoomT/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select title,short_code,base_occupancy,higher_occupancy,extra_bed,kids,amenties_id,base_price,extra_bed_price,image from room_types where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})


getRoutes.get('/getRooms/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select floor_id,room_type_id,room_number from room where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getHall', (req, res) => {
  const sql = "Select hall.id,floors.name as emri,hall_type.title as halltype,hall.hall_number from hall_type INNER JOIN hall on hall_type.id=hall.hall_type_id INNER JOIN floors on floors.id=hall.floor_id ";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ Error: "Gabim ne Server" })
    return res.json({ Ok: "OK", Halls: result });
  })
})

getRoutes.get('/getHall/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select floor_id,hall_type_id,hall_number from hall where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/api/profile', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const userId = req.query.userId;
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results[0]);
    }
  });
});

getRoutes.get('/getServices', (req, res) => {
  const sql = "Select service.id,service.title,room_types.title as roomType,service.price from service INNER JOIN room_types on room_types.id=service.room_type_id ";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ Error: "Gabim ne Server" })
    return res.json({ Status: "Success", Result: result });
  })
})


getRoutes.get('/getService/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select * from service where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getHouseKS', (req, res) => {
  const sql = "Select * from housekeeping_status";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getHouseeKS/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select * from housekeeping_status where id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getHouseKeeping', (req, res) => {
  const sql = "Select housekeeping.id,housekeeping_status.title as hks,room.id as room from housekeeping_status INNER JOIN housekeeping on housekeeping_status.id=housekeeping.housekeeping_status_id inner join room on housekeeping.room_id=room.id ";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ message: "Gabim" })
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getEmployee', (req, res) => {
  const sql = "Select name,img_url from users where role ='employee'";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/getAdminData', (req, res) => {
  const sql = "Select name,img_url from users where role ='admin'";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

getRoutes.get('/orders', (req, res) => {
  const sql = `Select booking.id,users.name as username,room_types.title as room,
              booking.name,booking.email,booking.nights,booking.total,
              booking.checkIn,booking.checkOut,booking.status
              from users INNER JOIN booking ON users.id=booking.userId
              INNER JOIN room_types ON booking.room_id=room_types.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err)
    return res.status(200).json({ Status: "Success", Result: result })
  })
})

getRoutes.get('/bookingsC', async (req, res) => {
  try {
    const sql = "SELECT room_id, name, checkIn, checkOut FROM booking";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({ Status: "Success", Result: result })
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Error fetching bookings');
  }
})

getRoutes.get('/getServicesForRoom/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const query = "SELECT * FROM service WHERE room_type_id = ?";
  db.query(query, [roomId], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: "Error", Error: err });
    }
    res.json({ Status: "Success", Result: result });
  });
});

getRoutes.get('/getRoomNumber/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const query = "SELECT * FROM room WHERE room_type_id = ?";
  db.query(query, [roomId], (err, result) => {
    if (err) {
      return res.status(500).json({ Status: "Error", Error: err });
    }
    res.json({ Status: "Success", Result: result });
  });
});

getRoutes.get('/myorders/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const sql = "SELECT * FROM booking WHERE userId = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: 'Error', err });
    } else {
      res.status(200).json({ status: 'Success', Result: results });
    }
  });
});

getRoutes.get('/getBookingStatus', (req, res) => {
  const pendingStatus = "Select COUNT(*) as count from booking where status = 'pending'";
  const completedStatus = "Select COUNT(*) as count from booking where status = 'completed'";
  const cancelledStatus = "Select COUNT(*) as count from booking where status = 'cancelled'";

  const statusCount = {};

  db.query(pendingStatus, (err, result) => {
    if (err) return res.status(400).json(err);
    statusCount.pending = result[0].count;

    db.query(completedStatus, (err, result) => {
      if (err) return res.status(400).json(err);
      statusCount.completed = result[0].count

      db.query(cancelledStatus, (err, result) => {
        if (err) return res.status(400).json(err);
        statusCount.cancelled = result[0].count

        return res.status(200).json({ Status: "Success", Result: statusCount });

      })
    })
  })
})

getRoutes.get('/getUserCounts', (req, res) => {
  const sqlUsers = "SELECT COUNT(*) AS count FROM users WHERE role = 'user'";
  const sqlAdmins = "SELECT COUNT(*) AS count FROM users WHERE role = 'admin'";
  const sqlEmployees = "SELECT COUNT(*) AS count FROM users WHERE role = 'employee'";

  const userCounts = {};

  db.query(sqlUsers, (err, result) => {
    if (err) return res.status(400).json(err);
    userCounts.users = result[0].count;

    db.query(sqlAdmins, (err, result) => {
      if (err) return res.status(400).json(err);
      userCounts.admins = result[0].count;

      db.query(sqlEmployees, (err, result) => {
        if (err) return res.status(400).json(err);
        userCounts.employees = result[0].count;

        return res.status(200).json({ Status: "Success", Result: userCounts });
      });
    });
  });
});

getRoutes.get('/getTopServices', (req, res) => {
  const sql = "SELECT title, price FROM service ORDER BY price DESC LIMIT 5";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ Status: "Success", Result: result });
  });
});

getRoutes.get('/getMonthlyBookings', (req, res) => {
  const sql = `
      SELECT MONTHNAME(checkIn) AS month, COUNT(*) AS bookings
      FROM booking
      GROUP BY MONTH(checkIn)
      ORDER BY MONTH(checkIn);
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ Status: "Success", Result: result });
  });
});

getRoutes.get('/getBookingsWeeklyComparison', (req, res) => {
  const sql = `
      SELECT 
          WEEK(checkIn, 1) AS week,
          COUNT(*) AS bookings,
          IF(MONTH(checkIn) = MONTH(CURRENT_DATE()), 'current', 'previous') AS period
      FROM booking
      WHERE checkIn >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
      GROUP BY period, week
      ORDER BY period DESC, week;
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ Status: "Success", Result: result });
  });
});

getRoutes.get('/getRoomCount', (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM room_types";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ Status: "Success", count: result[0].count });
  });
});

getRoutes.get('/getHallCount', (req, res) => {
  const sql = "SELECT COUNT(*) AS hallcount FROM hall_type";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ Status: "Success", count: result[0].hallcount });
  });
});

getRoutes.get('/getServiceCount', (req, res) => {
  const sql = "SELECT COUNT(*) AS serviceCount FROM service";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json({ Status: "Success", count: result[0].serviceCount });
  });
});

getRoutes.get('/getReviewCount', async (req, res) => {
  try {
    const reviews = await Review.countDocuments();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

export default getRoutes;

