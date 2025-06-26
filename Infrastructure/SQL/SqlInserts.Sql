-- BRANDS
INSERT INTO brands (name) VALUES 
('Toyota'),
('Ford'),
('Chevrolet'),
('Honda'),
('Nissan');

-- VEHICLE MODELS (asegúrate de que los IDs de brand coincidan con los que insertaste)
INSERT INTO vehicle_models (name, id_brand) VALUES
('Corolla', 1),     -- Toyota
('Hilux', 1),
('Fiesta', 2),      -- Ford
('Mustang', 2),
('Spark', 3),       -- Chevrolet
('Cruze', 3),
('Civic', 4),       -- Honda
('Accord', 4),
('Sentra', 5),      -- Nissan
('X-Trail', 5);

-- FUEL TYPES
INSERT INTO fuel_type (name) VALUES 
('Gasoline'),
('Diesel'),
('Electric'),
('Hybrid');

-- VEHICLE TYPES
INSERT INTO vehicle_type (name) VALUES 
('Sedan'),
('SUV'),
('Pickup'),
('Hatchback'),
('Van');
