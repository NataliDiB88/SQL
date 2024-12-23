import pool from '../db/connection.js';

export const getAllRoles = async () => {
  const result = await pool.query('SELECT * FROM role');
  return result.rows;
};

export const addRole = async (title, salary, department_id) => {
  const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING ', [title, salary, department_id]);
  return result.rows[0];
};

export const deleteRole = async (id) => { 
  const result = await pool.query('DELETE FROM role WHERE id = $1 RETURNING', [id]); 
  return result.rows[0];
};