export default { classesDocs: [{"name":"QorusAuthenticator","comments":{"summary":"Authentication manager for QorusToolkit, allows to create and manage multiple\nQorusEndpoints","returnSummary":"QorusAuthenticator class object"},"properties":[{"name":"allApiPaths","comments":{"summary":"Object of Api paths for the selected endpoint"},"type":"ApiPaths"},{"name":"apiPathsAuthenticator","comments":{"summary":"Api paths for the QorusAuthenticator"},"type":"ApiPathsAuthenticator"},{"name":"endpoints","comments":{"summary":null},"type":"Endpoint[ ]"},{"name":"noauth","comments":{"summary":"No auth identifier to identify if the no-auth is enabled for the user"},"type":"boolean"},{"name":"selectedEndpoint","comments":{"summary":"Selected endpoint from the endpoints array"},"type":"Endpoint | undefined"}]},{"name":"QorusDataProvider","comments":{"summary":"QorusDataProvider api manager class provides methods to interact with Qorus DataProviders. Class enables CRUD operations for DataProvider\nand their properties","returnSummary":"QorusDataProvider class object"},"properties":[{"name":"context","comments":{"summary":"Current context for the data provider"},"type":"Context"},{"name":"path","comments":{"summary":"Array of path strings, linking to the current provider path extension"},"type":"string[ ]"},{"name":"providerData","comments":{"summary":"Data provider data with children object"},"type":"any"},{"name":"responseData","comments":{"summary":"Get Request response data for a data provider"},"type":"any"},{"name":"responseError","comments":{"summary":"Get Request error data if error received"},"type":"any"}]},{"name":"QorusRequest","comments":{"summary":"QorusRequest is a https request manager class which provides methods to create different kinds of https request\nfor different versions of Qorus server api","returnSummary":"QorusRequest class object"},"properties":[{"name":"defaultHeaders","comments":{"summary":"Default headers for the QorusRequest"},"type":"DefaultHeaders"}]},{"name":"QorusOptions","comments":{"summary":"QorusOptions is a helper class that provides methods to interact with Qorus DataProviders Options. Class enables CRUD operations for DataProvider\nOptions and their properties","returnSummary":"QorusOptions class object"},"properties":[{"name":"name","comments":{"summary":"Name of the provider option"},"type":"string"},{"name":"providerOptions","comments":{"summary":null},"type":"Properties[ ]"}]},{"name":"QorusValidator","comments":{"summary":"QorusValidator is a helper class to verify the validity for Qorus types and their values","returnSummary":"QorusRequest class object"},"properties":[]}], methodDocs: [[{"className":"QorusAuthenticator","data":{"async":false,"name":"#fixEndpointData","label":"#fixEndpointData( data: AddEndpoint ): LoginParams & AddEndpoint","params":[{"label":"data","type":"AddEndpoint","description":"AddEndpoint, data to be fixed"}],"comments":{"summary":"Fixes the endpoint data","returnSummary":"Fixed Endpoint config"},"returnTypes":[{"label":"AddEndpoint"},{"label":"LoginParams"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"addEndpoint","label":"addEndpoint( endpointConfig: AddEndpoint ): Endpoint","params":[{"label":"endpointConfig","type":"AddEndpoint","description":"Endpoint configuration required to add a new endpoint"}],"comments":{"summary":"Add a new Qorus Endpoint to interact with the qorus api.","returnSummary":"Newly added endpoint"},"returnTypes":[{"label":"Endpoint"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"checkNoAuth","label":"checkNoAuth( endpoint: Endpoint ): Promise< boolean >","params":[{"label":"endpoint","type":"Endpoint","description":"Endpoint config to add the data"}],"comments":{"summary":"Checks if the Qorus endpoint supports no-auth","returnSummary":"True if the no-auth is enabled for the user, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAllEndpoints","label":"getAllEndpoints( ): Endpoint[ ]","params":[],"comments":{"summary":"A getter to get all the available Endpoints","returnSummary":"Endpoints array with all the available endpoints"},"returnTypes":[{"label":"Endpoint[ ]"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getApiPaths","label":"getApiPaths( ): ApiPaths","params":[],"comments":{"summary":"A getter to return the api paths for the selected Endpoint","returnSummary":"ApiPaths for the selected endpoint if exists, otherwise returns default api paths"},"returnTypes":[{"label":"ApiPaths"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getAuthToken","label":"getAuthToken( ): string | undefined","params":[],"comments":{"summary":"A getter to return the auth token of the selected Endpoint","returnSummary":"token if the the selected endpoint exists and the user is authenticated, otherwise returns undefined"},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointById","label":"getEndpointById( endpointId: string ): Endpoint | undefined","params":[{"label":"endpointId","type":"string","description":null}],"comments":{"summary":"A getter to get the endpoint if it exist in the Endpoints array","returnSummary":"Endpoint object if the endpoint with the provided id exist in the endpoints array, undefined otherwise."},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getEndpointVersion","label":"getEndpointVersion( endpointId: string ): Version | undefined","params":[{"label":"endpointId","type":"string","description":"Optional id parameter to get the version of a particular endpoint"}],"comments":{"summary":"A getter to get the api Version of a Endpoint","returnSummary":"Version of the selected endpoint or version of the the endpoint found by id,\nif the endpoint doesn't exists it returns undefined"},"returnTypes":[{"label":"Version"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"getSelectedEndpoint","label":"getSelectedEndpoint( ): Endpoint | undefined","params":[],"comments":{"summary":"A getter to get selected Endpoint","returnSummary":"Selected Endpoint if the endpoint exists, undefined otherwise"},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"login","label":"login( loginParams: LoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"LoginParams","description":"LoginParams, user and pass is required to authenticate the user."}],"comments":{"summary":"Authenticates the user to interact with the Qorus api.\nIf the username and password is not provided it tries to authenticate the user using the locally stored token from the selected Endpoint","returnSummary":"Authentication token if the authentication is successful, undefined otherwise."},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"logout","label":"logout( ): Promise< boolean >","params":[],"comments":{"summary":"Logs out the current user from the selected endpoint","returnSummary":"True if the operation is successful, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"renewSelectedEndpointToken","label":"renewSelectedEndpointToken( loginParams: LoginParams ): Promise< string | undefined >","params":[{"label":"loginParams","type":"LoginParams","description":"LoginParams optional username and password can be provided"}],"comments":{"summary":"Allows the user to renew the selected endpoint authentication token","returnSummary":"Token if the authentication is successful, undefined otherwise"},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"selectEndpoint","label":"selectEndpoint( id: string ): Promise< Endpoint | undefined >","params":[{"label":"id","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Select an endpoint from the available Endpoints array","returnSummary":"Endpoint if the operation is successful, undefined otherwise."},"returnTypes":[{"label":"Endpoint"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointUrl","label":"setEndpointUrl( url: string, endpointId: string ): Promise< string | undefined >","params":[{"label":"url","type":"string","description":"Base url for the endpoint"},{"label":"endpointId","type":"string","description":null}],"comments":{"summary":"A setter to set the url of the selected Endpoint","returnSummary":"Url of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"string"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"setEndpointVersion","label":"setEndpointVersion( version: Version, endpointId: string ): Promise< Version | undefined >","params":[{"label":"version","type":"Version","description":"Version of the qorus api"},{"label":"endpointId","type":"string","description":"Optional parameter to change the url of a particular endpoint from the endpoints array"}],"comments":{"summary":"A setter to set the Version of the Endpoint","returnSummary":"Version of the endpoint if the operation is successful, undefined otherwise"},"returnTypes":[{"label":"Version"},{"label":"undefined"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"validateEndpointData","label":"validateEndpointData( data: LoginParams & AddEndpoint, withCredentials: boolean ): boolean","params":[{"label":"data","type":"AddEndpoint & LoginParams","description":"Endpoint data to be checked"},{"label":"withCredentials","type":"boolean","description":"boolean to check if the endpoint has credentials"}],"comments":{"summary":"Checks the validity of the selected endpoint","returnSummary":"True if the Endpoint data is valid, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusAuthenticator","data":{"async":true,"name":"validateLocalUserToken","label":"validateLocalUserToken( endpointId: string ): Promise< string | null >","params":[{"label":"endpointId","type":"string","description":"Id of the endpoint"}],"comments":{"summary":"Validates the local stored authentication token for the Endpoint","returnSummary":"Authentication token, if the authentication is successful, null otherwise"},"returnTypes":[{"label":"string"},{"label":"null"}]}},{"className":"QorusAuthenticator","data":{"async":false,"name":"validateVersion","label":"validateVersion( version: number | string ): boolean","params":[{"label":"version","type":"number | string","description":"Version of the endpoint"}],"comments":{"summary":"Validates if the provided version is an accepted api version","returnSummary":"True if the version is valid, False otherwise"},"returnTypes":[{"label":"boolean"}]}}],[{"className":"QorusDataProvider","data":{"async":true,"name":"fetchWithContext","label":"fetchWithContext( context: Context ): Promise< QorusDataProvider >","params":[{"label":"context","type":"Context","description":null}],"comments":{"summary":null},"returnTypes":[{"label":"QorusDataProvider"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"get","label":"get( select: string, providerOptions: any ): Promise< QorusDataProvider >","params":[{"label":"select","type":"string","description":"next children to be selected"},{"label":"providerOptions","type":"any","description":null}],"comments":{"summary":"Method to select the next children from the current provider for further operations","returnSummary":"{@link QorusDataProvider} new object"},"returnTypes":[{"label":"QorusDataProvider"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getAllOptions","label":"getAllOptions( ): QorusOptions[ ]","params":[],"comments":{"summary":"A getter to get options by name for a children provider","returnSummary":"QorusOptions object array"},"returnTypes":[{"label":"QorusOptions[ ]"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getApi","label":"getApi( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'api'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context api"},"returnTypes":[{"label":"QorusDataProvider"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildren","label":"getChildren( ): any","params":[],"comments":{"summary":"A getter to get available children for the current provider","returnSummary":"A list of DataProvider children"},"returnTypes":[{"label":"any"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getChildrenNames","label":"getChildrenNames( ): any","params":[],"comments":{"summary":"A getter to get children names for the current provider","returnSummary":"list of children names"},"returnTypes":[{"label":"any"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getContext","label":"getContext( ): Context","params":[],"comments":{"summary":"A getter to get the context for the current provider","returnSummary":"Context for the api ex: \"record\";"},"returnTypes":[{"label":"Context"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getData","label":"getData( ): { errorData:  any, providerData:  any, responseData:  any }","params":[],"comments":{"summary":"A getter to get available data for the current provider","returnSummary":"responseData, providerData and errorData for the current provider"},"returnTypes":[{"label":"{ errorData:  any, providerData:  any, responseData:  any }"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getEvent","label":"getEvent( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'Event'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context event"},"returnTypes":[{"label":"QorusDataProvider"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getFinalPath","label":"getFinalPath( path: string[ ] ): string","params":[{"label":"path","type":"string[ ]","description":"Optional path array to generate request path"}],"comments":{"summary":"A getter to get request path for the current provider","returnSummary":"Request path string"},"returnTypes":[{"label":"string"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getMessage","label":"getMessage( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'message'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context message"},"returnTypes":[{"label":"QorusDataProvider"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getOptions","label":"getOptions( childrenName: string ): QorusOptions | undefined","params":[{"label":"childrenName","type":"string","description":"name of the children provider"}],"comments":{"summary":"A getter to get options by name for a children provider","returnSummary":"QorusOptions object for the data provider children"},"returnTypes":[{"label":"QorusOptions"},{"label":"undefined"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"getPath","label":"getPath( ): string[ ] | undefined","params":[],"comments":{"summary":"A getter to the the stored path array for the current provider","returnSummary":"Array of path strings"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getRecord","label":"getRecord( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'record' from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context record"},"returnTypes":[{"label":"QorusDataProvider"}]}},{"className":"QorusDataProvider","data":{"async":true,"name":"getType","label":"getType( ): Promise< QorusDataProvider >","params":[],"comments":{"summary":"Get record of Data Providers with context 'type'  from /dataprovider/browse endpoint","returnSummary":"A new DataProvider object with response from browse api as context type"},"returnTypes":[{"label":"QorusDataProvider"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"has","label":"has( name: string ): boolean","params":[{"label":"name","type":"string","description":"Name of the children you want to find"}],"comments":{"summary":"Checks if the children exist on the provider","returnSummary":"True if the children exist, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"hasData","label":"hasData( ): boolean","params":[],"comments":{"summary":"Method to verify if the current provider has children","returnSummary":"true if the children exist, false otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusDataProvider","data":{"async":false,"name":"setPath","label":"setPath( path: string[ ] ): void","params":[{"label":"path","type":"string[ ]","description":"Array of path strings to replace for path of the current provider"}],"comments":{"summary":"Setter to set path for the current provider"},"returnTypes":[{"label":"void"}]}}],[{"className":"QorusRequest","data":{"async":true,"name":"deleteReq","label":"deleteReq( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a delete request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Delete request creator for the QorusToolkit","returnSummary":"Result of the delete request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}},{"className":"QorusRequest","data":{"async":true,"name":"get","label":"get( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a get request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Get request creator for the QorusToolkit","returnSummary":"Result of the get request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}},{"className":"QorusRequest","data":{"async":true,"name":"makeRequest","label":"makeRequest( type: DELETE | POST | PUT | GET, props: QorusRequestParams, endpoint: Endpoint ): Promise< any >","params":[{"label":"type","type":"DELETE | POST | PUT | GET","description":null},{"label":"props","type":"QorusRequestParams","description":null},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":null},"returnTypes":[{"label":"any"}]}},{"className":"QorusRequest","data":{"async":true,"name":"post","label":"post( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a post request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Post request creator for the QorusToolkit","returnSummary":"Result of the post request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}},{"className":"QorusRequest","data":{"async":true,"name":"put","label":"put( props: QorusRequestParams, endpoint: Endpoint ): Promise< T | undefined >","params":[{"label":"props","type":"QorusRequestParams","description":"QorusRequestParams endpoint url is mandatory to make a put request"},{"label":"endpoint","type":"Endpoint","description":null}],"comments":{"summary":"Put request creator for the QorusToolkit","returnSummary":"Result of the put request"},"returnTypes":[{"label":"T"},{"label":"undefined"}]}}],[{"className":"QorusOptions","data":{"async":false,"name":"convertToJsType","label":"convertToJsType( type: string ): any","params":[{"label":"type","type":"string","description":"Type to be converted"}],"comments":{"summary":"A private function to convert types to js types","returnSummary":"Converted type"},"returnTypes":[{"label":"any"}]}},{"className":"QorusOptions","data":{"async":false,"name":"createJsTypes","label":"createJsTypes( types: string[ ] ): string[ ]","params":[{"label":"types","type":"string[ ]","description":null}],"comments":{"summary":"A parser function to modify options object","returnSummary":"Object with constructor options"},"returnTypes":[{"label":"string[ ]"}]}},{"className":"QorusOptions","data":{"async":false,"name":"get","label":"get( propertyName: string ): Properties | undefined","params":[{"label":"propertyName","type":"string","description":"Name of the property"}],"comments":{"summary":"A getter to get constructor options property object","returnSummary":"Property object with name and value"},"returnTypes":[{"label":"Properties"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getAll","label":"getAll( ): ObjectWithStringKey | undefined","params":[],"comments":{"summary":"Get all values required for the provider","returnSummary":"Array of values for the constructor options if required values exist, undefined otherwise"},"returnTypes":[{"label":"ObjectWithStringKey"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getJsType","label":"getJsType( propertyName: string ): string[ ] | undefined","params":[{"label":"propertyName","type":"string","description":"name of the property"}],"comments":{"summary":"A getter to get js types for a property","returnSummary":"js types accepted by the property"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"getType","label":"getType( propertyName: string ): string[ ] | undefined","params":[{"label":"propertyName","type":"string","description":"Name of the property"}],"comments":{"summary":"A getter to get property type","returnSummary":"Types accepted by the property"},"returnTypes":[{"label":"string[ ]"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"parseChildren","label":"parseChildren( children: any ): ProviderOption | undefined","params":[{"label":"children","type":"any","description":"children for which options will be created"}],"comments":{"summary":"A parser function to modify options object","returnSummary":"Object with provider options"},"returnTypes":[{"label":"ProviderOption"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"set","label":"set( propertyName: string, value: any ): Properties | undefined","params":[{"label":"propertyName","type":"string","description":"Name of the property"},{"label":"value","type":"any","description":null}],"comments":{"summary":"A setter to set constructor options property value","returnSummary":"Property object"},"returnTypes":[{"label":"Properties"},{"label":"undefined"}]}},{"className":"QorusOptions","data":{"async":false,"name":"validate","label":"validate( ): boolean","params":[],"comments":{"summary":"A validator to verify if all the required values are provided","returnSummary":"True if all the value exist, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusOptions","data":{"async":false,"name":"validateProperty","label":"validateProperty( propertyName: string, value: any ): boolean","params":[{"label":"propertyName","type":"string","description":"Name of the property"},{"label":"value","type":"any","description":null}],"comments":{"summary":"A method to validate if the provided value can be used by the property","returnSummary":"True if value can be used, False otherwise"},"returnTypes":[{"label":"boolean"}]}}],[{"className":"QorusValidator","data":{"async":false,"name":"getTypeFromValue","label":"getTypeFromValue( value: any ): none | null | date | hash | float | bool | list | int | string","params":[{"label":"value","type":"any","description":"Any accepted type value"}],"comments":{"summary":"Get QorusType from the value","returnSummary":"QorusType string"},"returnTypes":[{"label":"none"},{"label":"null"},{"label":"date"},{"label":"hash"},{"label":"float"},{"label":"bool"},{"label":"list"},{"label":"int"},{"label":"string"}]}},{"className":"QorusValidator","data":{"async":false,"name":"nullType","label":"nullType( type: string ): boolean","params":[{"label":"type","type":"string","description":"Type of the object"}],"comments":{"summary":"Verifies if the type can be null or not","returnSummary":"True if the the type can be null, False otherwise"},"returnTypes":[{"label":"boolean"}]}},{"className":"QorusValidator","data":{"async":false,"name":"validate","label":"validate( type: string, value: any, canBeNull: boolean ): boolean","params":[{"label":"type","type":"string","description":"type of value for the property"},{"label":"value","type":"any","description":"value for the property"},{"label":"canBeNull","type":"boolean","description":"if the value can be null"}],"comments":{"summary":"Validate property for the provider-options for data-provider","returnSummary":"True if the value can be accepted for the type, False otherwise"},"returnTypes":[{"label":"boolean"}]}}]],interfaceDocs: [{"name":"AddEndpoint","comments":{"summary":null},"params":[{"label":"endpointId","description":"Id for the endpoint provided by the user, unique for every endpoint","type":"string"},{"label":"url","description":"URL to Qorus server for the provided endpoint","type":"string"},{"label":"version","description":"Version for the server api","type":"Version"}]},{"name":"Endpoint","comments":{"summary":null},"params":[{"label":"authToken","description":"Authentication token for the user provided endpoint","type":"string"},{"label":"endpointId","description":"Id for the endpoint provided by the user, unique for every endpoint","type":"string"},{"label":"url","description":"URL to Qorus server for the provided endpoint","type":"string"},{"label":"version","description":"Version for the server api","type":"Version"}]},{"name":"LoginParams","comments":{"summary":null},"params":[{"label":"pass","description":"Password for the authentication to Qorus server","type":"string"},{"label":"user","description":"Username for the authentication to Qorus server","type":"string"}]},{"name":"WithQorusAuthToken","comments":{"summary":null},"params":[{"label":"authToken","description":"Authentication token for the user provided endpoint","type":"string"}]},{"name":"WithQorusEndpointId","comments":{"summary":null},"params":[{"label":"endpointId","description":"Id for the endpoint provided by the user, unique for every endpoint","type":"string"}]},{"name":"WithQorusURL","comments":{"summary":null},"params":[{"label":"url","description":"URL to Qorus server for the provided endpoint","type":"string"}]},{"name":"DefaultHeaders","comments":{"summary":null},"params":[]},{"name":"QorusRequestParams","comments":{"summary":null},"params":[{"label":"data","description":"Data for the request","type":"any"},{"label":"headers","description":"Headers for the request","type":"AxiosRequestHeaders"},{"label":"params","description":"URL Parameters for the request","type":"Record"},{"label":"path","description":"Complete endpoint url for the request","type":"string"}]},{"name":"Properties","comments":{"summary":null},"params":[{"label":"jsTypes","description":"Converted js types for the property","type":"string[ ]"},{"label":"name","description":"Name of the property","type":"string"},{"label":"required","description":"Check to identify if the property is required by the DataProvider","type":"boolean"},{"label":"types","description":"Allowed types for the property","type":"string[ ]"},{"label":"value","description":"Value of the property","type":"{ type:  string, value:  any } | null"}]},{"name":"ProviderOption","comments":{"summary":null},"params":[{"label":"name","description":"Name of the DataProvider","type":"string"},{"label":"providerOptions","description":"DataProvider properties array","type":"Properties[ ]"}]},{"name":"ApiPaths","comments":{"summary":null},"params":[{"label":"authenticator","description":"Api paths for the QorusAuthenticator","type":"ApiPathsAuthenticator"},{"label":"dataProviders","description":"Api paths for the QorusDataProvider","type":"ApiPathsDataProvider"}]},{"name":"ApiPathsAuthenticator","comments":{"summary":null},"params":[{"label":"login","description":"Route to login the user","type":"string"},{"label":"logout","description":"Route to logout the user","type":"string"},{"label":"validateNoAuth","description":"Route to check if the no-auth is enabled for the user","type":"string"},{"label":"validateToken","description":"Route to validate user authentication token","type":"string"}]},{"name":"ApiPathsDataProvider","comments":{"summary":null},"params":[{"label":"browse","description":"DataProvider browse path \"/api/latest/dataprovider/browse\"","type":"string"}]},{"name":"ObjectWithStringKey","comments":{"summary":null},"params":[]}], typeAliasDocs: [{"name":"Version","comments":{"summary":"Type of allowed versions for the Qorus api"},"type":["1","2","3","4","5","6","latest"]},{"name":"QorusAuthToken","comments":{"summary":"Authentication token for a Qorus Endpoint"},"type":"string"},{"name":"QorusEndpointId","comments":{"summary":"Endpoint id for a Qorus Endpoint"},"type":"string"},{"name":"QorusEndpointURL","comments":{"summary":"Url for a Qorus Endpoint"},"type":"string"},{"name":"Token","comments":{"summary":"Authentication token for a Qorus Endpoint"},"type":"string"},{"name":"ConstructorOptions","comments":{"summary":"Constructor Options for the data provider"},"type":"any"},{"name":"Context","comments":{"summary":"Context for the Qorus api ex: 'record'"},"type":["record","api","event","message","type"]},{"name":"ProviderData","comments":{"summary":"Qorus DataProvider data object"},"type":"any"},{"name":"ResponseData","comments":{"summary":"Get request response data from DataProvider api"},"type":"any"},{"name":"ResponseError","comments":{"summary":"Get request error data from DataProvider api"},"type":"any"},{"name":"ProviderChildren","comments":{"summary":"Children for the provider"},"type":"any"}] }