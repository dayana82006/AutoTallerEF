-- BRANDS
INSERT INTO "Brands" ("Name", "CreatedAt", "UpdatedAt") VALUES 
('Toyota',    now(), now()),
('Ford',      now(), now()),
('Chevrolet', now(), now()),
('Honda',     now(), now()),
('Nissan',    now(), now());

INSERT INTO "VehicleModels" ("Name", "BrandId", "CreatedAt", "UpdatedAt") VALUES
('Corolla', 1, now(), now()),
('Hilux', 1, now(), now()),
('Fiesta', 2, now(), now()),
('Mustang', 2, now(), now()),
('Spark', 3, now(), now()),
('Cruze', 3, now(), now()),
('Civic', 4, now(), now()),
('Accord', 4, now(), now()),
('Sentra', 5, now(), now()),
('X-Trail', 5, now(), now());


-- FUEL TYPES
INSERT INTO "FuelTypes" ("Name", "CreatedAt", "UpdatedAt") VALUES 
('Gasoline', now(), now()),
('Diesel',   now(), now()),
('Electric', now(), now()),
('Hybrid',   now(), now());

-- VEHICLE TYPES
INSERT INTO "VehicleTypes" ("Name", "CreatedAt", "UpdatedAt") VALUES 
('Sedan',     now(), now()),
('SUV',       now(), now()),
('Pickup',    now(), now()),
('Hatchback', now(), now()),
('Van',       now(), now());

-- SERVICE STATUSES
INSERT INTO "ServiceStatuses" ("Name", "CreatedAt", "UpdatedAt")
VALUES
  ('Pendiente', now(), now()),
  ('En proceso', now(), now()),
  ('Finalizado', now(), now());

-- ROLES
INSERT INTO "Roles" ("Id", "Name", "Description", "CreatedAt", "UpdatedAt")
VALUES
  (1, 'Administrador', 'Usuario con acceso total al sistema', NOW(), NOW()),
  (2, 'Recepcionista', 'Encargado de recibir vehículos y coordinar órdenes', NOW(), NOW()),
  (3, 'Mecanico', 'Responsable de realizar servicios técnicos', NOW(), NOW());
