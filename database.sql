CREATE DATABASE jobboard;

CREATE EXTENSION IF NOT EXISTS  "uuid-ossp";

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_first_name VARCHAR(255) NOT NULL,
  user_last_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role VARCHAR(255)
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
  user_id uuid REFERENCES users(user_id),
  test_job BOOLEAN NOT NULL
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


-- test jobs data
INSERT INTO jobs(job_title, work_address, city, _state, zip, job_location, job_type, salary, _description, company_name, date_posted, user_id, test_job)
VALUES ('Web Developer', '12345 main street', 'Los Angeles', 'CA', '12345', 'In office', 'Full-time', '100000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Google', '2022-01-28', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Electrician', '22345 1st street', 'Orlando', 'FL', '12346', 'In office', 'Full-time', '105000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'CAT', '2022-02-28', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Accountant', '12345 main lane', 'New York City', 'NY', '12745', 'In office', 'Internship', '42000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Home Depot', '2022-01-15', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Acountant', '12345 main street', 'Los Angeles', 'CA', '12345', 'In office', 'Full-time', '70000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Amazon', '2022-03-28', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Salesman', '22245 122st street', 'Chicago', 'IL', '12349', 'In office', 'Commission only', '150000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Galaxy Hobby', '2022-03-19', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Salesman', '22245 122st street', 'Chicago', 'IL', '12349', 'In office', 'Commission only', '150000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Galaxy Hobby', '2022-03-19', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Salesman', '12345 2nd street', 'Austin', 'TX', '12385', 'In office', 'Part-time', '40000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Fred Meyer', '2022-03-29', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Salesman', '345 acorn street', 'Dallas', 'TX', '32345', 'Remote', 'Contract', '90000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Walmart', '2022-03-20', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Basketball Player', '345 acorn street', 'Los Angeles', 'CA', '32345', 'In office', 'Contract', '5000000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Lakers', '2022-03-31', '9f11b774-2596-4748-a945-cec2b22a1d08', true),
('Basketball Player - Point Guard', '345 acorn street', 'Los Angeles', 'CA', '32345', 'In office', 'Contract', '5000000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id nisl pellentesque, fermentum eros nec, fringilla libero. Aenean et imperdiet justo. Cras rutrum massa ut dui congue, eu pharetra velit sodales. Vestibulum pharetra diam velit, eget molestie felis semper a. Fusce viverra gravida nulla, eget volutpat lectus auctor nec. Sed sed sodales metus. Nam a ante est. Nulla cursus magna a elit ullamcorper, in blandit elit lacinia. Donec lacinia lectus id lorem tincidunt ornare.', 'Lakers', '2022-03-31', '9f11b774-2596-4748-a945-cec2b22a1d08', true);