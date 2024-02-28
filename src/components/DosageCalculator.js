import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const DosageCalculator = () => {
  const [animalType, setAnimalType] = useState('cat');
  const [antibioticType, setAntibioticType] = useState('amoksisilin'); // Default to Amoksisilin
  const [weight, setWeight] = useState('');
  const [frequency, setFrequency] = useState('');
  const [dosage, setDosage] = useState('');

  const calculateDosage = () => {
    // Example: Assuming Amoksisilin dosage for cats
    // You can add more logic here based on the selected antibiotic and animal type
    let calculatedDosage = 0;
    if (animalType === 'cat') {
      switch (antibioticType) {
        case 'amoksisilin':
          calculatedDosage = (parseFloat(weight) * 10).toFixed(2); // 10 mg/kg/day
          break;
        // Add other cases for different antibiotics
        default:
          break;
      }
    } else if (animalType === 'dog') {
      // Similar logic for dogs
    }
    setDosage(calculatedDosage);
  };

  return (
    <Container>
      <h1>Antibiotic Dosage Calculator</h1>
      <Form>
        <Form.Group controlId="animalType">
          <Form.Label>Animal Type</Form.Label>
          <Form.Control
            as="select"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
          >
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="antibioticType">
          <Form.Label>Antibiotic Type</Form.Label>
          <Form.Control
            as="select"
            value={antibioticType}
            onChange={(e) => setAntibioticType(e.target.value)}
          >
            <option value="amoksisilin">Amoksisilin</option>
            {/* Add other antibiotic options */}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="weight">
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="frequency">
          <Form.Label>Dosage Frequency (hours)</Form.Label>
          <Form.Control
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={calculateDosage}>
          Calculate Dosage
        </Button>
      </Form>
      {dosage && (
        <p>
          Recommended Dosage for {animalType}: <strong>{dosage} mg/day</strong>
        </p>
      )}
    </Container>
  );
};

export default DosageCalculator;