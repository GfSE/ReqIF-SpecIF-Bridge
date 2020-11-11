testTransofrmReqIfToSpecIf = (ReqIfDocument) => {
    element = extractXmlDocFromString(ReqIfDocument);
    specIfObject = {};
    specIfObject = extractMainSpecifProperties(element.getElementsByTagName("DATATYPES"));
    specIfObject.dataTypes = extractSpecifDatatypesFromXmlDoc(element.getElementsByTagName("DATATYPES"));
    specIfObject.propertyClasses = extractSpecifPropertyClassesFromXmlDoc(element.getElementsByTagName("SPEC-TYPES"));
    specIfObject.resourceClasses = extractSpecifResourceClassesFromXmlDoc(element.getElementsByTagName("SPEC-TYPES"));
    specIfObject.statementClasses = extractSpecifStatementClassesFromXmlDoc(element.getElementsByTagName("SPEC-TYPES"));
    specIfObject.resources = extractSpecifResourcesFromXmlDoc(element.getElementsByTagName("SPEC-OBJECTS"));
    specIfObject.statements = extractSpecifStatementsFromXmlDoc(element.getElementsByTagName("SPEC-RELATIONS"));
    specIfObject.hierarchies = extractSpecifHierarchiesFromXmlDoc(element.getElementsByTagName("SPECIFICATIONS"));
    return specIfObject
}

extractSpecIfFromXmlDoc = (xmlDoc) => {
    result = [];
    result.push({})
    return result;
}

extractMainSpecifProperties = (XmlDocReqIfHeader) => {
    specIfProeprties = {};
    return specIfProeprties;
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
    datatype.getAttribute("") ? specifDatatype.type = datatype.getAttribute("") : specifDatatype.type = 'xs:string';
    datatype.getAttribute("") ? specifDatatype.revision = datatype.getAttribute("") : specifDatatype.revision = "0";
    datatype.getAttribute("DESC") ? specifDatatype.description = datatype.getAttribute("DESC") : '';
    datatype.getAttribute("LAST-CHANGE") ? specifDatatype.changedAt = datatype.getAttribute("LAST-CHANGE") : '';
    datatype.getAttribute("MIN") ? specifDatatype.minInclusive = Number(datatype.getAttribute("MIN")) : '';
    datatype.getAttribute("MAX") ? specifDatatype.maxInclusive = Number(datatype.getAttribute("MAX")) : '';
    datatype.getAttribute("MAX-LENGTH") ? specifDatatype.maxLength = Number(datatype.getAttribute("MAX-LENGTH")) : '';
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

    specAttributesMap = extractSpecAttributesMap(XmlSpecTypeDocument[0])
    specifPropertyClassesArray = extractPropertyClassesFromSpecAttributeMap(specAttributesMap)
    
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
    specifStatementClass.instantiation = ["auto"]
    specifStatementClass.revision = "0";
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
    resourceDocument.getElementsByTagName("TYPE")[0] ? specifResource.class = resourceDocument.getElementsByTagName("TYPE")[0].children[0].innerHTML : '';
    resourceDocument.getAttribute("") ? specifResource.revision = resourceDocument.getAttribute("") : specifResource.revision = "0";
    resourceDocument.getAttribute("LAST-CHANGE") ? specifResource.changedAt = resourceDocument.getAttribute("LAST-CHANGE") : '';
    resourceDocument.getAttribute("") ? specifResource.changedBy = resourceDocument.getAttribute("") : '';
    resourceDocument.childElementCount>1 ? specifResource.properties = extractResourceProperties(resourceDocument.children[1]) : '';

    return specifResource;
}

extractResourceProperties = () => {

}

extractSpecifStatementsFromXmlDoc = (XmlDocStatements) => {
    specifStatementsArray = [];
    statementsArray = extractElementsOutOfHtmlCollection(XmlDocStatements[0].children)
    statementsArray.forEach( statementDocument => {
        specifStatementsArray.push(extractSpecIfStatement(statementDocument));
    }) 
    return specifStatementsArray;
}

extractSpecIfStatement = (statementDocument) => {
    specifStatement = {};
    statementDocument.getAttribute("IDENTIFIER") ? specifStatement.id = statementDocument.getAttribute("IDENTIFIER") : '';
    statementDocument.getElementsByTagName("TYPE")[0] ? specifStatement.class = statementDocument.getElementsByTagName("TYPE")[0].children[0].innerHTML : '';
    statementDocument.getAttribute("") ? specifStatement.revision = statementDocument.getAttribute("") : specifStatement.revision = "0";
    statementDocument.getAttribute("LAST-CHANGE") ? specifStatement.changedAt = statementDocument.getAttribute("LAST-CHANGE") : '';
    statementDocument.getAttribute("") ? specifStatement.changedBy = statementDocument.getAttribute("") : '';
    statementDocument.getElementsByTagName("SOURCE")[0] ? specifStatement.subject = statementDocument.getElementsByTagName("SOURCE")[0].children[0].innerHTML : '';
    statementDocument.getElementsByTagName("TARGET")[0] ? specifStatement.object = statementDocument.getElementsByTagName("TARGET")[0].children[0].innerHTML : '';
    
    return specifStatement;
}

