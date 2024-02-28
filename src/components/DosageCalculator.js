import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const DosageCalculator = () => {
  const [hayvanTuru, setHayvanTuru] = useState('');
  const [kilo, setKilo] = useState(0);
  const [ilacAdi, setIlacAdi] = useState('');
  const [doz, setDoz] = useState(null);
  const [ilacSecenekleri, setIlacSecenekleri] = useState([]); // State to store medication options

  const dozajRehberi = {
    "kedi": {
      "ilac1": {"mg/kg": 0.5, "min_doz": 10, "max_doz": 50},
      "ilac2": {"mg/kg": 1.0, "min_doz": 20, "max_doz": 100},
    },
    "köpek": {
      "ilac1": {"mg/kg": 0.25, "min_doz": 5, "max_doz": 25},
      "ilac2": {"mg/kg": 0.5, "min_doz": 10, "max_doz": 50},
    },
    "gine_pig": {
      "ilac1": {"mg/kg": 1.0, "min_doz": 2, "max_doz": 10},
      "ilac2": {"mg/kg": 2.0, "min_doz": 4, "max_doz": 20},
    },
    "hamster": {
      "ilac1": {"mg/kg": 2.0, "min_doz": 1, "max_doz": 5},
      "ilac2": {"mg/kg": 4.0, "min_doz": 2, "max_doz": 10},
    },
    "papağan": {
      "ilac1": {"mg/kg": 0.1, "min_doz": 0.5, "max_doz": 2},
      "ilac2": {"mg/kg": 0.2, "min_doz": 1, "max_doz": 4},
    },
    "muhabbet_kuşu": {
      "ilac1": {"mg/kg": 0.05, "min_doz": 0.25, "max_doz": 1},
      "ilac2": {"mg/kg": 0.1, "min_doz": 0.5, "max_doz": 2},
    },
    "tavşan": {
      "ilac1": {"mg/kg": 0.5, "min_doz": 10, "max_doz": 50},
      "ilac2": {"mg/kg": 1.0, "min_doz": 20, "max_doz": 100},
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dozajRehberi.hasOwnProperty(hayvanTuru)) {
      alert(`Hatalı hayvan türü: ${hayvanTuru}`);
      return;
    }

    const ilacBilgileri = dozajRehberi[hayvanTuru][ilacAdi];
    const hesaplananDoz = kilo * ilacBilgileri["mg/kg"];

    let minDoz = ilacBilgileri["min_doz"]; 
    let maxDoz = ilacBilgileri["max_doz"];
    

    if (hesaplananDoz < minDoz) {
      hesaplananDoz = minDoz;
    } else if (hesaplananDoz > maxDoz) {
      hesaplananDoz = maxDoz;
    }

    setDoz(hesaplananDoz.toFixed(2));
  };

  // Update medication options whenever the animal type changes
  useEffect(() => {
    if (dozajRehberi.hasOwnProperty(hayvanTuru)) {
      setIlacSecenekleri(Object.keys(dozajRehberi[hayvanTuru]));
      setIlacAdi(Object.keys(dozajRehberi[hayvanTuru])[0]); // Set initial medication
    } else {
      setIlacSecenekleri([]); // Clear options upon invalid animal selection
    }
  }, [hayvanTuru]); // <-- Missing semicolon?

  return (
    <div className="container">
      <h1>Dozaj Hesap Makinesi</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="hayvanTuru">
          <Form.Label>Hayvan Türü:</Form.Label>
          <Form.Select value={hayvanTuru} onChange={(e) => setHayvanTuru(e.target.value)}>
            {Object.keys(dozajRehberi).map((hayvan) => (
              <option key={hayvan}>{hayvan}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="kilo">
          <Form.Label>Kilo (kg):</Form.Label>
          <InputGroup>
            <Form.Control type="number" value={kilo} onChange={(e) => setKilo(e.target.value)} />
          </InputGroup>
        </Form.Group> 
        <Form.Group className="mb-3" controlId="ilacAdi">
          <Form.Label>İlaç Adı:</Form.Label>
          <Form.Select value={ilacAdi} onChange={(e) => setIlacAdi(e.target.value)}>
            {ilacSecenekleri.map((ilac) => (
              <option key={ilac}>{ilac}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Button type="submit">Hesapla</Button>
        </Form.Group>
        {doz && (
          <p>
            {hayvanTuru} için {ilacAdi} dozu: {doz} mg
          </p>
        )}
      </Form>
    </div>
  );
};

export default DosageCalculator;
