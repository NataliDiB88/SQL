import pool from '../db/connection.js';

export const getAllEmployees = async () => {
  const result = await pool.query('SELECT * FROM employee');
  return result.rows;
};

export const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING ', [first_name, last_name, role_id, manager_id]);
  return result.rows[0];
};

export const updateEmployeeRole = async (employee_id, role_id) => {
  const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING', [role_id, employee_id]);
  return result.rows[0];
};

export const updateEmployeeManager = async (employee_id, manager_id) => {
  const result = await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING ', [manager_id, employee_id]);
  return result.rows[0];
};

export const getEmployeesByManager = async (manager_id) => {
  const result = await pool.query('SELECT FROM employee WHERE manager_id = $1', [manager_id]);
  return result.rows;
};

export const getEmployeesByDepartment = async (department_id) => {
  const result = await pool.query(
    'SELECT employee., department.name as department_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = $1',
    [department_id]
  );
  return result.rows;
};

export const deleteEmployee = async (id) => { 
  const result = await pool.query('DELETE FROM employee WHERE id = $1 RETURNING', [id]); 
  return result.rows[0]; 
};