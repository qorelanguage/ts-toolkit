# -*- mode: qore; indent-tabs-mode: nil -*-
#! Qore TypeScriptActionInterface module definition

/*  TypeScriptActionRestConnection.qc Copyright 2024 Qore Technologies, s.r.o.

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
*/

#! Main namespace for the TypeScriptActionInterface module
public namespace TypeScriptActionInterface {
#! Generic class for app REST connection for an app provided by the TypeScript API
public class TypeScriptAppRestConnection inherits RestConnection {
    private {
        string scheme;
        string app;
        hash<ConnectionSchemeInfo> info;
    }

    #! Creates the object
    #! creates the TypeScriptAppRestConnection object
    /** @param name the name of the connection
        @param description connection description
        @param url this aargument is ignored; the default Google API is always used
        @param attributes various attributes. See below
        @param options connection options

        See @ref ConnectionProvider::AbstractConnection::constructor() for \c attributes and \c options reference.

        @throw CONNECTION-OPTION-ERROR missing or invalid connection option
    */
    constructor(string name, string description, string url, hash<auto> attributes = {}, hash<auto> options = {})
            : RestConnection(name, description, url, attributes,
                TypeScriptAppRestConnection::getOptions(url, options)) {
        setupTs(url);
    }

    #! creates the TypeScriptAppRestConnection object
    /** @param config with the following keys:
        - name (required string): the connection name
        - display_name (optional string): the display name
        - short_desc (optional string): a short description in plain text
        - desc (optional string): a long description with markdown formatting
        - url (required string): the connection URL
        - opts (optional hash): connection options
        - logger (optional LoggerInterface object): logger for the connection
        @param attr optional connection attributes
        - monitor (optional bool): should the connection be monitored? Default: True
        - enabled (optional bool): is the connection enabled? Default: True
        - locked (optional bool): is the connection locked? Default: False
        - debug_data (optional bool): debug data? Default: False
        - tags (optional hash): tags for the connection; no default value

        @throw CONNECTION-OPTION-ERROR missing or invalid connection option or attribute
    */
    constructor(hash<auto> config, *hash<auto> attr)
            : RestConnection(config + TypeScriptAppRestConnection::getOptions(url, config.opts), attr) {
        setupTs(url);
    }

    #! returns the type
    string getType() {
        return scheme;
    }

    #! Set up the generic object from the app config
    private setupTs(string url) {
        *string scheme = (url =~ x/^(rest-[^:]+):/)[0];
        if (!exists scheme) {
            throw "TYPESCRIPT-REST-CONNECTION-ERROR", sprintf("Cannot determine TypeScript REST scheme from url %y",
                url);
        }
        self.scheme = scheme;
        *string app = (scheme =~ x/^rest-(.+)$/)[0];
        if (!exists app) {
            throw "TYPESCRIPT-REST-CONNECTION-ERROR", sprintf("Cannot determine TypeScript REST app from scheme %y "
                "in URL %y", scheme, url);
        }
        self.app = app;
        info = ConnectionSchemeCache::getSchemeEx(scheme);
    }

    #! Sets child data provider capabilities
    private setChildCapabilities() {
        children_can_support_apis = True;
    }

    #! returns a @ref TypeScriptAppRestConnection object
    /** @param connect if @ref True "True", then the connection is returned already connected
        @param rtopts this connection type does not accept any runtime options, so this parameter is ignored

        @return a @ref TypeScriptAppRestConnection object
    */
    private TypeScriptAppRestConnection getImpl(bool connect = True, *hash<auto> rtopts) {
        return new TypeScriptAppRestConnection(getConnectionOptions(), !connect);
    }

    #! Returns the ConnectionSchemeInfo hash for this object
    private hash<ConnectionSchemeInfo> getConnectionSchemeInfoImpl() {
        return info;
    }

    #! returns options for @ref GoogleRestConnection::constructor()
    static private hash<auto> getOptions(string url, hash<auto> opts) {
        return TypeScriptActionInterface::getRestOptions((url =~ x/^rest-([^:]+):$/)[0]) + opts;
    }
}
}
