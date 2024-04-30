CREATE SCHEMA IF NOT EXISTS directory;

DROP TABLE IF EXISTS circuits CASCADE;
DROP TABLE IF EXISTS constructor_results CASCADE;
DROP TABLE IF EXISTS constructor_standings CASCADE;
DROP TABLE IF EXISTS constructors CASCADE;
DROP TABLE IF EXISTS driver_standings CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS lap_times CASCADE;
DROP TABLE IF EXISTS pit_stops CASCADE;
DROP TABLE IF EXISTS qualifying CASCADE;
DROP TABLE IF EXISTS races CASCADE;
DROP TABLE IF EXISTS results CASCADE;
DROP TABLE IF EXISTS seasons CASCADE;
DROP TABLE IF EXISTS sprint_results CASCADE;
DROP TABLE IF EXISTS directory.status CASCADE;

-- Circuits ------------
CREATE TABLE circuits
(
    id        SERIAL PRIMARY KEY,
    ref       VARCHAR(255) UNIQUE NOT NULL,
    name      VARCHAR(255)        NOT NULL,
    location  VARCHAR(255),
    country   VARCHAR(255),
    latitude  FLOAT,
    longitude FLOAT,
    altitude  INT,
    wiki_url  VARCHAR(255)
);

COPY circuits (id, ref, name, location, country, latitude, longitude, altitude, wiki_url)
    FROM '/csv/circuits.csv'
    DELIMITER ','
    CSV HEADER;
----------------------

-- Constructors ----------
CREATE TABLE constructors
(
    id          SERIAL PRIMARY KEY,
    ref         VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(255)        NOT NULL,
    nationality VARCHAR(255),
    wiki_url    VARCHAR(255)        NOT NULL
);

COPY constructors (id, ref, name, nationality, wiki_url)
    FROM '/csv/constructors.csv'
    DELIMITER ','
    CSV HEADER;
-------------------

-- Drivers ----------
CREATE TABLE drivers
(
    id            SERIAL PRIMARY KEY,
    ref           VARCHAR(255) UNIQUE NOT NULL,
    number        INT,
    code          VARCHAR(5),
    first_name    VARCHAR(255)        NOT NULL,
    last_name     VARCHAR(255)        NOT NULL,
    date_of_birth DATE,
    nationality   VARCHAR(255),
    wiki_url      VARCHAR(255) UNIQUE NOT NULL
);

COPY drivers (id, ref, number, code, first_name, last_name, date_of_birth, nationality, wiki_url)
    FROM '/csv/drivers.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;
----------------

-- Races ----------
CREATE TABLE races
(
    id              SERIAL PRIMARY KEY,
    circuit_id      INTEGER      NOT NULL REFERENCES circuits (id),
    year            INTEGER      NOT NULL,
    round           INTEGER      NOT NULL,
    name            VARCHAR      NOT NULL,
    date            DATE         NOT NULL,
    start_time      VARCHAR(30),
    wiki_url        VARCHAR(255) NOT NULL,
    fp1_date        DATE,
    fp1_time        TIME,
    fp2_date        DATE,
    fp2_time        TIME,
    fp3_date        DATE,
    fp3_time        TIME,
    qualifying_date DATE,
    qualifying_time TIME,
    sprint_date     DATE,
    sprint_time     TIME
);

COPY races (id, year, round, circuit_id, name, date, start_time, wiki_url, fp1_date, fp1_time, fp2_date, fp2_time,
    fp3_date, fp3_time, qualifying_date, qualifying_time, sprint_date, sprint_time)
    FROM '/csv/races.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;
---------------------


-- Status -----------------------
CREATE TABLE directory.status
(
    id     SERIAL              NOT NULL PRIMARY KEY,
    status VARCHAR(255) UNIQUE NOT NULL
);

COPY directory.status (id, status)
    FROM '/csv/status.csv'
    DELIMITER ','
    CSV HEADER;
-----------------------------------

-- Constructor results -----------
CREATE TABLE constructor_results
(
    id             SERIAL  NOT NULL PRIMARY KEY,
    race_id        INTEGER NOT NULL REFERENCES races (id),
    constructor_id INTEGER NOT NULL REFERENCES constructors (id),
    points         FLOAT,
    status         VARCHAR(255)
);

COPY constructor_results (id, race_id, constructor_id, points, status)
    FROM '/csv/constructor_results.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;

ALTER TABLE constructor_results
    ADD COLUMN status_id INTEGER REFERENCES directory.status (id);

UPDATE constructor_results cr
SET status_id = (SELECT ds.id FROM directory.status ds WHERE ds.status ILIKE '%Disqualified%')
WHERE cr.status IS NOT NULL;

ALTER TABLE constructor_results
DROP COLUMN status;
--------------------------------

-- Seasons ---------------------
CREATE TABLE seasons
(
    id       SERIAL       NOT NULL PRIMARY KEY,
    year     int4         NOT NULL,
    wiki_url VARCHAR(255) NOT NULL
);

COPY seasons (year, wiki_url)
    FROM '/csv/seasons.csv'
    DELIMITER ','
    CSV HEADER;
---------------------------------

-- Constructor standings --------------
CREATE TABLE constructor_standings
(
    id             SERIAL NOT NULL PRIMARY KEY,
    race_id        int4   NOT NULL REFERENCES races (id),
    constructor_id int4   NOT NULL REFERENCES constructors (id),
    points         FLOAT  NOT NULL,
    position       int4,
    position_text  VARCHAR(255),
    wins_count     int4   NOT NULL
);

COPY constructor_standings (id, race_id, constructor_id, points, position, position_text, wins_count)
    FROM '/csv/constructor_standings.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;

