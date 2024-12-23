import pool from '../db/connection.js';

export const getAllDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

export const addDepartment = async (name) => {
  const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING ', [name]);
  return result.rows[0];
};

export const deleteDepartment = async (id) => 
  { const result = await pool.query('DELETE FROM department WHERE id = $1 RETURNING', [id]); 
    return result.rows[0]; 
  };

export const getDepartmentBudget = async (department_id) => {
  const result = await pool.query(
    'SELECT SUM(role.salary) as total_budget FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = $1',
    [department_id]
  );
  return result.rows[0].total_budget;
};