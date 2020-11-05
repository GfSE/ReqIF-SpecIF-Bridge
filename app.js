testTransofrmReqIfToSpecIf = (ReqIfDocument) => {
   return "Under Construction"
}


/* 
##########################################################################
########################## Tools #########################################
##########################################################################
*/

isArrayWithContent = (array) => {
    return (Array.isArray(array) && array.length > 0)
}

extractRdfFromSpecifObjectArray = (predicate, objectArray) => {
    let TtlString = '';
    if(isArrayWithContent(objectArray)){
        TtlString = tier1RdfEntry(predicate);
        objectArray.forEach( object => {
            TtlString += tier2RdfEntry(`:${object} ,`);
        })
        TtlString=TtlString.replace(/,([^,]*)$/, ';');
    }
    return TtlString
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
    rdf = testTransofrmReqIfToSpecIf(input)
    element = document.getElementById('output');
    element.innerHTML=rdf
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