import fs from 'fs';
import { Employee } from './employee.js';

const newEmp = new Employee(45, 'Anand', 55220);
const newEmpJson = newEmp.toJson();

const addDataToJsonFile = (path, entry) => {
    let currentContent = '[]';
    
    try {
        currentContent = fs.readFileSync(path, 'utf8');
    } catch (error) {
    }

    let empArray = [];

    if (currentContent.trim()) {
        try {
            empArray = JSON.parse(currentContent);
        } catch (parseError) {
            console.error('Failed to parse JSON data:', parseError);
            return;
        }
    }


    if (!Array.isArray(empArray)) {
        empArray = [];
    }

    empArray.push(JSON.parse(entry));
    const updatedContent = JSON.stringify(empArray, null, 2);
    fs.writeFileSync(path, updatedContent, 'utf8');
    console.log('Successfully appended employee data to the file.');
};


const jsonFilePath = 'employee.json';
addDataToJsonFile(jsonFilePath, newEmpJson);
