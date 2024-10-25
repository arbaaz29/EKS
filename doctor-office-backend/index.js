const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// Use the MONGO_URI environment variable
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/appointments';

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define the schema and model for appointments
const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  date: Date,
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

// Enable CORS
app.use(cors({origin: '*'}));

// API endpoints
app.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

app.post('/appointments', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.json(appointment);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
