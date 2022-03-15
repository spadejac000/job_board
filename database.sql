-- CREATE DATABASE jobboard;

CREATE EXTENSION IF NOT EXISTS  "uuid-ossp";

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_first_name VARCHAR(255) NOT NULL,
  user_last_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE jobs(
  job_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_title VARCHAR(255),
  work_address VARCHAR(255),
  city VARCHAR(255),
  _state VARCHAR(255),
  zip VARCHAR(255),
  job_location VARCHAR(255),
  job_type VARCHAR(255),
  salary VARCHAR(255),
  _description VARCHAR(10000),
  company_name VARCHAR(255) NOT NULL,
  date_posted DATE NOT NULL,
  user_id uuid REFERENCES users(user_id), UNIQUE(user_id)
);

CREATE TABLE favorite_jobs(
  favorite_jobs_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(user_id) NOT NULL,
  job_id uuid REFERENCES jobs(job_id)
);

CREATE TABLE applications(
  application_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(user_id),
  job_id uuid REFERENCES jobs(job_id),
  applicant_name VARCHAR(255),
  applicant_email VARCHAR(255),
  applicant_phone VARCHAR(255),
  applicant_location VARCHAR(255)
);

CREATE TABLE benefits(
  benefits_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  health_insurance VARCHAR(255),
  paid_time_off VARCHAR(255),
  dental_insurance VARCHAR(255),
  four_zero_one_k VARCHAR(255),
  vision_insurance VARCHAR(255)
);

ALTER TABLE jobs ADD COLUMN benefits_id uuid REFERENCES benefits(benefits_id);