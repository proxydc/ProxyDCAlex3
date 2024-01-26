DROP TABLE IF EXISTS public.role;
DROP TABLE IF EXISTS public.account;

CREATE TABLE IF NOT EXISTS public.role
(
    id serial PRIMARY KEY,
    role_name VARCHAR(32) NOT NULL,
    role_details VARCHAR(32)  
);
INSERT INTO public.role(role_name, role_details) VALUES('admin', 'Access tout');
INSERT INTO public.role(role_name, role_details) VALUES('user', 'Access limité');

CREATE TABLE account(
    id serial PRIMARY KEY,
    login_name VARCHAR(32) NOT NULL,
    display_name VARCHAR(32),
    pass_word VARCHAR(128) NOT NULL,
	role_id INTEGER NOT NULL
);
INSERT INTO account(login_name, display_name, pass_word, role_id) VALUES('proxydc_admin', 'Admin', '_ProxyDC_Config', 2);
INSERT INTO account(login_name, display_name, pass_word, role_id) VALUES('Alex', 'Alex', '12345', 1); -- TODO hash

CREATE TABLE form_session(
    id serial PRIMARY KEY,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end TIMESTAMP
);

CREATE FUNCTION check_session (IN session_id int, OUT is_session_valid boolean)
AS 'SELECT COUNT(id)>0 FROM form_session WHERE form_session.id = session_id AND CURRENT_TIMESTAMP BETWEEN form_session.session_start AND form_session.session_end'
LANGUAGE SQL;
-- SELECT check_session(42);

CREATE TABLE dc_status(
    id INT PRIMARY KEY,
    label VARCHAR(32) NOT NULL
);
--INSERT INTO dc_status(id, label) VALUES(1, 'Archive'),(2, 'Candidat'), (3, 'Employé');
INSERT INTO dc_status(id, label) VALUES(1, 'Créé'),(2, 'Encours'), (3, 'Finalisé');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE dc(
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    firstname VARCHAR(32) NOT NULL,
    familyname VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL,
    dc_status INT REFERENCES dc_status (id), -- Default = 2 ?
    tags VARCHAR(256),
    document JSONB NULL
);
update dc
set document = jsonb_set(document, '{}', '{
  "technicalAbilities": ["SCRUM", "Java"],
  "functionalAbilities": ["Banking", "CMS", "CRM & ERP"],
  "languages": ["français", "anglais"],
  "certifications": [{"year": 2021, "title": "CISCO"}, {"year": 2018, "title": "CNA5"}],
  "bref": "lorem ipsum dolor",
  "experiences": [],
  "projects": [],
  "skills": {
    "environments": "Java JEE",
    "languages": "Java JEE",
    "databases": "PostgreSQL, MySQL",
    "tools": "Zabbix, Nagios",
    "systems": "Linux RHEL8"
  }}', 'false')
  where id = '4f94c89c-ebb5-43a6-a5b7-89d8ec10d90c'
SELECT COUNT(id) > 0 FROM form_session WHERE form_session.id = 42 AND CURRENT_TIMESTAMP BETWEEN form_session.session_start AND form_session.session_end




