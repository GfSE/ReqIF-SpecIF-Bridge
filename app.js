testTransofrmReqIfToSpecIf = (ReqIfDocument) => {
    element = extractXmlDocFromString(ReqIfDocument);
    specIfObject = {};

    specIfObject.dataTypes = extractSpecifDatatypesFromXmlDoc(element.getElementsByTagName("DATATYPES"));
    
    return specIfObject
}

extractSpecIfFromXmlDoc = (xmlDoc) => {
    result = [];
    result.push({})
    return result;
}

extractSpecifDatatypesFromXmlDoc = (XmlDocDatatypes) => {
    specIfDatatypes = [];
    datatypesArray = extractElementsOutOfHtmlCollection(XmlDocDatatypes[0].children)
    datatypesArray.forEach( datatype => {
        specIfDatatypes.push(extractSpecifDatatype(datatype))
    });
    return specIfDatatypes;
}

extractSpecifDatatype = (datatype) => {
    specifDatatype = {};
    datatype.getAttribute("IDENTIFIER") ? specifDatatype.id = datatype.getAttribute("IDENTIFIER") : '';
    datatype.getAttribute("LONG-NAME") ? specifDatatype.title = datatype.getAttribute("LONG-NAME") : '';
    datatype.getAttribute("") ? specifDatatype.type = datatype.getAttribute("") : '';
    datatype.getAttribute("") ? specifDatatype.revision = datatype.getAttribute("") : '';
    datatype.getAttribute("DESC") ? specifDatatype.description = datatype.getAttribute("DESC") : '';
    datatype.getAttribute("LAST-CHANGE") ? specifDatatype.changedAt = datatype.getAttribute("LAST-CHANGE") : '';
    datatype.getAttribute("MIN") ? specifDatatype.minInclusive = datatype.getAttribute("MIN") : '';
    datatype.getAttribute("MAX") ? specifDatatype.maxInclusive = datatype.getAttribute("MAX") : '';
    datatype.getAttribute("MAX-LENGTH") ? specifDatatype.maxLength = datatype.getAttribute("MAX-LENGTH") : '';
    datatype.getAttribute("") ? specifDatatype.fractionDigits = datatype.getAttribute("") : '';
    datatype.childElementCount ? specifDatatype.values = extractDataTypeValues(datatype.children) : '';



    return specifDatatype;
}

extractDataTypeValues = (DataTypeValuesHtmlCollection) => {
    valuesArray = specIfValuesArray = [];
    specifiedValues = DataTypeValuesHtmlCollection[0];
    valuesArray = extractElementsOutOfHtmlCollection(specifiedValues.children);
    valuesArray.forEach( value => {specIfValuesArray.push(extractSpecIfValue(value))});
    return specIfValuesArray;
}

extractSpecIfValue = (valueDocument) => {
    specifValueObject = {};
    valueDocument.getAttribute("IDENTIFIER") ?  specifValueObject.id = valueDocument.getAttribute("IDENTIFIER") : '';
    valueDocument.getAttribute("LONG-NAME") ?   specifValueObject.value = valueDocument.getAttribute("LONG-NAME") : '';
    return specifValueObject;

}

extractSpecifPropertyClassesFromXmlDoc = (XmlDocPropertyClasses) => {
    result = [];
    propertyClassesArray = extractElementsOutOfHtmlCollection(XmlDocPropertyClasses[0].children)
    result.push({})
    return result;
}

extractSpecifResourceClassesFromXmlDoc = (XmlDocResourceClasses) => {
    result = [];
    resourceClassesArray = extractElementsOutOfHtmlCollection(XmlDocResourceClasses[0].children)
    result.push({})
    return result;
}

extractSpecifStatementClassesFromXmlDoc = (XmlDocStatementClasses) => {
    result = [];
    statementClassesArray = extractElementsOutOfHtmlCollection(XmlDocStatementClasses[0].children)
    result.push({})
    return result;
}

extractSpecifResourcesFromXmlDoc = (XmlDocResources) => {
    result = [];
    resourcesArray = extractElementsOutOfHtmlCollection(XmlDocResources[0].children)
    result.push({})
    return result;
}

extractSpecifStatementsFromXmlDoc = (XmlDocStatements) => {
    result = [];
    statementsArray = extractElementsOutOfHtmlCollection(XmlDocStatements[0].children)
    result.push({})
    return result;
}

extractSpecifHierarchiesFromXmlDoc = (XmlDocHierarchies) => {
    result = [];
    hierarchiesArray = extractElementsOutOfHtmlCollection(XmlDocHierarchies[0].children)
    result.push({})
    return result;
}

extractSpecifFilesFromXmlDoc = (XmlDocFiles) => {
    result = [];
    filesArray = extractElementsOutOfHtmlCollection(XmlDocFiles[0].children)
    result.push({})
    return result;
}


/* 
##########################################################################
########################## Tools #########################################
##########################################################################
*/

isArrayWithContent = (array) => {
    return (Array.isArray(array) && array.length > 0)
}

extractXmlDocFromString = (string) => {
    parser = new DOMParser();
    return parser.parseFromString(string,"text/xml");
}

extractElementsOutOfHtmlCollection = (htmlCollection) => {
    result = [];
    for (let node of htmlCollection) { result.push(node) }
    return result;
}

getXmlDocument = () => {
    return extractXmlDocFromString(getInputValue())
}


/* 
############################ UI ###########################################
 */

getInputValue = () => {
    element = document.getElementById('input');
    return element.value;
}

transform = () => {
    input = getInputValue();
    specIf = testTransofrmReqIfToSpecIf(input);
    element = document.getElementById('output');
    element.innerHTML=JSON.stringify(specIf, null, '\t');
}


/* 
########################## String #########################################
 */

tier0RdfEntry = (content) => {
    return `\n${content}`
} 

tier1RdfEntry = (content) => {
    return `\n\t${content}`
}

tier2RdfEntry = (content) => {
    return `\n\t\t${content}`
}

tier3RdfEntry = (content) => {
    return `\n\t\t\t${content}`
}

emptyLine = () => {
    return `\n`
}

escapeSpecialCharaters = (string) => {
    return string.replace("\\","\\\\").replace(/\\([\s\S])|(')/g, "\\$1$2").replace(/\n/g, "\\n")
}