
const obj = {
    appActionInit: function(api) {
        api.registerApp({
            "name": "js-test",
            "display_name": "JavaScript Test",
            "short_desc": "Test",
            "desc": "Test",
            // "logo" is a base64-encoded string
            "logo": "AA==",
            "logo_file_name": "test.svg",
            "logo_mime_type": "image/svg+xml",
        });

        api.registerAction({
            "app": "js-test",
            "action": "test-api",
            "display_name": "Test API",
            "short_desc": "Test API",
            "desc": "Test API",
            "action_code": 2,  // DPAT_API == 2

            /* "api_code" is required when "action_code" == DPAT_API
                @param obj: any - is the main argument used to call the API and must correspond to the request
                type, which can be any serializable data type (including no value). It is normally a data object
                @param opts?: object - currently unused

                @return the return value for the API; can be of any serializable data type that the API returns
                (including no value)

                @note the function here will be called with no "this" context; "this" cannot be used in this function
            */
            "api_function": function(obj, opts) {
                obj.count += 1;
                console.log('obj + 1 = %d (%s)', obj, obj.note);
                return {
                    "result": obj.count,
                    "status": "OK",
                };
            },
            /* "options" defines the API request type when "action_code" == DPAT_API

                This is equivalent to "ActionOptionInfo" in Qore: https://qoretechnologies.com/manual/qorus/gitlab-docs/develop/qore/modules/DataProvider/html/struct_data_provider_1_1_action_option_info.html
                except that "type" is created from either a:
                - string: giving the name of a simple type - one of:
                    ["int", "integer", "string", "boolean", "bool", "double", "float", "number", "binary", "list",
                     "hash", "object", "date", "NULL", "nothing", "base64binary", "base64urlbinary", "hexbinary",
                     "data", "softint", "softstring", "softbool", "softfloat", "softnumber", "softdate", "*softint",
                     "*softstring", "*softbool", "*softfloat", "*softnumber", "*softdate", "all", "any", "auto",
                     "*int", "*integer", "*string", "*boolean", "*bool", "*double", "*float", "*number", "*binary",
                     "*list", "*hash", "*object", "*date", "*data", "*base64binary", "*base64urlbinary", "*hexbinary",
                     "byte", "*byte", "softbyte", "*softbyte", "ubyte", "*ubyte", "softubyte", "*softubyte"]
                or
                - hash: which describes a data object; each key describes a data property; field objects can have the
                  following keys:
                  - name: string - the technical name of the field
                  - display_name?: string - the user-friendly display name for the field
                  - short_desc?: string - a short plain-text description of the field
                  - desc?: string - a longer description for the field that supports markdown formatting
                  - type - same as this - either a string or a data object again
                  - example_value?: any - (values must use the field's type) any example value to use when generating
                    example data etc
                  - default_value?: any - (values must use the field's type) the default value if none is provided by
                    the user
                  - allowed_values?: AllowedValues[] - an array of objects providing the only values allowed for the
                    field - with the following properties
                    - display_name?: string - the user-friendly display name for the field
                    - short_desc?: string - a short plain-text description of the field
                    - value: any - (must be present and must use the field's type); one of the allowed values
                    - desc: string - a description of the value (if unknown just use the value again)
                  - depends_on?: string[] - an optional list of other options that must be set before this option can
                    be set
                  - get_allowed_values?: function (): AllowedValues[] | null - a function that will return the allowed
                    values when called
                  - attr?: Attributes - an optional data object with any properties

                  Note that this data will also be used to create the API request type
            */
            "options": {
                "count": {
                    "type": "int",
                    "display_name": "Count",
                    "short_desc": "A count of something",
                    "desc": "A count of something",
                    "required": true,
                    "preselected": true,
                    "get_allowed_values": function() {
                        return [
                            {
                                "display_name": "1",
                                "short_desc": "1",
                                "desc": "1",
                                "value": 1,
                            },
                            {
                                "display_name": "2",
                                "short_desc": "2",
                                "desc": "2",
                                "value": 2,
                            },
                        ];
                    },
                    "example_value": 1,
                },
                "other": {
                    "type": "string",
                    "display_name": "Other",
                    "short_desc": "another value",
                    "desc": "another value",
                    "required": true,
                    "preselected": true,
                    "depends_on": ["count"],
                    "get_allowed_values": function() {
                        return [
                            {
                                "display_name": "this",
                                "short_desc": "this",
                                "desc": "this",
                                "value": "this",
                            },
                            {
                                "display_name": "that",
                                "short_desc": "that",
                                "desc": "that",
                                "value": "that",
                            },
                        ];
                    },
                },
                "unimportant": {
                    "type": "bool",
                    "display_name": "Unimportant?",
                    "short_desc": "another option",
                    "desc": "another option",
                    "depends_on": ["count", "other"],
                },
            },
            /* "response_type" defines the response type when "action_code" == DPAT_API

                The response type data format is the same as the data format for types above, so either a string or a hash
            */
            "response_type": {
                "result": {
                    "type": "int",
                    "display_name": "Count",
                    "short_desc": "A count of something",
                    "desc": "A count of something",
                    "example_value": 1,
                },
                "status": {
                    "type": "string",
                    "display_name": "Status",
                    "short_desc": "The status of the operation",
                    "desc": "The status of the operation",
                    "allowed_values": [
                        {
                            "display_name": "OK",
                            "short_desc": "Successful result",
                            "desc": "Successful result",
                            "value": "OK",
                        },
                        {
                            "display_name": "Error",
                            "short_desc": "Error result",
                            "desc": "Error result",
                            "value": "Error",
                        },
                    ],
                },
            },
        });
    }
};
obj