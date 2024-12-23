INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES
('Salesperson', 60000, 1),
('Software Engineer', 90000, 2),
('Accountant', 70000, 3),
('HR Manager', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, NULL),
('Patricia', 'Brown', 4, 3);