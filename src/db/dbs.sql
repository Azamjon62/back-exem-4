CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, password, role) VALUES ('azamjon', 'azam123', 'admin');


CREATE TABLE companies(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);



INSERT INTO companies (name) VALUES
    ('Hotel');
    ('Elobot City'),
    ('Tashkent City'),
    ('Akay C');


CREATE TABLE complex(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    company_id INT REFERENCES companies(id)
);



INSERT INTO complex (name, location, company_id) VALUES
    ('Darxon', 'Uzbekistan, Tashkent', 1),
    ('Toshbuloq', 'Uzbekistan, Namangan', 3),   
    ('Bodomzor', 'Uzbekistan, Tashkent', 3),
    ('Yunusobot', 'Uzbekistan, Tashkent', 2),
    ('Prez', 'Uzbekistan, Namangan', 1),
    ('Chilonzor', 'Uzbekistan, Tashkent', 2),
    ('Baliqchi', 'Uzbekistan, Andijan', 4);

CREATE TABLE room(
    id SERIAL NOT NULL PRIMARY KEY,
    room_count INT NOT NULL,
    meter_square INT NOT NULL,
    meter_price INT NOT NULL,
    complex_id INT REFERENCES complex(id)
);




INSERT INTO room (room_count, meter_square, meter_price, complex_id) VALUES
    (7, 350, 6500, 7),
    (1, 80, 1800, 3),
    (4, 200, 4000, 4),
    (5, 220, 4200, 6),
    (6, 300, 6000, 5),
    (2, 100, 2000, 1),
    (3, 120, 2200, 2);


CREATE TABLE bank(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    credit_cost INT NOT NULL,
    starting_payment INT NOT NULL,
    bank_service INT NOT NULL,
    year_duration INT NOT NULL,
    room_id INT REFERENCES room(id),
    created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO bank (name, credit_cost, starting_payment, bank_service, year_duration, room_id) VALUES
    ('Davr Bank', 1500000, 6000, 2000, 9, 7),
    ('Xalq Bank', 500000, 10000, 1000, 8, 1),
    ('Ipoteka Bank', 40000000, 8000, 800, 5, 2),
    ('Asaka Bank', 60000000, 12000, 1200, 10, 3),
    ('Agro Bank', 30000000, 8000, 800, 5, 2),
    ('NBU', 80000000, 15000, 1500, 12, 1),
    ('TBC Bank', 100000000, 12000, 1200, 10, 6),
    ('Kapital Bank', 90000000, 11000, 1100, 11, 5),
    ('Anor Bank', 1000000000, 30000, 3000, 15, 2),
    ('Hamkor Bank', 150000000, 15000, 1500, 13, 4),
    ('Infin Bank', 200000000, 20000, 2000, 14, 4);
    





            DELETE FROM 
                companies AS t1
            USING
                complex AS t2,
                room AS t3,
                bank AS t4
            WHERE
                t1.id = $1
                AND t2.id = $2
                AND t3.id = $3
                AND t4.id = $4



            SELECT 
                companies.name AS company_name, 
                complex.name AS complex_name,
                room.room_count AS room_count,
                room.meter_square AS meter_square,
                room.meter_price AS meter_price,
                bank.name AS bank_name,
                bank.credit_cost AS credit_cost,
                bank.starting_payment AS starting_payment,
                bank.bank_service AS bank_service,
                bank.year_duration AS year_duration,
                (room.meter_price * room.meter_square) AS total_room_price,
                ((bank.credit_cost / bank.year_duration / 12) + (bank.bank_service * bank.year_duration)) AS total_bank_credit
            FROM 
                companies
            FULL OUTER JOIN complex ON companies.id = complex.company_id
            FULL OUTER JOIN room ON complex.id = room.complex_id
            FULL OUTER JOIN bank ON room.id = bank.room_id
            WHERE
                companies.id = 1
                AND complex.company_id = 1
                AND room.complex_id = 1;









DROP TABLE IF EXISTS companies CASCADE;

DROP TABLE IF EXISTS complex CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS bank CASCADE;
DROP TABLE IF EXISTS users CASCADE;












            SELECT 
                companies AS companies, 
                complex AS complex,
                room AS room
            FROM 
                companies
            INNER JOIN complex ON companies.id = complex.company_id
            INNER JOIN room ON complex.id = room.complex_id
            WHERE
                companies.id = $1
                AND complex.id = $2
                AND room.id = $3;











SELECT 
    companies.name AS company_name, 
    complex.name AS complex_name,
    room.room_count AS room_count,
    room.meter_square AS meter_square,
    room.meter_price AS meter_price,
    bank.name AS bank_name,
    bank.credit_cost AS credit_cost,
    bank.starting_payment AS starting_payment,
    bank.bank_service AS bank_service,
    bank.year_duration AS year_duration,
    (room.meter_price * room.meter_square) AS total_room_price,
    ((bank.credit_cost / bank.starting_payment) + (bank.bank_service * bank.year_duration)) AS total_bank_credit
FROM 
    companies
INNER JOIN complex ON companies.id = complex.company_id
INNER JOIN room ON complex.id = room.complex_id
INNER JOIN bank ON room.id = bank.room_id
WHERE
    companies.id = 1
    AND complex.id = 1
    AND room.id = 1;









SELECT 
    companies AS companies_name, 
    complex AS complex_name,
    room AS room_name,
    bank AS bank_name
FROM 
    companies
FULL JOIN complex ON companies.id = complex.company_id
FULL JOIN room ON complex.id = room.complex_id
FULL JOIN bank ON room.id = bank.room_id;





            SELECT 
                companies.name AS companies, 
                complex AS complex,
                room AS room
            FROM 
                companies
            INNER JOIN complex ON companies.id = complex.company_id
            INNER JOIN room ON complex.id = room.complex_id
            WHERE
                companies.id = 1
                AND complex.id = 1
                AND room.id = 1;