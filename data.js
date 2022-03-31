module.exports = {
    url                     : 'https://automation.biofortis-test.net/login',
    userName                : 'Paramjeet',
    password                : 'Bio123@@',
    newFormOption           : "Biomaterial",
    newFormName             : "Test Automation Form",
    formName                : 'TestingForms',
    updateFormName          : 'Test Automation Form Updated',
    updateFieldName         : 'Field1 Updated',
    newBiomaterialName      : 'Test Automation Biomaterial',
    newBiomaterialCode      : 'TA1234',
    newBiomaterialName2     : 'Test Automation Biomaterial - 2',
    newBiomaterialCode2     : 'TA1234II',
    newChildBiomaterialName : 'Test Automation Biomaterial - Child',
    newchildBiomaterialCode : 'ChildTA1234',
    updateBiomaterialName   : 'Test Automation Biomaterial Updated',
    FormFields: {
       Fields: [
            {
                name    : "Field1",
                lable   : "Lable1",
                dataType: "Text",
                Flags   : "Required"
            },
            {
                name    : "Field2",
                lable   : "Lable2",
                dataType: "Integer",
                Flags   : "Required"
            },
        ]
    },
    storage1: 'R52.CT.02 Facility',
    storage1Units: [
        'R52.CT.02 Freezer',
        'R52.CT.02 Freezer_2'
    ],
    storage2: 'DEmo1234321',
    studyforAddingBioMaterial: 'Test Automation',
    studyCode: "Test Automation",
    dataSourceSearch:{
        datasourceName: "Adm.PER.27",
        datasourceType: "Snapshot"
    },
    searchSubjectData:{
        subjectCode     :   "1234",
        studyCode       :   "FAST Study",
        subjectID       :   "15",
        fullName        :   "test test test",
        sex             :   "Male",
        mortalityStatus :   "Dead",
        barcode         :   "1234"
    },
    subjectCode : "Test Automation",
    deletStudyCode: "Subject123"  
}