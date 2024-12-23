import inquirer from 'inquirer';
import {
  getAllDepartments, addDepartment, deleteDepartment, getDepartmentBudget
} from './models/department.js';
import { getAllRoles, addRole, deleteRole } from './models/role.js';
import {
  getAllEmployees, addEmployee, updateEmployeeRole, updateEmployeeManager, getEmployeesByManager, getEmployeesByDepartment, deleteEmployee
} from './models/employee.js';

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View Employees by Manager',
        'View Employees by Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View Total Utilized Budget by Department',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View All Departments':
      const departments = await getAllDepartments();
      console.table(departments);
      break;
    case 'View All Roles':
      const roles = await getAllRoles();
      console.table(roles);
      break;
    case 'View All Employees':
      const employees = await getAllEmployees();
      console.table(employees);
      break;
    case 'Add Department':
      const { departmentName } = await inquirer.prompt([
        { type: 'input', name: 'departmentName', message: 'What is the name of the department?' }
      ]);
      await addDepartment(departmentName);
      console.log(`Added ${departmentName} to the database`);
      break;
    case 'Add Role':
      const { roleTitle, roleSalary, roleDeptId } = await inquirer.prompt([
        { type: 'input', name: 'roleTitle', message: 'What is the name of the role?' },
        { type: 'input', name: 'roleSalary', message: 'What is the salary of the role?' },
        { type: 'input', name: 'roleDeptId', message: 'Which department does the role belong to?' }
      ]);
      await addRole(roleTitle, roleSalary, roleDeptId);
      console.log(`Added ${roleTitle} to the database`);
      break;
    case 'Add Employee':
      const { firstName, lastName, empRoleId, empManagerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'What is the employee\'s first name?' },
        { type: 'input', name: 'lastName', message: 'What is the employee\'s last name?' },
        { type: 'input', name: 'empRoleId', message: 'What is the employee\'s role ID?' },
        { type: 'input', name: 'empManagerId', message: 'What is the employee\'s manager ID?' }
      ]);
      await addEmployee(firstName, lastName, empRoleId, empManagerId);
      console.log(`Added ${firstName} ${lastName} to the database`);
      break;
    case 'Update Employee Role':
      const { empId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'empId', message: 'What is the employee\'s ID?' },
        { type: 'input', name: 'newRoleId', message: 'What is the new role ID?' }
      ]);
      await updateEmployeeRole(empId, newRoleId);
      console.log(`Updated employee's role`);
      break;
    case 'Update Employee Manager':
      const { empIdMgr, newManagerId } = await inquirer.prompt([
        { type: 'input', name: 'empIdMgr', message: 'What is the employee\'s ID?' },
        { type: 'input', name: 'newManagerId', message: 'What is the new manager\'s ID?' }
      ]);
      await updateEmployeeManager(empIdMgr, newManagerId);
      console.log(`Updated employee's manager`);
      break;
    case 'View Employees by Manager':
      const { managerId } = await inquirer.prompt([
        { type: 'input', name: 'managerId', message: 'What is the manager\'s ID?' }
      ]);
      const employeesByManager = await getEmployeesByManager(managerId);
      console.table(employeesByManager);
      break;
    case 'View Employees by Department':
      const { departmentId } = await inquirer.prompt([
        { type: 'input', name: 'departmentId', message: 'What is the department\'s ID?' }
      ]);
      const employeesByDept = await getEmployeesByDepartment(departmentId);
      console.table(employeesByDept);
      break;
    case 'Delete Department':
      const { deptIdToDelete } = await inquirer.prompt([
        { type: 'input', name: 'deptIdToDelete', message: 'What is the department\'s ID to delete?' }
      ]);
      await deleteDepartment(deptIdToDelete);
      console.log(`Deleted department with ID ${deptIdToDelete}`);
      break;
    case 'Delete Role':
      const { roleIdToDelete } = await inquirer.prompt([
        { type: 'input', name: 'roleIdToDelete', message: 'What is the role\'s ID to delete?' }
      ]);
      await deleteRole(roleIdToDelete);
      console.log(`Deleted role with ID ${roleIdToDelete}`);
      break;
    case 'Delete Employee':
      const { empIdToDelete } = await inquirer.prompt([
        { type: 'input', name: 'empIdToDelete', message: 'What is the employee\'s ID to delete?' }
      ]);
      await deleteEmployee(empIdToDelete);
      console.log(`Deleted employee with ID ${empIdToDelete}`);
      break;
    case 'View Total Utilized Budget by Department':
      const { deptIdForBudget } = await inquirer.prompt([
        { type: 'input', name: 'deptIdForBudget', message: 'What is the department\'s ID to view its total budget?' }
      ]);
      const totalBudget = await getDepartmentBudget(deptIdForBudget);
      console.log(`Total budget for department ID ${deptIdForBudget}: ${totalBudget}`);
      break;
    case 'Exit':
      console.log('Exiting application');
      process.exit();
  }

  mainMenu();
};

mainMenu();
