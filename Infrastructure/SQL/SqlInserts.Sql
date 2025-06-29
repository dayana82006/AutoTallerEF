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

/*INSERT INTO service_type ("name", "CreatedAt", "UpdatedAt")
VALUES
  ('Pendiente', now(), now()),
  ('En proceso', now(), now()),
  ('Finalizado', now(), now());*/
  
INSERT INTO roles (id, name, description, "CreatedAt", "UpdatedAt")
VALUES
  (1, 'Administrador', 'Usuario con acceso total al sistema', NOW(), NOW()),
  (2, 'Recepcionista', 'Encargado de recibir vehículos y coordinar órdenes', NOW(), NOW()),
  (3, 'Mecánico', 'Responsable de realizar servicios técnicos', NOW(), NOW());

INSERT INTO user_member (id, name, lastname, username, email, password, "CreatedAt", "UpdatedAt") VALUES
(1, 'Carlos', 'Pérez', 'cperez', 'cperez@taller.com', '12345', '2025-06-01', NULL),
(2, 'Laura', 'Gómez', 'lgomez', 'lgomez@taller.com', '12345', '2025-06-01', NULL),
(3, 'Andrés', 'Martínez', 'amartinez', 'amartinez@taller.com', '12345', '2025-06-01', NULL),
(4, 'Sofía', 'López', 'slopez', 'slopez@taller.com', '12345', '2025-06-01', NULL),
(5, 'Julián', 'Ramírez', 'jramirez', 'jramirez@taller.com', '12345', '2025-06-01', NULL),
(6, 'Natalia', 'Castro', 'ncastro', 'ncastro@taller.com', '12345', '2025-06-01', NULL),
(7, 'Camilo', 'Torres', 'ctorres', 'ctorres@taller.com', '12345', '2025-06-01', NULL);

INSERT INTO clients (id, name, lastname, telephone, email, "CreatedAt", "UpdatedAt") VALUES
(1, 'Ana', 'Ruiz', '3104567890', 'ana.ruiz@mail.com', '2025-06-01', NULL),
(2, 'Pedro', 'García', '3123456789', 'pedro.garcia@mail.com', '2025-06-01', NULL),
(3, 'Luisa', 'Moreno', '3119876543', 'luisa.moreno@mail.com', '2025-06-01', NULL),
(4, 'Jorge', 'Sánchez', '3001234567', 'jorge.sanchez@mail.com', '2025-06-01', NULL),
(5, 'Diana', 'Ortiz', '3133334444', 'diana.ortiz@mail.com', '2025-06-01', NULL),
(6, 'Esteban', 'Cano', '3145556666', 'esteban.cano@mail.com', '2025-06-01', NULL),
(7, 'Valeria', 'Linares', '3157778888', 'valeria.linares@mail.com', '2025-06-01', NULL);

INSERT INTO vehicle_anormalities (id, name, entry_date, "CreatedAt", "UpdatedAt") VALUES
(1, 'Frenos desgastados', '2025-06-01', '2025-06-01', NULL),
(2, 'Cambio de aceite pendiente', '2025-06-02', '2025-06-01', NULL),
(3, 'Revisión de motor', '2025-06-03', '2025-06-01', NULL),
(4, 'Revisión de suspensión', '2025-06-04', '2025-06-01', NULL),
(5, 'Problema eléctrico', '2025-06-05', '2025-06-01', NULL),
(6, 'Llantas desgastadas', '2025-06-06', '2025-06-01', NULL),
(7, 'Filtro de aire sucio', '2025-06-07', '2025-06-01', NULL);

INSERT INTO spares (code, description, stock_quantity, unit_price, "CreatedAt", "UpdatedAt") VALUES
('SP001', 'Filtro de aceite', 20, 35000, '2025-06-01', NULL),
('SP002', 'Bujías', 50, 12000, '2025-06-01', NULL),
('SP003', 'Pastillas de freno', 30, 45000, '2025-06-01', NULL),
('SP004', 'Filtro de aire', 25, 28000, '2025-06-01', NULL),
('SP005', 'Correa de distribución', 10, 80000, '2025-06-01', NULL),
('SP006', 'Aceite 20W50', 40, 60000, '2025-06-01', NULL),
('SP007', 'Amortiguador', 15, 90000, '2025-06-01', NULL);

