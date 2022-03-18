module.exports = {
    url: 'https://automation.biofortis-test.net',
    userName: 'Paramjeet',
    password: 'Bio123@@',
    newFormOption: "Biomaterial",
    newFormName: "Test Automation Form",
    formName: 'TestingForms',
    updateFormName: 'Test Automation Form Updated',
    updateFieldName: 'Field1 Updated',
    newBiomaterialName: 'Test Automation Biomaterial',
    newBiomaterialCode: 'TA1234',
    newBiomaterialName2: 'Test Automation Biomaterial - 2',
    newBiomaterialCode2: 'TA1234II',
    newChildBiomaterialName: 'Test Automation Biomaterial - Child',
    newchildBiomaterialCode: 'ChildTA1234',
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
        ]
    },
    validateFormAuditTrail:{
        //'Paramjeet Gujral (Paramjeet) created Form (ID=246) on': '3/18/2022 6:31:18 PM',
        'Allow Edit without Parent Edit Permissions': 'set to "No"',
        'Allow manual entry of External ID/Source': 'set to "No"',
        'Allow records to be locked': ' set to "No"',
        'Collect changed from': ' "One Record" to "Many Records"',
        'Create Qiagram Datasource': ' set to "Yes"',
        'Display Column Number': ' set to "2"',
        'Display For New Records': ' set to "No"',
        'Make Available in Data Entry': ' set to "Yes"',
        'Make Available in Search': ' set to "Yes"',
        'Name': ' set to "test automation"',
        'Show Attachments': ' set to "No"',
        'Added': ' Fields (ID=683).',
    },
    validateFormAuditTrailForField:{
        'Add New Values To List': ' set to "Yes"',
        'Contains PHI': ' set to "No"',
        'Decimal Precision': ' set to "10"',
        'Default to Current Date/Time': ' set to "No"',
        'External ID': ' set to "field1"',
        'Is Required': ' set to "No"',
        'Is Title': ' set to "No"',
        'Label': ' set to "label1"',
        'Location': ' set to "In-line"',
        'Maximum': ' set to "250"',
        'Name': ' set to "field1"',
        'Show Help Text': 'set to "as tooltip"',
        'Type':  'set to "Text"',
    },
     
    studyforAddingBioMaterial: 'Test Automation',
    studyCode: "Test Automation",
    dataSourceSearch:{
        datasourceName: "Adm.PER.27",
        datasourceType: "Snapshot"
    }
   
}