UPDATE constructor_standings cs
SET position_text = (SELECT status FROM directory.status WHERE status ILIKE '%excluded%')
WHERE cs.position_text = 'E';
---------------------------------

-- Driver standings ---------------------
CREATE TABLE driver_standings
(
    id            SERIAL  NOT NULL PRIMARY KEY,
    race_id       INTEGER NOT NULL REFERENCES races (id),
    driver_id     INTEGER NOT NULL REFERENCES drivers (id),
    points        FLOAT   NOT NULL,
    position      INTEGER,
    position_text VARCHAR(255),
    wins_count    INTEGER NOT NULL
);

COPY driver_standings (id, race_id, driver_id, points, position, position_text, wins_count)
    FROM '/csv/driver_standings.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;

UPDATE driver_standings ds
SET position_text = (SELECT status FROM directory.status WHERE status ILIKE '%disqualified%')
WHERE ds.position_text = 'D';
----------------------------------

-- Lap times ------------------------------
CREATE TABLE lap_times
(
    race_id      INTEGER NOT NULL REFERENCES races (id),
    driver_id    INTEGER NOT NULL REFERENCES drivers (id),
    lap          INTEGER NOT NULL,
    position     INTEGER,
    time         VARCHAR(255),
    milliseconds INTEGER,

    PRIMARY KEY (race_id, driver_id, lap)
);

COPY lap_times (race_id, driver_id, lap, position, time, milliseconds)
    FROM '/csv/lap_times.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;
-----------------------------------------------

-- Pit stops ---------------------------
CREATE TABLE pit_stops
(
    race_id      INTEGER NOT NULL REFERENCES races (id),
    driver_id    INTEGER NOT NULL REFERENCES drivers (id),
    stop_number  INTEGER NOT NULL,
    lap_number   INTEGER NOT NULL,
    time         TIME    NOT NULL,
    duration     VARCHAR(255),
    milliseconds INTEGER,

    PRIMARY KEY (race_id, driver_id, stop_number)
);

COPY pit_stops (
    race_id, driver_id, stop_number, lap_number, time, duration, milliseconds
    ) FROM '/csv/pit_stops.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;
-------------------------------

-- Qualifying --------------------
CREATE TABLE qualifying
(
    id              SERIAL  NOT NULL PRIMARY KEY,
    race_id         INTEGER NOT NULL REFERENCES races (id),
    driver_id       INTEGER NOT NULL REFERENCES drivers (id),
    constructor_id  INTEGER NOT NULL REFERENCES constructors (id),
    driver_number   INTEGER,
    driver_position INTEGER,
    q1_time         VARCHAR(255),
    q2_time         VARCHAR(255),
    q3_time         VARCHAR(255)
);

COPY qualifying (id, race_id, driver_id, constructor_id, driver_number, driver_position, q1_time, q2_time,
    q3_time)
    FROM '/csv/qualifying.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;
-----------------------------------

-- Results ------------------------
CREATE TABLE results
(
    id                  SERIAL       NOT NULL PRIMARY KEY,
    race_id             INTEGER      NOT NULL REFERENCES races (id),
    driver_id           INTEGER      NOT NULL REFERENCES drivers (id),
    constructor_id      INTEGER      NOT NULL REFERENCES constructors (id),
    driver_number       INTEGER,
    position_start_grid INTEGER      NOT NULL,
    position            INTEGER,
    position_text       VARCHAR(255) NOT NULL,
    position_order      INTEGER      NOT NULL DEFAULT 0,
    points              FLOAT        NOT NULL DEFAULT 0,
    laps                INTEGER      NOT NULL DEFAULT 0,
    time_finish         VARCHAR(255),
    time_milliseconds   INTEGER,
    fastest_lap_number  INTEGER,
    fastest_lap_rank    INTEGER               DEFAULT 0,
    fastest_lap_time    VARCHAR(255),
    fastest_lap_speed   VARCHAR(255),
    status_id           INTEGER      NOT NULL DEFAULT 0 REFERENCES directory.status (id)
);

COPY results (id, race_id, driver_id, constructor_id, driver_number, position_start_grid, position,
    position_text,
    position_order, points, laps, time_finish, time_milliseconds, fastest_lap_number, fastest_lap_rank,
    fastest_lap_time, fastest_lap_speed, status_id)
    FROM '/csv/results.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;
------------------------------

-- Sprint results -------------------
CREATE TABLE sprint_results
(
    id                   SERIAL       NOT NULL PRIMARY KEY,
    race_id              INTEGER      NOT NULL REFERENCES races (id),
    driver_id            INTEGER      NOT NULL REFERENCES drivers (id),
    constructor_id       INTEGER      NOT NULL REFERENCES constructors (id),
    driver_number        INTEGER,
    position_start_grid  INTEGER      NOT NULL DEFAULT 0,
    position       INTEGER,
    position_text  VARCHAR(255) NOT NULL,
    position_order INTEGER      NOT NULL DEFAULT 0,
    points               FLOAT        NOT NULL DEFAULT 0,
    laps                 INTEGER      NOT NULL DEFAULT 0,
    finish_time          VARCHAR(255),
    finish_milliseconds  INTEGER,
    fastest_lap_number   INTEGER,
    fastest_lap_time     VARCHAR(255),
    status_id            INTEGER REFERENCES directory.status (id)
);

COPY sprint_results (id, race_id, driver_id, constructor_id, driver_number, position_start_grid, position,
    position_text, position_order,
    points, laps, finish_time, finish_milliseconds, fastest_lap_number, fastest_lap_time, status_id)
    FROM '/csv/sprint_results.csv'
    DELIMITER ','
    NULL '\N'
    CSV HEADER;
----------------------------------------------------