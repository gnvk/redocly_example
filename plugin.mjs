export default () => {
  return {
    id: "my-plugin",
    decorators: {
      oas3: {
        "remove-prefix": ({ prefix }) => ({
          ref: {
            leave(refObject) {
              // after partially resolving refs, we check if it still has a $ref field
              if (refObject?.$ref) {
                // ...and if it does, we remove the prefix
                refObject.$ref = refObject.$ref.replace(prefix, "");
              }
            },
          },
          NamedSchemas: {
            leave(schemas) {
              // replace all keys that start with the prefix with the new key in components.schemas
              for (const key in schemas) {
                if (key.startsWith(prefix)) {
                  const newKey = key.replace(prefix, "");
                  schemas[newKey] = schemas[key];
                  delete schemas[key];
                }
              }
            },
          },
          NamedParameters: {
            leave(parameters) {
              // replace all keys that start with the prefix with the new key in components.parameters
              for (const key in parameters) {
                if (key.startsWith(prefix)) {
                  const newKey = key.replace(prefix, "");
                  parameters[newKey] = parameters[key];
                  delete parameters[key];
                }
              }
            },
          },
        }),
      },
    },
  };
};