INSERT INTO specialties (id, name, "CreatedAt", "UpdatedAt") VALUES
(1, 'Electricista', '2025-06-01', NULL),
(2, 'Mecánica general', '2025-06-01', NULL),
(3, 'Suspensión y dirección', '2025-06-01', NULL),
(4, 'Sistema de frenos', '2025-06-01', NULL),
(5, 'Cambio de aceite', '2025-06-01', NULL),
(6, 'Diagnóstico electrónico', '2025-06-01', NULL),
(7, 'Revisión preventiva', '2025-06-01', NULL);

INSERT INTO service_type (id, description, "CreatedAt", "UpdatedAt") VALUES
(1, 'Mantenimiento preventivo', '2025-06-01', NULL),
(2, 'Revisión de frenos', '2025-06-01', NULL),
(3, 'Alineación y balanceo', '2025-06-01', NULL),
(4, 'Cambio de aceite', '2025-06-01', NULL),
(5, 'Diagnóstico general', '2025-06-01', NULL),
(6, 'Reparación eléctrica', '2025-06-01', NULL),
(7, 'Revisión de suspensión', '2025-06-01', NULL);

INSERT INTO vehicles (serial_number, release_year, km, id_model, id_client, id_fuel_type, id_vehicle_type, "CreatedAt", "UpdatedAt") VALUES
('ABC123', 2018, 75000, 1, 1, 1, 1, '2025-06-01', NULL),
('XYZ456', 2020, 32000, 2, 2, 2, 1, '2025-06-01', NULL),
('LMN789', 2015, 98000, 3, 3, 1, 2, '2025-06-01', NULL),
('DEF321', 2019, 54000, 1, 4, 2, 2, '2025-06-01', NULL),
('GHI654', 2016, 87000, 2, 5, 1, 1, '2025-06-01', NULL),
('JKL987', 2017, 62000, 3, 6, 2, 2, '2025-06-01', NULL),
('QWE741', 2021, 15000, 1, 7, 1, 1, '2025-06-01', NULL);

INSERT INTO service_order (
  id, description, date_entry, delivery_date, client_approved,
  serial_number, unit_price, id_service_type, id_user_member,
  id_status, "CreatedAt", "UpdatedAt"
) VALUES
(1, 'Cambio de aceite y revisión general', '2025-06-20', '2025-06-21', true, 'ABC123', 95000, 4, 1, 1, '2025-06-20', NULL),
(2, 'Revisión sistema de frenos', '2025-06-21', '2025-06-22', true, 'XYZ456', 120000, 2, 2, 1, '2025-06-21', NULL),
(3, 'Diagnóstico eléctrico', '2025-06-22', '2025-06-23', false, 'LMN789', 80000, 6, 3, 2, '2025-06-22', NULL),
(4, 'Mantenimiento preventivo completo', '2025-06-23', '2025-06-24', true, 'DEF321', 110000, 1, 4, 1, '2025-06-23', NULL),
(5, 'Revisión de suspensión y dirección', '2025-06-24', '2025-06-25', false, 'GHI654', 105000, 7, 5, 2, '2025-06-24', NULL),
(6, 'Cambio de pastillas de freno', '2025-06-25', '2025-06-26', true, 'JKL987', 130000, 2, 6, 1, '2025-06-25', NULL),
(7, 'Revisión general y alineación', '2025-06-26', '2025-06-27', true, 'QWE741', 100000, 5, 7, 1, '2025-06-26', NULL);

INSERT INTO order_details (
  spare_quantity, id_service_order, code_spare, "CreatedAt", "UpdatedAt"
) VALUES
(1, 1, 'SP001', '2025-06-20 00:00:00', '2025-06-20 00:00:00'), -- Filtro de aceite
(4, 2, 'SP003', '2025-06-21 00:00:00', '2025-06-21 00:00:00'), -- Pastillas de freno
(1, 3, 'SP002', '2025-06-22 00:00:00', '2025-06-22 00:00:00'), -- Bujías
(2, 4, 'SP004', '2025-06-23 00:00:00', '2025-06-23 00:00:00'), -- Filtro de aire
(2, 5, 'SP007', '2025-06-24 00:00:00', '2025-06-24 00:00:00'), -- Amortiguador
(1, 6, 'SP003', '2025-06-25 00:00:00', '2025-06-25 00:00:00'), -- Pastillas de freno
(1, 7, 'SP005', '2025-06-26 00:00:00', '2025-06-26 00:00:00'); -- Correa de distribución
