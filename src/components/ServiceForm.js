import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb'; // Make sure you import dayjs locales if necessary

const ServiceForm = () => {
  const [formState, setFormState] = useState({
    officeLocation: '',
    dcwName: '',
    last4SSN: '',
    participantName: '',
    medicaidNumber: '',
    serviceLocation: '',
    missedDate: null,
    startTime: null,
    endTime: null,
    totalHours: '',
    reasonForMissed: '',
    serviceProvided: [],
    participantConsent: false,
    caregiverConsent: false,
    participantSignature: '',
    caregiverSignature: '',
    submissionDate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormState((prevState) => ({ ...prevState, [name]: date }));
  };

  const handleTimeChange = (name, time) => {
    setFormState((prevState) => ({ ...prevState, [name]: time }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleServiceChange = (event) => {
    const { value } = event.target;
    setFormState((prevState) => ({ ...prevState, serviceProvided: value }));
  };

  const formatDate = (date) => date ? dayjs(date).format('MM/DD/YYYY') : '';
  const formatTime = (time) => time ? dayjs(time).format('h:mm A') : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const { token, companyId, userId: customerId, firstName, lastName } = user;
    
    // Validation
    if (formState.startTime && formState.endTime && formState.startTime.isAfter(formState.endTime)) {
      alert('End Time must be after Start Time.');
      return;
    }
  
    try {
      const response = await axios.post('https://timesheet-backend-a289.vercel.app/api/service', {
        ...formState,
        missedDate: formatDate(formState.missedDate),
        startTime: formatTime(formState.startTime),
        endTime: formatTime(formState.endTime),
        submissionDate: formatDate(formState.submissionDate),
        companyId,
        customerId,
        firstName,
        lastName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Form submitted successfully:', response.data);
      
      // Reset form state
      setFormState({
        officeLocation: '',
        dcwName: '',
        last4SSN: '',
        participantName: '',
        medicaidNumber: '',
        serviceLocation: '',
        missedDate: null,
        startTime: null,
        endTime: null,
        totalHours: '',
        reasonForMissed: '',
        serviceProvided: [],
        participantConsent: false,
        caregiverConsent: false,
        participantSignature: '',
        caregiverSignature: '',
        submissionDate: null,
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const services = [
    "Dressing", "Oral Care/Dentures", "Range of Motion", "Hair Care",
    "Supervision/Coaching", "Transfers", "Laundry/Fold", "Feeding",
    "Light Housekeeping", "Meal Preparation", "Reminding Medicine",
    "Supervised Walks", "Finance Management", "Scheduling Appointment",
    "Socialization", "Phone/Com. Device", "Secure Transportation",
    "Get seasonal Clothing", "Bowel/Bladder Management", "Shopping", "Other"
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#fff',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Missed Timesheet
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="DCW Name"
                  name="dcwName"
                  value={formState.dcwName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Service Location"
                  name="serviceLocation"
                  value={formState.serviceLocation}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Missed Date"
                  value={formState.missedDate}
                  onChange={(date) => handleDateChange('missedDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TimePicker
                  label="Clock In"
                  value={formState.startTime}
                  onChange={(time) => handleTimeChange('startTime', time)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TimePicker
                  label="Clock Out"
                  value={formState.endTime}
                  onChange={(time) => handleTimeChange('endTime', time)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Total Hours"
                  name="totalHours"
                  value={formState.totalHours}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Reason for Missed (In / Out / Too early / Too late)"
                  name="reasonForMissed"
                  value={formState.reasonForMissed}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="service-provided-label">Services Provided</InputLabel>
                  <Select
                    labelId="service-provided-label"
                    multiple
                    value={formState.serviceProvided}
                    onChange={handleServiceChange}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {services.map((service) => (
                      <MenuItem key={service} value={service}>
                        <Checkbox checked={formState.serviceProvided.includes(service)} />
                        <ListItemText primary={service} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.participantConsent}
                      onChange={handleCheckboxChange}
                      name="participantConsent"
                    />
                  }
                  label="Participant Consent"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.caregiverConsent}
                      onChange={handleCheckboxChange}
                      name="caregiverConsent"
                    />
                  }
                  label="Caregiver Consent"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Participant Signature"
                  name="participantSignature"
                  value={formState.participantSignature}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Caregiver Signature"
                  name="caregiverSignature"
                  value={formState.caregiverSignature}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default ServiceForm;
