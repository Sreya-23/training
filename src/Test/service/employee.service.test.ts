import Employee from '../../entity/employee.entity';
import EmployeeService from '../../service/employee.service';
import EmployeeRepository from '../../repository/employee.repository';
import { when } from 'jest-when';
import bcrypt from "bcrypt";

describe("Employee Service Test", () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    const newEmployee = {
        id: 5,
        createdAt: "2024-11-07T23:32:49.608Z",
        updatedAt: "2024-11-07T23:32:49.608Z",
        //deletedAt: null,
        email: "sarath@gmail.com",
        name: "Sarath M S",
        password: "$2b$10$L3TQIB2YSYdUfXqG.K0xJuNOQGOQE3UMwqaNjf6JOuRRFJKteWCtu",
        role: "Developer",
      };

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn()
        };
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it("should get all employees", async () => {
        employeeRepository.find = jest.fn().mockResolvedValueOnce([]);
        const employees = await employeeService.getAllEmployees();
        expect(employees).toEqual([]);
    });

    // it("should get employee by id" , async() => {
    //     //const employee = {id :2,name:"sreya", role:"HR"}
    //     employeeRepository.findOneBy = jest.fn().mockResolvedValueOnce(newEmployee);
    //     const employees = await employeeService.getEmployeeById(1);
    //     expect(employees).toEqual(newEmployee);

    // });
    
    it('should return getEmployeeById', async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id: 123}).mockResolvedValue({"id": 123, "name": "Employee name"});
        employeeRepository.findOneBy = mockedFunction;
        const user = await employeeService.getEmployeeById(123);
        expect(user).toEqual({"id": 123, "name": "Employee name"});
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });
    
    it('should return getEmployeeById', async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id: 123}).mockResolvedValue({"id": 123, "name": "Employee name"});
        employeeRepository.findOneBy = mockedFunction;
        const user = await employeeService.getEmployeeById(123);
        expect(user).toEqual({"id": 123, "name": "Employee name"});
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });

    it('should return deleteEmployeeById', async () => {
        const mockedFunction = jest.fn();
        when(mockedFunction).calledWith({id: 123}).mockResolvedValue({"success": true, "message": "Employee deleted"});
        employeeRepository.softRemove = mockedFunction;
        const response = await employeeService.deleteEmployee(123);
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });

    // it("should throw not found exception when employee not found", async () => {
    //     jest.spyOn(employeeRepository, "findOneBy").mockResolvedValueOnce(null);
    //     expect(employeeService.getEmployeeById(123)).rejects.toThrow("not found");
    // });


    // it("should throw password mismatch if password mismatch", async () => {
    //     const bcryptMock = jest.fn();
    //     when(bcryptMock)
    //         .calledWith("password", "11111111")
    //         .mockResolvedValue(false);
    //     bcrypt.compare = bcryptMock;

    //     const mockedFunction = jest.fn();
    //     when(mockedFunction)
    //         .calledWith({ email: "abc@yopmail.com" })
    //         .mockResolvedValue({
    //             email: "abc@yopmail.com",
    //             password: "password",
    //         });
    //     employeeRepository.findOneBy = mockedFunction;
    //     try {
    //         await employeeService.loginEmployee("abc@yopmail.com", "password");
    //     } catch (err) {
    //         expect(err).toEqual(new Error("Incorrect Password"));
    //     }
    // });
    











    



})