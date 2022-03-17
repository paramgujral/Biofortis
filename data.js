module.exports = {
    url: 'https://automation.biofortis-test.net',
    userName: 'Paramjeet',
    password: 'Bio123@@',
    FormFields: {
       Fields: [
            {
                name: "Field1",
                lable: "Lable1",
                dataType: "Text",
                Flags: "Required"
            },
            {
                name: "Field2",
                lable: "Lable2",
                dataType: "Integer",
                Flags: "Required"
            },
            {
                name: "Field3",
                lable: "Lable3",
                dataType: "Date",

            },
        ]
    },
    formName: 'TestingForms',
    updateFormName: 'Field1Updated', 
    studyforAddingBioMaterial: 'Test Automation',
    studyCode: "Test Automation",
   
}