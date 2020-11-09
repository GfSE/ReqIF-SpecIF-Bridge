testTransofrmReqIfToSpecIf = (ReqIfDocument) => {
    element = extractXmlDocFromString(ReqIfDocument);
    specIfObject = {};

    specIfObject.dataTypes = extractSpecifDatatypesFromXmlDoc(element.getElementsByTagName("DATATYPES"));
    specIfObject.propertyClasses = extractSpecifPropertyClassesFromXmlDoc(element.getElementsByTagName("SPEC-TYPES"));
    specIfObject.resourceClasses = extractSpecifResourceClassesFromXmlDoc(element.getElementsByTagName("SPEC-TYPES"));
    specIfObject.statementClasses = extractSpecifStatementClassesFromXmlDoc(element.getElementsByTagName("SPEC-TYPES"));
    specIfObject.resources = extractSpecifResourcesFromXmlDoc(element.getElementsByTagName("SPEC-OBJECTS"));
    
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

extractSpecifPropertyClassesFromXmlDoc = (XmlSpecTypeDocument) => {
    specifPropertyClassesArray = [];
    specificationArray = extractElementsOutOfHtmlCollection(XmlSpecTypeDocument[0].children)
    propertyClassArray = specificationArray.filter(specType => isPropertyClass(specType))
    propertyClassArray.forEach( propertyClassDocument => {
        specifPropertyClassesArray.push(extractSpecIfProptertyClass(propertyClassDocument))
    })
    return specifPropertyClassesArray;
}

extractSpecIfProptertyClass = (propertyClassDocument) => {
    specifPropertyClass = {};
    specifPropertyClass.id = propertyClassDocument.getAttribute("IDENTIFIER")
    specifPropertyClass.description = propertyClassDocument.getAttribute("DESC")
    return specifPropertyClass;
}

extractSpecifResourceClassesFromXmlDoc = (XmlSpecTypeDocument) => {
    specifResourceClassesArray = [];
    specificationArray = extractElementsOutOfHtmlCollection(XmlSpecTypeDocument[0].children)
    resourceClassArray = specificationArray.filter(specType => isResourceClass(specType))
    resourceClassArray.forEach( resourceClassDocument => {
        specifResourceClassesArray.push(extractSpecIfResourceClass(resourceClassDocument))
    })
    return specifResourceClassesArray;
}

extractSpecIfResourceClass = (resourceClassDocument) => {
    specifResourceClass = {};
    specifResourceClass.id = resourceClassDocument.getAttribute("IDENTIFIER")
    specifResourceClass.title = resourceClassDocument.getAttribute("LONG-NAME")
    specifResourceClass.description = resourceClassDocument.getAttribute("DESC")
    //specifResourceClass.icon = resourceClassDocument.getAttribute("")
    //specifResourceClass.instantiation = resourceClassDocument.getAttribute("")
    //specifResourceClass.propertyClasses = resourceClassDocument.getAttribute("")
    specifResourceClass.changedAt = resourceClassDocument.getAttribute("LAST-CHANGE")
    specifResourceClass.description = resourceClassDocument.getAttribute("DESC")
    return specifResourceClass;
}

extractSpecifStatementClassesFromXmlDoc = (XmlSpecTypeDocument) => {
    specifStatementClassesArray = [];
    specificationArray = extractElementsOutOfHtmlCollection(XmlSpecTypeDocument[0].children)
    statementClassArray = specificationArray.filter(specType => isStatementClass(specType))
    statementClassArray.forEach( statementClassDocument => {
        specifStatementClassesArray.push(extractSpecIfStatementClass(statementClassDocument))
    })
    return specifStatementClassesArray;
}

extractSpecIfStatementClass = (statementClassDocument) => {
    specifStatementClass = {};
    specifStatementClass.id = statementClassDocument.getAttribute("IDENTIFIER")
    specifStatementClass.title = statementClassDocument.getAttribute("LONG-NAME")
    specifStatementClass.description = statementClassDocument.getAttribute("DESC")
    //specifStatementClass.instantiation = statementClassDocument.getAttribute("DESC")
    //specifStatementClass.revision = statementClassDocument.getAttribute("DESC")
    specifStatementClass.changedAt = statementClassDocument.getAttribute("LAST-CHANGE")
    //specifStatementClass.subjectClasses = statementClassDocument.getAttribute("DESC")
    //specifStatementClass.objectClasses = statementClassDocument.getAttribute("DESC")
    return specifStatementClass;
}

extractSpecifResourcesFromXmlDoc = (XmlDocResources) => {
    specifResourcesArray = [];
    resourcesArray = extractElementsOutOfHtmlCollection(XmlDocResources[0].children)
    resourcesArray.forEach( resourceDocument => {
        specifResourcesArray.push(extractSpecIfResource(resourceDocument))
    })
    return specifResourcesArray;
}

extractSpecIfResource = (resourceDocument) => {
    specifResource = {};
    resourceDocument.getAttribute("IDENTIFIER") ? specifResource.id = resourceDocument.getAttribute("IDENTIFIER") : '';
    resourceDocument.getAttribute("LONG-NAME") ? specifResource.title = resourceDocument.getAttribute("LONG-NAME") : '';
    resourceDocument.childElementCount ? specifResource.class = resourceDocument.children[0].children[0].innerHTML : '';
    resourceDocument.getAttribute("") ? specifResource.revision = resourceDocument.getAttribute("") : '';
    resourceDocument.getAttribute("LAST-CHANGE") ? specifResource.changedAt = resourceDocument.getAttribute("LAST-CHANGE") : '';
    resourceDocument.getAttribute("") ? specifResource.changedBy = resourceDocument.getAttribute("") : '';
    resourceDocument.childElementCount>1 ? specifResource.properties = extractResourceProperties(resourceDocument.children[1]) : '';

    return specifResource;
}

extractResourceProperties = () => {

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

isPropertyClass = (classDocument) => {
    return classDocument.getAttribute("IDENTIFIER").toString().startsWith("PC");
}

isResourceClass = (classDocument) => {
    return classDocument.getAttribute("IDENTIFIER").toString().startsWith("RC");
}

isStatementClass = (classDocument) => {
    return classDocument.getAttribute("IDENTIFIER").toString().startsWith("SC");
}

getXmlDocument = () => {
    return extractXmlDocFromString(getInputValue())
}

getTagFromXmlDocument = (tagName) => {
    return getXmlDocument().getElementsByTagName(tagName)
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