extractSpecifHierarchiesFromXmlDoc = (XmlDocHierarchies) => {
    hierarchiesArray = extractElementsOutOfHtmlCollection(XmlDocHierarchies[0].children)
    rootElement = hierarchiesArray[0]
    specifHierarchiesArray = extractSpecIfSubNodes(rootElement)
    
    return specifHierarchiesArray;
}

extractSpecIfSubNodes = (rootElement) => {
    let specifNodesArray = [];
    childrenDocElement = getChildNodeswithTag(rootElement, "CHILDREN")[0];
    if(childrenDocElement != undefined){
        hierarchyDocumentsArray = extractElementsOutOfHtmlCollection(childrenDocElement.children)
        hierarchyDocumentsArray.forEach( hierarchyDocument => {
            specifNodesArray.push(extractSpecIfHierarchy(hierarchyDocument))
        })
    }
    return specifNodesArray;
}

extractSpecIfHierarchy = (hierarchyDocument) => {
    let specIfHierarchy = {};
    specIfHierarchy.id = hierarchyDocument.getAttribute("IDENTIFIER");
    specIfHierarchy.resource = hierarchyDocument.getElementsByTagName("OBJECT")[0].firstElementChild.innerHTML;
    specIfHierarchy.revision = "0";
    specIfHierarchy.changedAt = hierarchyDocument.getAttribute("LAST-CHANGE");
    let specifSubnodesArray = extractSpecIfSubNodes(hierarchyDocument);
    specifSubnodesArray.length ? specIfHierarchy.nodes = specifSubnodesArray : '';
    return specIfHierarchy;
}

extractSpecifFilesFromXmlDoc = (XmlDocFiles) => {
    let specIfFilesArray = [];
    filesArray = extractElementsOutOfHtmlCollection(XmlDocFiles[0].children)
    filesArray.forEach( fileDocument => {
        specIfFilesArray.push(extractSpecIfFile(fileDocument))
    })
    return specIfFilesArray;
}

extractSpecIfFile = (fileDocument) => {
    let specIfFile = {}
    fileDocument
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

getChildNodeswithTag = (parentDocument, tagName) => {
    return extractElementsOutOfHtmlCollection(parentDocument.children).filter(element => {return element.tagName == tagName})
}

extractSpecAttributesMap = (specTypesDocument) => {
    StringsSpecification = extractSpecAttributeStringsMap(specTypesDocument);
    XHTMLSpecification = extractSpecAttributeXHTMLMap(specTypesDocument);
    EnumsSpecification = extractSpecAttributeEnumsMap(specTypesDocument);
    return Object.assign({}, StringsSpecification, XHTMLSpecification, EnumsSpecification);
}

extractSpecAttributeStringsMap = (specTypesDocument) => {
    return extractSpecAttributeTypeMap(specTypesDocument, "ATTRIBUTE-DEFINITION-STRING");
}

extractSpecAttributeXHTMLMap = (specTypesDocument) => {
    return extractSpecAttributeTypeMap(specTypesDocument, "ATTRIBUTE-DEFINITION-XHTML");
}

extractSpecAttributeEnumsMap = (specTypesDocument) => {
    return extractSpecAttributeTypeMap(specTypesDocument, "ATTRIBUTE-DEFINITION-ENUMERATION");
}

extractSpecAttributeTypeMap = (specTypesDocument, tagName) => {
    let attributeDefinition = specTypesDocument.getElementsByTagName(tagName)
    let attributeDefinitionArray = extractElementsOutOfHtmlCollection(attributeDefinition)
    let attributeDefinitionMap = {}
    attributeDefinitionArray.forEach(definition => {
        attributeDefinitionMap[definition.getAttribute("IDENTIFIER")]={ 
                                                                        id : definition.getAttribute("LONG-NAME"),
                                                                        dataType : definition.children[0].children[0].innerHTML,
                                                                        changedAt : definition.getAttribute("LAST-CHANGE"),

                                                                    } 
                                                        });
    return attributeDefinitionMap
}

extractPropertyClassesFromSpecAttributeMap = (specAttributeMap) =>{
    specAttributeMapArray = Object.entries(specAttributeMap).map( keyValuePair => keyValuePair[1])
    propertyClassesObject = {}
    specAttributeMapArray.forEach(specification => propertyClassesObject[specification.id] = {dataType : specification.dataType, changedAt : specification.changedAt})
    propertyClasses = Object.entries(propertyClassesObject).map( entry => { return {id: entry[0] , title : "", dataType : entry[1].dataType, changedAt : entry[1].changedAt } })
    return propertyClasses;
}
/* 
############################ UI ###########################################
 */

getInputValue = () => {
    let element = document.getElementById('input');
    return element.value;
}

transform = () => {
    input = getInputValue();
    specIf = testTransofrmReqIfToSpecIf(input);
    let element = document.getElementById('output');
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