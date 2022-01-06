CREATE DATABASE jobboard;

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
  benefits VARCHAR(255),
  _description VARCHAR(10000),
  user_id uuid REFERENCES users(user_id)
);

CREATE TABLE benefits(
  benefits_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  health_insurance VARCHAR(255),
  paid_time_off VARCHAR(255),
  dental_insurance VARCHAR(255),
  four_zero_one_k VARCHAR(255),
  vision_insurance VARCHAR(255)
);

INSERT INTO users (user_first_name, user_last_name, user_email, user_password) VALUES ('henry', 'smith', 'henry@gmail.com', '123456');

INSERT INTO jobs (job_title, work_address, city, _state, zip, job_location, job_type, salary, _description) VALUES ('Web Developer', '1234 5th street ne', 'Seattle', 'washington', '12345', 'remote', 'full-time', '$100,000 a year', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nesciunt mollitia possimus perferendis nisi. Nobis aperiam eius blanditiis ipsum amet beatae optio cumque labore voluptas, hic placeat tenetur rerum quia.');