const interfaceNameRegex = /public class ([a-zA-Z0-9?]+) /g;
const propertyRegex = /public ([a-zA-Z?\<\>\[\]]+ [a-zA-Z0-9]+).*;/g;

interface JsDocProperty {
    property: string;
    type: string;
}

const typeMappings = {
    string: "string",
    int: "number",
    decimal: "number",
    float: "number",
    bool: "boolean",
    object: "*",
};

const jsdocType = (typeName: string, props: string) => {
    return `
/**
 * @typedef {Object} ${typeName}${props}
 **/
    `;
};

const jsdocProp = (propertyName: string, propertyType: string) => {
    const isList =
        propertyType.includes("IEnumerable") || propertyType.includes("List");

    const splitComponents = propertyType.split("<");
    propertyType =
        splitComponents.length > 1
            ? splitComponents[1].replace(">", "")
            : splitComponents[0];

    let jsdocType = "any";
    if (Object.keys(typeMappings).includes(propertyType)) {
        jsdocType = typeMappings[propertyType];
    }

    if (isList) {
        jsdocType = `${jsdocType}[]`;
    }

    return `\n * @property {${jsdocType}} ${propertyName}`;
};

export const convertClassToJsdocType = (
    csharpClass: string,
    classPrefix: string,
    classSuffix: string
): string => {
    const interfaceName = `${classPrefix}${extractInterfaceName(
        csharpClass
    )}${classSuffix}`;

    const props = extractProperties(csharpClass);

    const jsdocProps = props
        .map((property) => {
            return jsdocProp(property.property, property.type);
        })
        .join("");

    return jsdocType(interfaceName, jsdocProps);
};

const extractInterfaceName = (tsInterface: string): string => {
    interfaceNameRegex.lastIndex = 0;
    let matches = interfaceNameRegex.exec(tsInterface);
    if (!matches || matches.length === 0) {
        return "";
    }
    return matches[matches.length - 1];
};

const extractProperties = (csharpClass: string): JsDocProperty[] => {
    propertyRegex.lastIndex = 0;

    let matches = csharpClass.match(propertyRegex);
    if (!matches) {
        return [];
    }

    let jsdocProps: JsDocProperty[] = matches.map((match) => {
        const components = match.split(" ");
        return {
            property: components[2].trim().replace(";", ""),
            type: components[1].trim(),
        };
    });
    return jsdocProps;
};
