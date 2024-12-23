import express from 'express';
import { getAllDepartments, addDepartment } from '../models/department.js';
import { getAllRoles, addRole } from '../models/role.js';
import { getAllEmployees, addEmployee, updateEmployeeRole } from '../models/employee.js';

const router = express.Router();

router.put('/employees/:id/manager', async (req, res) => {
  try {
    const { id } = req.params;
    const { manager_id } = req.body;
    const updatedEmployee = await updateEmployeeManager(id, manager_id);
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/employees/manager/:manager_id', async (req, res) => {
  try {
    const { manager_id } = req.params;
    const employees = await getEmployeesByManager(manager_id);
    res.json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/employees/department/:department_id', async (req, res) => {
  try {
    const { department_id } = req.params;
    const employees = await getEmployeesByDepartment(department_id);
    res.json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Departments
router.get('/departments', async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = await addDepartment(name);
    res.json(newDepartment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/roles', async (req, res) => {
  try {
    const { title, salary, department_id } = req.body;
    const newRole = await addRole(title, salary, department_id);
    res.json(newRole);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const newEmployee = await addEmployee(first_name, last_name, role_id, manager_id);
    res.json(newEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/employees/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id } = req.body;
    const updatedEmployee = await updateEmployeeRole(id, role_id);
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/departments/:id/budget', async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await getDepartmentBudget(id);
    res.json({ total_budget: budget });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await deleteDepartment(id);
    res.json(deletedDepartment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await deleteRole(id);
    res.json(deletedRole);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await deleteEmployee(id);
    res.json(deletedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;