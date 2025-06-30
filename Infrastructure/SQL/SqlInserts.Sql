-- BRANDS
INSERT INTO brands (name, "CreatedAt", "UpdatedAt") VALUES 
('Toyota',    now(), now()),
('Ford',      now(), now()),
('Chevrolet', now(), now()),
('Honda',     now(), now()),
('Nissan',    now(), now());

-- VEHICLE MODELS
INSERT INTO vehicle_models (name, id_brand, "CreatedAt", "UpdatedAt") VALUES
('Corolla', 1, now(), now()),     
('Hilux',   1, now(), now()),
('Fiesta',  2, now(), now()),     
('Mustang', 2, now(), now()),
('Spark',   3, now(), now()),     
('Cruze',   3, now(), now()),
('Civic',   4, now(), now()),    
('Accord',  4, now(), now()),
('Sentra',  5, now(), now()),     
('X-Trail', 5, now(), now());

-- FUEL TYPES
INSERT INTO fuel_type (name, "CreatedAt", "UpdatedAt") VALUES 
('Gasoline', now(), now()),
('Diesel',   now(), now()),
('Electric', now(), now()),
('Hybrid',   now(), now());

-- VEHICLE TYPES
INSERT INTO vehicle_type (name, "CreatedAt", "UpdatedAt") VALUES 
('Sedan',     now(), now()),
('SUV',       now(), now()),
('Pickup',    now(), now()),
('Hatchback', now(), now()),
('Van',       now(), now());


INSERT INTO service_status ("name", "CreatedAt", "UpdatedAt")
VALUES
  ('Pendiente', now(), now()),
  ('En proceso', now(), now()),
  ('Finalizado', now(), now());
  
INSERT INTO roles (id, name, description, "CreatedAt", "UpdatedAt")
VALUES
  (1, 'Administrador', 'Usuario con acceso total al sistema', NOW(), NOW()),
  (2, 'Recepcionista', 'Encargado de recibir vehículos y coordinar órdenes', NOW(), NOW()),
  (3, 'Mecanico', 'Responsable de realizar servicios técnicos', NOW(), NOW());
